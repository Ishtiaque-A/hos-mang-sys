<?php

namespace App\Http\Controllers\Subscription;

use App\Http\Controllers\BaseController;
use App\Http\Requests\CouponCheckRequest;
use App\Http\Requests\CouponDeleteRequest;
use App\Http\Requests\CouponStoreRequest;
use App\Models\CouponSubscriptionPlan;
use App\Models\CouponUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CouponController extends BaseController
{

    public function store(CouponStoreRequest $request){

        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $validated['created_by']= Auth::id();
            $method = $request->method();


            if($method=='PUT'){
                $id = $validated['id'];
                unset($validated['id']);
                $response = $this->couponRepository->update($id, $validated);


                CouponUser::select('id','user_id')
                    ->where('coupon_id',$id)
                    ->whereNotIn('user_id', $validated['user_type']==1? $validated['user_ids'] :[])
                    ->delete();

                if($validated['user_type']==1) {
                    $old_user_record = CouponUser::where('coupon_id',$id)
                        ->whereIn('user_id', $validated['user_ids'])
                        ->pluck('user_id')->toArray();

                    foreach ($old_user_record as $user_id) {
                        $key = array_search($user_id,  $validated['user_ids']);
                        if ($key !== false) {
                            unset($validated['user_ids'][$key]);
                        }
                    }
                    $data = [];
                    foreach ($validated['user_ids'] as $user_id) {
                        array_push($data,['coupon_id' => $id, 'user_id' => $user_id]);
                    }
                    $this->couponUserRepository->insert($data);
                }

                CouponSubscriptionPlan::select('id','subscription_plan_id')
                    ->where('coupon_id',$id)
                    ->whereNotIn('subscription_plan_id', $validated['subscription_plan_type']? $validated['plan_ids']: [])
                    ->delete();

                if($validated['subscription_plan_type']==1) {
                    $old_plan_record = CouponSubscriptionPlan::where('coupon_id',$id)
                        ->whereIn('subscription_plan_id', $validated['plan_ids'])
                        ->pluck('subscription_plan_id')->toArray();

                    foreach ($old_plan_record as $plan_id) {
                        $key = array_search($plan_id,  $validated['plan_ids']);
                        if ($key !== false) {
                            unset($validated['plan_ids'][$key]);
                        }
                    }
                    $data = [];
                    foreach ($validated['plan_ids'] as $plan_id) {
                        array_push($data,['coupon_id' => $id, 'subscription_plan_id' => $plan_id]);
                    }
                    $this->couponSplanRepository->insert($data);
                }

            }else{
                $response = $this->couponRepository->create($validated);
                if($validated['user_type']==1){
                    $data = [];
                    foreach ($validated['user_ids'] as $userId) {
                        $data[] = [
                            'coupon_id' => $response->id,
                            'user_id' => $userId,
                        ];
                    }

                    $this->couponUserRepository->insertData($data);
                }

                if($validated['subscription_plan_type']==1){
                    $data = [];
                    foreach ($validated['plan_ids'] as $planId) {
                        $data[] = [
                            'coupon_id' => $response->id,
                            'subscription_plan_id' => $planId,
                        ];
                    }

                    $this->couponSplanRepository->insertData($data);
                }
            }
            DB::commit();
            return $this->successResponse(['coupon'=>$response]);


        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());

        }
    }

    public function delete( $id =0){
        try {
           $this->couponRepository->deleteById($id);
           return $this->successResponse((object)[]);

        }catch (\Exception $exception){
            return $this->errorResponse($exception,$exception->getMessage());
        }

    }

    public function deleteMultiple( CouponDeleteRequest $request ){
        try {
            $data = $request->validated();
            //return $data['id'];
            $this->couponRepository->deleteMylipleById($data);
            return $this->successResponse((object)[]);
        }catch (\Exception $exception){
            return $this->errorResponse($exception,$exception->getMessage());
        }
    }

    public function getCoupon( $id =0){

        try {
            $data = $this->couponRepository->findById(intval($id),['*'],['subscriptionPlans','users']);
            return $this->successResponse(['coupon'=>$data]);

        }catch (\Exception $exception){
            return $this->errorResponse($exception,$exception->getMessage());
        }

    }

    public function list(Request $request){
        try {
            $data = $this->couponRepository->listData($request->all());
            return $this->successResponse(['coupons'=>$data]);

        }catch (\Exception $exception){
            return $this->errorResponse($exception,$exception->getMessage());
        }


    }

    public function checkCoupon(CouponCheckRequest $request){
        try {
            $validate = $request->validated();
            $coupon = $this->couponRepository->checkCoupon($validate);
            $subscription = $this->subsctiptionPlanRepository->findById($validate['plan_id']);
            $price = $subscription->price;
            $discount=0;
            if(isset($coupon->id)){
                if($coupon->discount_type==0){
                    $discount = $coupon->amount;
                    $price=floatval($price)-floatval($discount);
                }else{
                    $discount = floatval($price)*floatval($coupon->amount)/100;
                    $price=floatval($price)-floatval($discount);
                }

            }

            return $this->successResponse(['is_valid'=>$coupon, 'plan'=>$subscription, 'discount'=>$discount, 'price'=>$price]);
        }catch (\Exception $exception){
            return $this->errorResponse($exception,$exception->getMessage());
        }
    }
}

