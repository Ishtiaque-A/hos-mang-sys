<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionRequest extends BaseModel
{

    protected $guarded = [
        'id'
    ];
    public function subscriptionPlan(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(SubscriptionPlan::class, 'id', 'subscription_plan_id');
    }

}
