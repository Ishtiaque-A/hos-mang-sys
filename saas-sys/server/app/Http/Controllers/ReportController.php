<?php

namespace App\Http\Controllers;

use App\Repository\OrganizationRepositoryInterface;
use App\Repository\SubscriptionPlanRepositoryInterface;
use App\Repository\UserRepositoryInterface;
use App\Traits\ApiCallTrait;
use App\Traits\FileProcessingTrait;
use App\Traits\GoogleLoginVerificationTrait;
use App\Traits\UserCheckTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReportController extends BaseController
{

    use FileProcessingTrait, GoogleLoginVerificationTrait, ApiCallTrait, UserCheckTrait;
    protected SubscriptionPlanRepositoryInterface $subscriptionPlanRepository;

    protected OrganizationRepositoryInterface $organizationRepository;
    protected UserRepositoryInterface $userRepository;


    public function __construct()
    {
        $this->subscriptionPlanRepository = app(\App\Repository\Eloquent\SubscriptionPlanRepository::class);
        $this->organizationRepository = app(\App\Repository\Eloquent\OrganizationRepository::class);
        $this->userRepository = app(\App\Repository\Eloquent\UserRepository::class);
    }



    public function SubscriptionPlan(Request $request)
    {
        try {
            $data = $this->subscriptionPlanRepository->report($request->all());
            return $this->successResponse(['activities' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function organization(Request $request)
    {
        try {
            $data = $this->organizationRepository->report($request->all());
            return $this->successResponse(['organization' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }
    public function organizationDetails( $id)
    {
        try {
            $data = $this->organizationRepository->detailsReport($id);
            return $this->successResponse($data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }


    public function users(Request $request)
    {
        try {
            $data = $this->userRepository->report($request->all());
            return $this->successResponse( $data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }
    public function userDetails( $id)
    {
        try {
            $data = $this->userRepository->detailsReport($id);
            return $this->successResponse($data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }
}
