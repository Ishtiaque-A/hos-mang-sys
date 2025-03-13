<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends BaseModel
{

    protected $guarded = [
        'id'
    ];



    public function paymentAttempt()
    {
        return $this->belongsTo(PaymentAttempt::class, 'payment_attempt_id');
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function subscriptionDetail()
    {
        return $this->belongsTo(SubscriptionDetail::class, 'subscription_details_id');
    }

    public function subscriptionCancelRequest()
    {
        return $this->hasOne(SubscriptionCancelRequest::class, 'purchase_id');
    }

    public function subscriptionPlan()
    {
        return $this->belongsTo(SubscriptionPlan::class, 'subscription_plan_id');
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class, 'coupon_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
