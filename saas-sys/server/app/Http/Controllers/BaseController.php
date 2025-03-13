<?php

namespace App\Http\Controllers;


use App\Repository\ActivityRepositoryInterface;
use App\Repository\CardInfoRepositoryInterface;
use App\Repository\CouponRepositoryInterface;
use App\Repository\CouponSplanRepositoryInterface;
use App\Repository\CouponUserRepositoryInterface;
use App\Repository\Eloquent\NotificationDetailsRepository;
use App\Repository\FeatureRepositoryInterface;
use App\Repository\NotificationDetailsRepositoryInterface;
use App\Repository\OrganizationRepositoryInterface;
use App\Repository\PurchaseRepositoryInterface;
use App\Repository\RefundRepositoryInterface;
use App\Repository\SettingsRepositoryInterface;
use App\Repository\StorageSizeRepositoryInterface;
use App\Repository\SubscriptionCancelRepositoryInterface;
use App\Repository\SubscriptionDetailRepositoryInterface;
use App\Repository\SubscriptionPlanFeatureRepositoryInterface;
use App\Repository\SubscriptionPlanRepositoryInterface;
use App\Repository\SubscriptionRequestRepositoryInterface;
use App\Repository\UserRepositoryInterface;
use App\Repository\ValidityPriodRepositoryInterface;
use App\Service\OrganizationService;

class BaseController extends Controller
{
    protected UserRepositoryInterface $userRepository;
    protected SubscriptionPlanFeatureRepositoryInterface $subsctiptionPlanFeatureRepository;
    protected SubscriptionPlanRepositoryInterface $subsctiptionPlanRepository;
    protected CouponRepositoryInterface $couponRepository;
    protected CouponUserRepositoryInterface $couponUserRepository;
    protected CouponSplanRepositoryInterface $couponSplanRepository;
    protected OrganizationRepositoryInterface $organizationRepository;
    protected FeatureRepositoryInterface $featureRepository;
    protected SubscriptionRequestRepositoryInterface $subsctiptionRequestRepository;
    protected SubscriptionDetailRepositoryInterface $subscriptionDetails;
    protected ValidityPriodRepositoryInterface $validityRepository;
    protected StorageSizeRepositoryInterface $storageSizeRepository;
    protected SettingsRepositoryInterface $settingRepository;
    protected ActivityRepositoryInterface $activityRepository;
    protected PurchaseRepositoryInterface $purchaseRepository;
    protected RefundRepositoryInterface $refundRepository;
    protected SubscriptionCancelRepositoryInterface $subscriptionCancelRepository;
    protected NotificationDetailsRepositoryInterface $notificationDetailsRepository;

    public function __construct(OrganizationService $organizationService)
    {
        $this->userRepository = app(\App\Repository\Eloquent\UserRepository::class);

        $this->subsctiptionPlanRepository = app(\App\Repository\Eloquent\SubscriptionPlanRepository::class);
        $this->subsctiptionPlanFeatureRepository = app(\App\Repository\Eloquent\SubscriptionPlanFeatureRepository::class);
        $this->couponRepository = app(\App\Repository\Eloquent\CouponRepository::class);
        $this->couponUserRepository = app(\App\Repository\Eloquent\CouponUserRepository::class);
        $this->couponSplanRepository = app(\App\Repository\Eloquent\CouponSplanRepository::class);
        $this->organizationRepository = app(\App\Repository\Eloquent\OrganizationRepository::class);
        $this->featureRepository = app(\App\Repository\Eloquent\FeatureRepository::class);
        $this->subsctiptionRequestRepository = app(\App\Repository\Eloquent\SubscriptionRequestRepository::class);
        $this->subscriptionDetails = app(\App\Repository\Eloquent\SubscriptionDetailRepository::class);
        $this->validityRepository = app(\App\Repository\Eloquent\ValidityPriodRepository::class);
        $this->storageSizeRepository = app(\App\Repository\Eloquent\StorageSizeRepository::class);
        $this->settingRepository = app(\App\Repository\Eloquent\SettingsRepository::class);
        $this->purchaseRepository = app(\App\Repository\Eloquent\PurchaseRepository::class);
        $this->subscriptionCancelRepository = app(\App\Repository\Eloquent\SubscriptionCancelRepository::class);
        $this->refundRepository = app(\App\Repository\Eloquent\RefundRepository::class);
        $this->notificationDetailsRepository = app(\App\Repository\Eloquent\NotificationDetailsRepository::class);

    }



   public function otpSendResponse($data)
    {
        return response()->json([
            'code' => 201,
            'status' => 'success',
            'message' => 'OTP has been sent to your email',
            'data' => $data
        ]);
    }


    public function successResponse ($data, $message='The request was successful'){
        return response()->json([
            'code'=>200,
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ]);
    }

    public function errorResponse ($exception,$message= 'Something wrong', $code=422){
        return response()->json([
            'code' => $code,
            'status' => 'error',
            'message' => $message,
            'data' => null,
            'errors' => property_exists($exception, 'errors') ? $exception->errors() : [],
        ]);
    }
}
