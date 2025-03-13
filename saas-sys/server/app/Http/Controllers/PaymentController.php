<?php

namespace App\Http\Controllers;

use App\Http\Requests\CardStoreRequest;
use App\Http\Requests\PaymentAtteptRequest;
use App\Repository\ActivityRepositoryInterface;
use App\Repository\CardInfoRepositoryInterface;
use App\Repository\PaymentAttemptRepositoryInterface;
use App\Repository\PurchaseRepositoryInterface;
use App\Repository\SubscriptionDetailRepositoryInterface;
use App\Repository\SubscriptionPlanRepositoryInterface;
use App\Traits\ApiCallTrait;
use App\Traits\FileProcessingTrait;
use App\Traits\GoogleLoginVerificationTrait;
use App\Traits\MailTrait;
use App\Traits\UserCheckTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentController extends BaseController {
    use ApiCallTrait, FileProcessingTrait, GoogleLoginVerificationTrait, MailTrait, UserCheckTrait;

    protected ActivityRepositoryInterface $activityRepository;

    protected CardInfoRepositoryInterface $cardInfoRepository;

    protected PaymentAttemptRepositoryInterface $paymentAttemptRepository;

    protected PurchaseRepositoryInterface $purchaseRepository;

    protected SubscriptionPlanRepositoryInterface $subsctiptionPlanRepository;

    protected SubscriptionDetailRepositoryInterface $subscriptionDetails;

    protected PaymentAttemptRepositoryInterface $paymentRererenceRepository;

    public function __construct() {
        $this->activityRepository = app(\App\Repository\Eloquent\ActivityRepository::class);
        $this->cardInfoRepository = app(\App\Repository\Eloquent\CardInfoRepository::class);
        $this->paymentAttemptRepository = app(\App\Repository\Eloquent\PaymentAttemptRepository::class);
        $this->purchaseRepository = app(\App\Repository\Eloquent\PurchaseRepository::class);
        $this->subsctiptionPlanRepository = app(\App\Repository\Eloquent\SubscriptionPlanRepository::class);
        $this->subscriptionDetails = app(\App\Repository\Eloquent\SubscriptionDetailRepository::class);
        $this->paymentRererenceRepository = app(\App\Repository\Eloquent\PaymentReferenceRepository::class);
    }

    public function paymentSuccess(PaymentAtteptRequest $request) {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            $response = $this->paymentAttemptRepository->create($data);
            $purchase = $this->purchaseRepository->findById($data['purchase_attempt_id']);
            $subscriptionPlan = $this->subsctiptionPlanRepository->findById($purchase['subscription_plan_id'], ['*'], ['validity']);

            $currentDate = date('Y-m-d');
            $futureDate = date('Y-m-d', strtotime('+'.($subscriptionPlan->validity->days ?? 1).' days', strtotime($currentDate)));

            $subscriptionDetailsData = [
                'organization_id' => $purchase['organization_id'],
                'subscription_plan_id' => $purchase['subscription_plan_id'],
                'user_id' => $purchase['user_id'],
                'status' => 1,
                'user_limit' => $purchase['user_limit'],
                'start_date' => $currentDate,
                'end_date' => $futureDate,
            ];

            $subscriptionDetail = $this->subscriptionDetails->create($subscriptionDetailsData);
            $this->purchaseRepository
                ->update($data['purchase_attempt_id'],
                    [
                        'payment_attempt_id' => $response->id,
                        'subscription_details_id' => $subscriptionDetail->id,
                    ]);

            DB::commit();

            return $this->successResponse(['payment' => $response]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollBack();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function paymentHistory(Request $request) {
        try {
            $response = $this->paymentAttemptRepository->paymentHistory($request->all());

            return $this->successResponse(['payment' => $response]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function paymentDetails($id) {
        try {
            $response = $this->paymentAttemptRepository->paymentDetails($id);

            return $this->successResponse(['payment' => $response]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function storeCard(CardStoreRequest $request) {
        try {
            $data = $request->validated();
            $data['organization_id'] = Auth::user()->organization_id;
            $this->cardInfoRepository->create($data);

            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function failed(Request $request) {
        $request = $request->all();
        Log::info('Payment failed'.json_encode($request));
        try {
            $paymentData = [
                'status' => $request['status'],
                'tran_date' => $request['tran_date'],
                'tran_id' => $request['tran_id'],
                'val_id' => $request['val_id'] ?? '',
                'amount' => $request['amount'],
                'store_amount' => $request['store_amount'],
                'card_type' => $request['card_type'],
                'card_no' => $request['card_no'] ?? ' ',
                'currency' => $request['currency'],
                'bank_tran_id' => $request['bank_tran_id'],
                'card_brand' => $request['card_brand'] ?? ' ',
                'card_issuer' => $request['card_issuer'] ?? ' ',
                'card_issuer_country' => $request['card_issuer_country'] ?? ' ',
                'card_issuer_country_code' => $request['card_issuer_country_code'] ?? ' ',
                'currency_type' => $request['currency_type'] ?? ' ',
                'currency_amount' => $request['currency_amount'],
            ];
            $this->paymentRererenceRepository->create($paymentData);

            $this->paymentAttemptRepository->create([
                'purchase_attempt_id' => $request['tran_id'],
                'amount' => $request['amount'],
                'status' => 1,
            ]);
            header('location:'.env('FRONTEND_URL').'/payment/failed');
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            header('location:'.env('FRONTEND_URL').'/payment/failed');
        }
    }

    public function success(Request $request) {
        try {
            $request = $request->all();
            Log::error('Payment success'.json_encode($request));
            $paymentData = [
                'status' => $request['status'],
                'tran_date' => $request['tran_date'],
                'tran_id' => $request['tran_id'],
                'val_id' => $request['val_id'],
                'amount' => $request['amount'],
                'store_amount' => $request['store_amount'],
                'card_type' => $request['card_type'],
                'card_no' => $request['card_no'] ?? ' ',
                'currency' => $request['currency'],
                'bank_tran_id' => $request['bank_tran_id'],
                'card_brand' => $request['card_brand'] ?? ' ',
                'card_issuer' => $request['card_issuer'] ?? ' ',
                'card_issuer_country' => $request['card_issuer_country'] ?? ' ',
                'card_issuer_country_code' => $request['card_issuer_country_code'] ?? ' ',
                'currency_type' => $request['currency_type'] ?? ' ',
                'currency_amount' => $request['currency_amount'],
            ];

            Log::info('$paymentData '.json_encode($paymentData));

            $paymentReference = $this->paymentRererenceRepository->create($paymentData);
            $store_id = env('SSL_STORE_ID');
            $store_passwd = env('SSL_STORE_PASSWORD');
            $val_id = urlencode($request['val_id']);
            $requested_url = (env('SSL_PAYMENT_VERIFICATION_URL').'?val_id='.$val_id.'&store_id='.$store_id.'&store_passwd='.$store_passwd.'&v=1&format=json');
            Log::info('cURL response: '.json_encode($requested_url));

            $handle = curl_init();
            curl_setopt($handle, CURLOPT_URL, $requested_url);
            curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false); // IF YOU RUN FROM LOCAL PC
            curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false); // IF YOU RUN FROM LOCAL PC

            $result = curl_exec($handle);
            Log::error('cURL response: '.json_encode($result));

            $code = curl_getinfo($handle, CURLINFO_HTTP_CODE);
            Log::info('$result '.json_encode($code));

            if ($code == 200) {
                $payment = $this->paymentAttemptRepository->create([
                    'purchase_attempt_id' => $request['tran_id'],
                    'amount' => $request['amount'],
                    'status' => 1,
                ]);

                Log::info('$payment '.json_encode($payment));

                $purchase = $this->purchaseRepository->findById($request['tran_id']);
                $subscriptionPlan = $this->subsctiptionPlanRepository->findById($purchase['subscription_plan_id'], ['*'], ['validity']);

                $currentDate = date('Y-m-d');
                $futureDate = date('Y-m-d', strtotime('+'.($subscriptionPlan->validity->days ?? 1).' days', strtotime($currentDate)));

                $subscription = $this->subscriptionDetails->create([
                    'organization_id' => $purchase['organization_id'],
                    'subscription_plan_id' => $purchase['subscription_plan_id'],
                    'user_id' => $purchase['user_id'],
                    'status' => 1,
                    'user_limit' => $subscriptionPlan['user_limit'],
                    'start_date' => $currentDate,
                    'end_date' => $futureDate,
                ]);
                Log::info('$subscription '.json_encode($subscription));

                $this->purchaseRepository->update($request['tran_id'],
                    [
                        'payment_attempt_id' => $payment->id,
                        'payment_id' => $payment->id,
                        'subscription_details_id' => $subscription->id,
                    ]);
                Log::info('$subscription ccc');
            } else {
                $this->paymentRererenceRepository->update($paymentReference->id, ['status' => $result['status']]);
                header('location:'.env('FRONTEND_URL').'/payment/failed');
            }

            $this->invoiceSend($request['tran_id']);
            header('location:'.env('FRONTEND_URL').'/payment/success');

            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            header('location:'.env('FRONTEND_URL').'/payment/failed');
        }
    }

    public function paymentGatewayConfiguration(Request $request) {
        $store_id = 'cattl6519ad5ac55ab';
        $store_passwd = 'cattl6519ad5ac55ab@ssl';

        $post_data = [];
        $post_data['store_id'] = $store_id;
        $post_data['store_passwd'] = $store_passwd;
        $post_data['total_amount'] = '103';
        $post_data['currency'] = 'BDT';
        $post_data['tran_id'] = 'SSLCZ_TEST_'.uniqid();
        $post_data['success_url'] = 'http://localhost/new_sslcz_gw/success.php';
        $post_data['fail_url'] = 'http://localhost/new_sslcz_gw/fail.php';
        $post_data['cancel_url'] = 'http://localhost/new_sslcz_gw/cancel.php';
        // $post_data['multi_card_name'] = "mastercard,visacard,amexcard";  # DISABLE TO DISPLAY ALL AVAILABLE

        // CUSTOMER INFORMATION
        $post_data['cus_name'] = 'Test Customer';
        $post_data['cus_email'] = 'test@test.com';
        $post_data['cus_add1'] = 'Dhaka';
        $post_data['cus_add2'] = 'Dhaka';
        $post_data['cus_city'] = 'Dhaka';
        $post_data['cus_state'] = 'Dhaka';
        $post_data['cus_postcode'] = '1000';
        $post_data['cus_country'] = 'Bangladesh';
        $post_data['cus_phone'] = '01711111111';
        $post_data['cus_fax'] = '01711111111';

        // CART PARAMETERS
        $post_data['cart'] = json_encode([
            ['product' => 'DHK TO BRS AC A1', 'amount' => '200.00'],
            ['product' => 'DHK TO BRS AC A2', 'amount' => '200.00'],
            ['product' => 'DHK TO BRS AC A3', 'amount' => '200.00'],
            ['product' => 'DHK TO BRS AC A4', 'amount' => '200.00'],
        ]);
        $post_data['product_amount'] = '100';
        $post_data['vat'] = '5';
        $post_data['discount_amount'] = '5';
        $post_data['convenience_fee'] = '3';

        $direct_api_url = 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php';

        $handle = curl_init();
        curl_setopt($handle, CURLOPT_URL, $direct_api_url);
        curl_setopt($handle, CURLOPT_TIMEOUT, 30);
        curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($handle, CURLOPT_POST, 1);
        curl_setopt($handle, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false); // KEEP IT FALSE IF YOU RUN FROM LOCAL PC

        $content = curl_exec($handle);

        $code = curl_getinfo($handle, CURLINFO_HTTP_CODE);

        if ($code == 200 && ! (curl_errno($handle))) {
            curl_close($handle);
            $sslcommerzResponse = $content;
        } else {
            curl_close($handle);
            echo 'FAILED TO CONNECT WITH SSLCOMMERZ API';
            exit;
        }

        // PARSE THE JSON RESPONSE
        $sslcz = json_decode($sslcommerzResponse, true);

        if (isset($sslcz['GatewayPageURL']) && $sslcz['GatewayPageURL'] != '') {
            // THERE ARE MANY WAYS TO REDIRECT - Javascript, Meta Tag or Php Header Redirect or Other
            // echo "<script>window.location.href = '". $sslcz['GatewayPageURL'] ."';</script>";
            echo "<meta http-equiv='refresh' content='0;url=".$sslcz['GatewayPageURL']."'>";
            // header("Location: ". $sslcz['GatewayPageURL']);
            exit;
        } else {
            echo 'JSON Data parsing error!';
        }
    }
}
