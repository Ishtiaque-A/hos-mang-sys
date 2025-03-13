<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repository\SettingsRepositoryInterface;
use App\Repository\UserRepositoryInterface;
use App\Service\OrganizationService;
use App\Traits\ApiCallTrait;
use App\Traits\FileProcessingTrait;
use App\Traits\GoogleLoginVerificationTrait;
use App\Traits\UserCheckTrait;
use Illuminate\Support\Facades\Auth;

class UnauthenticatedController extends BaseController {

    use FileProcessingTrait, GoogleLoginVerificationTrait, ApiCallTrait, UserCheckTrait;

    protected UserRepositoryInterface $userRepository;
    protected SettingsRepositoryInterface $settingRepository;

    protected $organizationService;

    public function __construct(OrganizationService $organizationService)
    {

        $this->organizationService = $organizationService;

        $this->userRepository = app(\App\Repository\Eloquent\UserRepository::class);
        $this->settingRepository = app(\App\Repository\Eloquent\SettingsRepository::class);

    }


    public function index() {
        return User::all();
    }



    public function authCheck(){
        return $this->userCheck(Auth::user());
    }

}
