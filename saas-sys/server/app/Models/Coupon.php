<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coupon extends BaseModel
{
    use SoftDeletes;

    public function subscriptionPlans()
    {
        return $this->belongsToMany(SubscriptionPlan::class, 'coupon_subscription_plans', 'coupon_id', 'subscription_plan_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'coupon_users', 'coupon_id', 'user_id');
    }
}
