<?php
namespace App\Service;

use App\Repository\OrganizationRepositoryInterface;
use App\Repository\PurchaseRepositoryInterface;
use App\Repository\SettingsRepositoryInterface;
use App\Repository\SubscriptionDetailRepositoryInterface;
use App\Repository\SubscriptionRequestRepositoryInterface;
use App\Repository\UserRepositoryInterface;

class BaseService
{
    protected SubscriptionRequestRepositoryInterface $subsctiptionRequestRepository;
    protected OrganizationRepositoryInterface $organizationRepository;
    protected UserRepositoryInterface $userRepository;
    protected SubscriptionDetailRepositoryInterface $subscriptionDetails;
    protected SettingsRepositoryInterface $settingsRepository;
    protected PurchaseRepositoryInterface $purchaseRepository;

    public function __construct()
    {
        $this->subsctiptionRequestRepository = app(\App\Repository\Eloquent\SubscriptionRequestRepository::class);
        $this->organizationRepository = app(\App\Repository\Eloquent\OrganizationRepository::class);
        $this->userRepository = app(\App\Repository\Eloquent\UserRepository::class);
        $this->subscriptionDetails = app(\App\Repository\Eloquent\SubscriptionDetailRepository::class);
        $this->settingsRepository = app(\App\Repository\Eloquent\SettingsRepository::class);
        $this->purchaseRepository = app(\App\Repository\Eloquent\PurchaseRepository::class);

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
