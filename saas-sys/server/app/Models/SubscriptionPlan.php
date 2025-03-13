<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SubscriptionPlan extends BaseModel
{

    protected $guarded = [
        'id'
    ];

    public function features(): BelongsToMany
    {
        return $this->belongsToMany(Feature::class, 'subscription_plan_features', 'subscription_plan_id', 'feature_id');

    }
    public function coupons()
    {
        return $this->belongsToMany(Coupon::class, 'coupon_subscription_plans', 'subscription_plan_id', 'coupon_id');
    }
    public function subscriptionDetails()
    {
        return $this->hasMany(SubscriptionDetail::class);
    }

    public function validity()
    {
        return $this->belongsTo(Validity::class, 'validity_id');
    }

    public function storageLimit()
    {
        return $this->belongsTo(StorageSize::class, 'storage_limit_id');
    }

    public function subscriptionRequests()
    {
        return $this->hasMany(SubscriptionRequest::class);
    }

}
