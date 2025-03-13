<?php

namespace App\Repository\Eloquent;

use App\Models\Coupon;
use App\Repository\CouponRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class CouponRepository extends BaseRepository implements CouponRepositoryInterface {
    /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Model  $model
     */
    public function __construct(Coupon $model) {
        $this->model = $model;
    }

    public function deleteMylipleById($data) {
        return $this->model->whereIn('id', $data['id'])->update(['status' => $data['status']]);
    }

    public function listData($queryParams) {
        $currentDateTime = now();

        $data = $this->model;
        if (isset($queryParams['search'])) {
            $data = $data->where('code', 'like', "%{$queryParams['search']}%");
        }

        if (isset($queryParams['status'])) {
            if ($queryParams['status'] == 1) {
                $data = $data->whereDate('start_date', '<=', $currentDateTime)
                    ->whereDate('end_date', '>=', $currentDateTime)->where('status', 1);
            } elseif ($queryParams['status'] == 0 || $queryParams['status'] == 1) {
                $data = $data->whereDate('start_date', '>', $currentDateTime)
                    ->orWhereDate('end_date', '<', $currentDateTime)->orWhere('status', 0);
            }
        }
        if (isset($queryParams['perpage'])) {
            return $data->with('subscriptionPlans', 'users')->orderBy('created_at', 'DESC')->paginate($queryParams['perpage']);
        } else {
            return $data->with('subscriptionPlans', 'users')->orderBy('created_at', 'DESC')->get();
        }
    }

    public function checkCoupon($queryParams) {
        $userId = Auth::id();
        $subscriptionPlanId = $queryParams['plan_id'];
        $now = now();

        $data = $this->model
            ->where('code', $queryParams['coupon_id'])
            ->where('status', 1)
            ->where(function ($query) use ($now) {
                $query->whereNull('start_date')
                    ->orWhere('start_date', '<=', $now);
            })
            ->where(function ($query) use ($now) {
                $query->whereNull('end_date')
                    ->orWhere('end_date', '>=', $now);
            })
            ->leftJoin('coupon_users', 'coupons.id', '=', 'coupon_users.coupon_id')
            ->where(function ($query) use ($userId) {
                $query->where('user_type', 0) // Coupon is for all users
                    ->orWhere(function ($query) use ($userId) {
                        $query->where('user_type', 1) // Coupon is for specific users
                            ->where('coupon_users.user_id', $userId);
                    });
            })
            ->leftJoin('coupon_subscription_plans', 'coupons.id', '=', 'coupon_subscription_plans.coupon_id')
            ->where(function ($query) use ($subscriptionPlanId) {
                $query->where('subscription_plan_type', 0) // Coupon is for all users
                    ->orWhere(function ($query) use ($subscriptionPlanId) {
                        $query->where('subscription_plan_type', 1) // Coupon is for specific users
                            ->where('coupon_subscription_plans.subscription_plan_id', $subscriptionPlanId);
                    });
            })
            ->select('coupons.*')
            ->distinct()
            ->first();

        return $data;
    }
}
