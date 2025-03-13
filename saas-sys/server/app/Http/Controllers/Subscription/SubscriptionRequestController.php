<?php

namespace App\Http\Controllers\Subscription;

use App\Http\Controllers\BaseController;
use App\Http\Requests\MultipleStatusChangeRequest;
use App\Http\Requests\SubscriptionReqestStatusChangeRequest;
use App\Http\Requests\SubscriptionRequestRequest;
use App\Models\User;
use App\Repository\Eloquent\SubscriptionRequestRepository;
use App\Repository\OrganizationRepositoryInterface;
use App\Repository\SubscriptionDetailRepositoryInterface;
use App\Repository\SubscriptionRequestRepositoryInterface;
use App\Repository\UserRepositoryInterface;
use App\Service\SubscriptionPlanService;
use App\Traits\LoggingTrait;
use App\Traits\NotificationTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SubscriptionRequestController extends BaseController
{
    use NotificationTrait, LoggingTrait;
    private $subscriptionPlanService;

    protected SubscriptionRequestRepositoryInterface $subsctiptionRequestRepository;

    protected OrganizationRepositoryInterface $organizationRepository;

    protected UserRepositoryInterface $userRepository;

    protected SubscriptionDetailRepositoryInterface $subscriptionDetails;

    public function __construct(SubscriptionPlanService $subscriptionPlanService)
    {
        $this->subsctiptionRequestRepository = app(SubscriptionRequestRepository::class);
        $this->organizationRepository = app(\App\Repository\Eloquent\OrganizationRepository::class);
        $this->userRepository = app(\App\Repository\Eloquent\UserRepository::class);
        $this->subscriptionDetails = app(\App\Repository\Eloquent\SubscriptionDetailRepository::class);
        $this->subscriptionPlanService = $subscriptionPlanService;
    }

    public function statusChange(SubscriptionReqestStatusChangeRequest $request)
    {
        $validate = $request->validated();
        // return $validate;
        try {
            if ($validate['status'] != 0) {
                $res = $this->subscriptionPlanService->subscriptionRequestAprove($validate);
                return $res;

                if (!$res['status']) {
                    if (!isset($res['data']['status']) || $res['data']['status'] == 0 || $res['data']['status'] == 1) {
                        $this->subsctiptionRequestRepository->update($validate['subscription_request_id'], ['status' => 3]);
                    }
                    return $this->errorResponse((object) [], $res['message']);
                }
            }

            return $this->errorResponse((object) [], 'This might have wrong status');
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function view($id)
    {
        try {
            $data = $this->subsctiptionRequestRepository->findById($id, ['*'], ['subscriptionPlan'], []);

            return $this->successResponse(['subscription_request' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function deleteMultiple(MultipleStatusChangeRequest $request)
    {
        try {
            $this->subsctiptionRequestRepository->multipleStatusUpdate($request->validated());

            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function list(Request $request)
    {
        try {
            $data = $this->subsctiptionRequestRepository->listData($request->all());

            return $this->successResponse(['subscription_request' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function store(SubscriptionRequestRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            $user = $this->userRepository->findByEmail($validated['email']);
            if ($user) {
                return $this->errorResponse((object) [], 'You have already an account');
            }

            $suReq = $this->subsctiptionRequestRepository->findByEmail($validated['email']);

            if ($suReq) {
                return $this->errorResponse((object) [], 'You have already submitted an Request');
            }

            $method = $request->method();

            if ($method == 'PUT') {
                $id = $validated['id'];
                unset($validated['id']);
                $response = $this->subsctiptionRequestRepository->update($id, $validated);
            } else {
                $response = $this->subsctiptionRequestRepository->create($validated);
            }
            $adminUsers = User::whereIn('user_type', [0, 1, 2])->pluck('id');

            $this->storeNotification(
                [
                    'title' => 'New request',
                    'message' => 'New subscription request submitted.',
                    'user_id' => $adminUsers,
                ]
            );
            DB::commit();

            return $this->successResponse(['subscription_request' => $response]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }
}
