<?php

namespace App\Service;

use App\Jobs\DatabaseImportJob;
use App\Mail\SendMail;
use App\Models\Organization;
use App\Models\SubscriptionPlan;
use App\Models\UserRole;
use App\Traits\ApiCallTrait;
use App\Traits\DataBaseImport;
use App\Traits\NotificationTrait;
use App\Traits\SmsSendTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

use function PHPUnit\Framework\isNull;

class SubscriptionPlanService extends BaseService
{
    use ApiCallTrait, DataBaseImport, NotificationTrait, SmsSendTrait;

    protected function random_alphanumeric($length = 8)
    {
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345689@#_';
        $my_string = '';
        for ($i = 0; $i < $length; $i++) {
            $pos = random_int(0, strlen($chars) - 1);
            $my_string .= substr($chars, $pos, 1);
        }

        return $my_string;
    }

    public function subscriptionRequestAprove($data)
    {
        set_time_limit(1200);
        ini_set('memory_limit', '512M');
        $database_name = '';
        //        $password = $this->random_alphanumeric(8);
        $password = 123456;
        $s_request = $this->subsctiptionRequestRepository->findById($data['subscription_request_id'], ['*'], [], []);

        try {
            //$s_request = $this->subsctiptionRequestRepository->findById($data["subscription_request_id"], ['*'],[],[]);
            $checkExistanc = $this->organizationRepository->findByEmail($s_request->email);
            $checkExistancUser = $this->userRepository->findByEmail($s_request->email);
            $checkExistancUserMobile = $this->userRepository->findByMobileNo($s_request->mobile);
            $database_name = preg_replace('/[^A-Za-z0-9\-]/', '', $s_request->email) . '_' . substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 1, 5);

            // return $database_name;
            $email = $s_request->email;

            if ((!isNull($checkExistanc) && $checkExistanc->id) || (!isNull($checkExistancUser) &&
                $checkExistancUser->id)) {
                return $this->errorResponse($s_request, 'This email already registered to an account');
            }

            if (!isNull($checkExistancUserMobile && $checkExistancUserMobile->id)) {
                return $this->errorResponse($s_request, 'This Mobile already registered to an account');
            }
            //TODO: Change flowing line in production
            // $dbCreate = true;
            $dbCreate = $this->createDatabase($database_name);
            DatabaseImportJob::dispatch(['db' => $database_name]);

            if (!$dbCreate) {
                Log::error('Db creation failed' . json_encode($dbCreate));

                return $this->errorResponse($s_request, 'Database Creation Failed');
            }
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            $this->deleteDatabase($database_name);

            return $this->errorResponse($s_request, 'Database Creation Failed');
        }

        DB::beginTransaction();
        try {
            $organizationData = [
                'name' => $s_request->name,
                'address' => '',
                'mobile' => $s_request->mobile,
                'email' => $s_request->email,
                'contact_person_name' => $s_request->name,
                'contact_person_mobile' => $s_request->mobile,
                'contact_person_email' => $s_request->email,
                'contact_person_designation' => 'Local Admin',
                'db_name' => $database_name,
                'code' => 'OC-' . Organization::count() + 1000,
                'status' => 1,
                'business_type' => $data['business_type'] ?? 'B2B'
            ];

            $organizaiton = $this->organizationRepository->create($organizationData);

            $userData = [
                'name' => $s_request->name,
                'email' => $s_request->email,
                'mobile' => $s_request->mobile,
                //'subscription_plan_id' => $s_request->email,
                'password' => Hash::make($password),
                'is_tem_password' => 1,
                'user_type' => 3,
                'organization_id' => $organizaiton->id,
            ];

            $user = $this->userRepository->create($userData);

            //TODO: Change flowing line in production

            $this->userEntryTrait([
                'name' => $s_request->name,
                'email' => $s_request->email,
                'mobile' => $s_request->mobile,
                'password' => $password,
                'user_type' => 'admin',
                'db_name' => $database_name,
                'saas_user_id' => $user->id,
            ]);

            $role = new UserRole;
            $role->user_id = $user->id;
            $role->role_id = 1;
            $role->save();

            $currentDate = date('Y-m-d');
            $subscription = SubscriptionPlan::where('id', $data['subscription_plan_id'])->with('validity')->first();

            $day = $subscription->validity->days < 30 ? $subscription->validity->days : 30;
            $futureDate = date('Y-m-d', strtotime('+' . $day . ' days', strtotime($currentDate)));

            $subscriptionDetailsData = [
                'organization_id' => $organizaiton->id,
                'user_id' => $user->id,
                'subscription_plan_id' => $data['subscription_plan_id'],
                'status' => 1,
                'start_date' => $currentDate,
                'user_limit' => $subscription->user_limit,
                'end_date' => $futureDate,
            ];

            $details = $this->subscriptionDetails->create($subscriptionDetailsData);
            $purchaseData = [
                'organization_id' => $organizaiton->id,
                'user_id' => $user->id,
                'subscription_plan_id' => $data['subscription_plan_id'],
                'user_limit' => $subscription->user_limit,
                'actual_price' => $subscription->price,
                'sell_price' => 0,
                'subscription_details_id' => $details->id,
            ];
            $this->purchaseRepository->create($purchaseData);
            $settingData = [
                'organization_id' => $organizaiton->id,
                'contact_number' => $s_request->mobile,
                'contact_mail' => $s_request->email,
            ];

            $this->settingsRepository->create($settingData);

            $this->subsctiptionRequestRepository->update($data['subscription_request_id'], ['status' => 2]);
            $this->storeNotification(
                [
                    'title' => 'Organization Registered',
                    'message' => 'Your organization is registered please update information and subscription plan.',
                    'user_id' => [$user->id],
                ]
            );

            DB::commit();
            $testMailData = [
                'title' => 'New account created',
                'email' => $email,
                'password' => $password,
                'user' => $s_request->name,
            ];

            Mail::to($email)->send(new SendMail($testMailData, 'emails.account_created', 'New account created'));

            $this->sendSmsApiCall(
                [
                    'user_id' => $user['id'],
                    'phone_number' => $s_request->mobile,
                    'message_body' => 'Your subscription request has been accepted. Please check your registered email to get the login credentials',
                ]
            );

            return $this->successResponse($organizaiton);
            //return ['message' => "Success!", "status" => true, 'data' => $organizaiton];
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            $this->deleteDatabase($database_name);

            return $this->errorResponse((object) [], $exception->getMessage() ?? 'Organization creation failed');
        }
    }
}
