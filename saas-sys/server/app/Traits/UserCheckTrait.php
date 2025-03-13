<?php
namespace App\Traits;

use App\Models\SubscriptionDetail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

trait UserCheckTrait
{
    function organizationCheck($organization_id)
    {
        $subscription = SubscriptionDetail::where('organization_id', $organization_id)
            ->orderBy('end_date', 'asc') // Order the results by expire_date in ascending order
            ->first();

        if ($subscription) {
            $currentDate = now();
            $expirationDate = $subscription->end_date;
            $daysRemaining = $currentDate->diffInDays($expirationDate, false); // Set absolute=false to get a negative value if the expiration date is in the past
            return $daysRemaining;
        } else {
            return false;
        }

    }

    public function userCheck($user_data){
            try{
                $user= User::where('id',$user_data['id'])->with('organization')->first();
                $user['token']=$user_data['token'];
                $expireAt = $this->organizationCheck($user->organization_id);
                if($expireAt && $expireAt<0){
                    if($user->user_type == 3){
                        return $this->successResponse(
                            [
                                'user'=>$user,
                                'expire_within'=>$expireAt
                            ]
                        );
                    }else{
                        return $this->errorResponse((object)[],'Subscription Expired, Contact with your admin', 402);
                    }
                }

                return $this->successResponse(
                    [
                        'user'=>$user,
                        'expire_within'=>$expireAt
                    ]
                );

            }catch (\Exception $exception){
                return $this->errorResponse($exception,$exception->getMessage());
            }

        }

}
