<?php

namespace App\Http\Controllers\Subscription;

use App\Http\Controllers\BaseController;
use App\Http\Requests\MultipleStatusChangeRequest;
use App\Http\Requests\SubscriptionPlanRequest;
use App\Http\Requests\UpgradePlanRequest;
use App\Models\Organization;
use App\Models\SubscriptionDetail;
use App\Models\SubscriptionPlan;
use App\Models\SubscriptionPlanFeature;
use App\Traits\PaymentTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SubscriptionController extends BaseController {
    use PaymentTrait;

    public function store(SubscriptionPlanRequest $request) {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $method = $request->method();
            $features = $validated['features'];
            unset($validated['features']);

            if ($method == 'PUT') {
                $id = $validated['id'];
                unset($validated['id']);
                $response = $this->subsctiptionPlanRepository->update($id, $validated);

                SubscriptionPlanFeature::select('id', 'feature_id')
                    ->where('subscription_plan_id', $id)
                    ->whereNotIn('feature_id', $features)
                    ->delete();

                $old_feature = SubscriptionPlanFeature::where('subscription_plan_id', $id)
                    ->whereIn('feature_id', $features)
                    ->pluck('feature_id')->toArray();

                foreach ($old_feature as $feature_id) {
                    $key = array_search($feature_id, $features);
                    if ($key !== false) {
                        unset($features[$key]);
                    }
                }
                $data = [];
                foreach ($features as $feature_id) {
                    array_push($data, ['subscription_plan_id' => $id, 'feature_id' => $feature_id]);
                }
                $this->subsctiptionPlanFeatureRepository->insert($data);
            } else {
                $response = $this->subsctiptionPlanRepository->create($validated);
                $data = [];
                foreach ($features as $feature_id) {
                    array_push($data, ['subscription_plan_id' => $response->id, 'feature_id' => $feature_id]);
                }
                $this->subsctiptionPlanFeatureRepository->insert($data);
            }
            DB::commit();

            return $this->successResponse(['subscription_plan' => $response]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function delete($id = 0) {
        try {
            $this->subsctiptionPlanRepository->statusUpdate($id);

            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function deleteMultiple(MultipleStatusChangeRequest $request) {
        try {
            $this->subsctiptionPlanRepository->multipleStatusUpdate($request->validated());

            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function getPlan($id = 0) {
        try {
            $data = $this->subsctiptionPlanRepository->findById(intval($id), ['*'], ['features', 'storageLimit', 'validity'], []);

            return $this->successResponse(['subscription_plan' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function list(Request $request) {
        try {
            $data = $this->subsctiptionPlanRepository->listData($request->all());

            return $this->successResponse(['subscription_plans' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function specialList(Request $request) {
        try {
            $data = $this->subsctiptionPlanRepository->allList(['*'], [], [['status', 1], ['type', 2]]);

            return $this->successResponse(['subscription_plans' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function subscriptionHistory(Request $request) {
        try {
            $query = $request->all();

            $subscriptionDetails = SubscriptionDetail::with(['subscriptionPlan', 'purchase'])
                ->addSelect(['is_refundable' => SubscriptionDetail::selectRaw('CASE WHEN end_date > NOW() AND status = 1 THEN 1 ELSE 0 END')]);

            if (isset($query['perpage'])) {
                $subscriptionDetails = $subscriptionDetails->paginate($query['perpage']);
            } else {
                $subscriptionDetails = $subscriptionDetails->get();
            }
            // You can adjust the number of items per page as needed
        } catch (\Exception $exception) {
        }
    }

    public function upgradeableList(Request $request) {
        try {
            $subscription = SubscriptionDetail::where([['organization_id', Auth::user()->organization_id], ['status', 1]])
                ->with(['subscriptionPlan', 'purchase', 'subscriptionPlan.validity', 'subscriptionPlan.features', 'subscriptionPlan.storageLimit'])
                ->orderBy('id', 'desc') // Order the results by expire_date in ascending order 'storageLimit', 'validity','features'
                ->first();
            $data['current_plan'] = $subscription;

            $userCount = $this->userRepository->userCount();

            $special = Organization::where('id', Auth::user()->organization_id)->first();
            if ($special->special_plan_id) {
                $data['special_plans'] = SubscriptionPlan::where([['id', $special->special_plan_id], ['status', 1]])
                    ->with(['storageLimit', 'validity', 'features'])->first();
            }
            $data['subscription_plans'] = $this->subsctiptionPlanRepository->upgradeableList($userCount, $subscription->id);

            return $this->successResponse($data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function upgrade(UpgradePlanRequest $request) {
        DB::beginTransaction();
        try {
            $validate = $request->validated();
            $subscription = SubscriptionPlan::where('id', $validate['subscription_id'])->first();
            $purchaseData = [
                'organization_id' => Auth::user()->organization_id,
                'user_id' => Auth::id(),
                'subscription_plan_id' => $validate['subscription_id'],
                'coupon_id' => $validate['coupon_id'] ?? null,
                'user_limit' => $subscription->user_limit,
                'actual_price' => $validate['actual_price'] ?? $subscription->price,
                'sell_price' => $validate['sell_price'] ?? $subscription->price,
            ];
            $purchase = $this->purchaseRepository->create($purchaseData);
            $data = [
                'product_name' => $subscription->name,
                'sell_amount' => $validate['sell_price'] ?? $subscription->price,
                'total_amount' => $validate['actual_price'] ?? $subscription->price,
                'discount_amount' => floatval($validate['actual_price'] ?? $subscription->price) - floatval($validate['sell_price'] ?? $subscription->price),
                'purchase_id' => $purchase->id,
            ];
            $paymentUrl = $this->paymentGatewayConfiguration($data);
            if ($paymentUrl['status']) {
                DB::commit();

                return $this->successResponse(['url' => $paymentUrl['url']]);
            }
            DB::rollBack();

            return $this->errorResponse((object) [], 'Purchase failed');
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function activeSubscriptionPlanList() {
        try {
            $data = $this->subsctiptionPlanRepository->allList(['*'], ['storageLimit', 'validity'], [['status', 1], ['type', 1]]);

            return $this->successResponse(['subscription_plans' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }
}
