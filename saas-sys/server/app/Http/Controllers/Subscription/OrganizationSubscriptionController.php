<?php

namespace App\Http\Controllers\Subscription;
use App\Http\Controllers\BaseController;
use App\Traits\UserCheckTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrganizationSubscriptionController extends BaseController
{
    use UserCheckTrait;

    function checkValidity(){

        try {
            return $this->successResponse($this->organizationCheck());
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());
        }
    }
}
