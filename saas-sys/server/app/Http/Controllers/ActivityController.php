<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repository\ActivityRepositoryInterface;
use App\Traits\ApiCallTrait;
use App\Traits\FileProcessingTrait;
use App\Traits\GoogleLoginVerificationTrait;
use App\Traits\UserCheckTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ActivityController extends BaseController
{

    use FileProcessingTrait, GoogleLoginVerificationTrait, ApiCallTrait, UserCheckTrait;
    protected ActivityRepositoryInterface $activityRepository;


    public function __construct()
    {
        $this->activityRepository = app(\App\Repository\Eloquent\ActivityRepository::class);
    }



    public function list(Request $request)
    {
        try {
            $data = $this->activityRepository->listData($request->all());
            return $this->successResponse(['activities' => $data]);
         } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }
    public function modelList(Request $request)
    {
        try {
            $data = $this->activityRepository->modelListData();
            return $this->successResponse(['activities' => $data]);
         } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }
    public function details($id)
    {
        try {
            $data = $this->activityRepository->activityData($id);
            return $this->successResponse(['activities' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

}
