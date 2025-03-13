<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionDetail extends BaseModel
{

    protected $guarded = [
        'id'
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subscriptionPlan()
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }

    public function getIsRefundableAttribute()
    {
        return $this->end_date > now() && $this->status == 1 ? 1 : 0;
    }

    public function purchase()
    {
        return $this->hasOne(Purchase::class, 'subscription_details_id');
    }


}
