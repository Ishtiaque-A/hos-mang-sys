<?php

namespace App\Service;

use App\Models\Role;
use App\Models\SubscriptionDetail;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use function PHPUnit\Framework\isNull;

class OrganizationService extends BaseService
{
    public function userOrganization($id){
        try {

            $data['user'] = User::findOrFail($id);
            $data['user_count'] = User::where('organization_id', $data['user']->organization_id)->count();


            $data['latestSubscription']  = SubscriptionDetail::where('organization_id', $data['user']->organization_id)
                ->orderBy('id', 'DESC') // Order the results by expire_date in ascending order
                ->first();




            $data['user'] = User::findOrFail($id);
            $data['user_count'] = User::where('organization_id', $data['user']->organization_id)->count();

            $data['subscriptionPlan'] = $data['latestSubscription'] ? $data['latestSubscription']->subscriptionPlan : null;

            $data['latestSubscriptionDetails'] = $data['latestSubscription']  ? $data['latestSubscription'] ->toArray() : null;

            return  $this->successResponse([
                'user'=>$data
            ]);


        }catch (\Exception $exception){
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());


        }
    }
    public function userOrganizationSubDetails($id){
        try {

            $data['user'] = User::findOrFail($id);
            $data['organization'] = User::findOrFail($id);
            $data['user_count'] = User::where('organization_id', $data['user']->organization_id)->count();

            $data['latestSubscription'] = $data['user']->subscriptionDetails()
                ->whereDate('end_date', '>=', now()->toDateString())
                ->latest()
                ->first();
            $data['subscriptionPlan'] = $data['latestSubscription'] ? $data['latestSubscription']->subscriptionPlan : null;

// Access the organization, latest subscription, and subscription plan information
//            $organizationName = $data['organization'] ->name;
            $data['latestSubscriptionDetails'] = $data['latestSubscription']  ? $data['latestSubscription'] ->toArray() : null;

            return  $this->successResponse([
                'user'=>$data
            ]);


        }catch (\Exception $exception){
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());


        }
    }

}
