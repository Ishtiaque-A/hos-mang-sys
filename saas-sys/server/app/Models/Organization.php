<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends BaseModel
{

    protected $guarded = [
        'id'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function subscriptionDetails()
    {
        return $this->hasMany(SubscriptionDetail::class);
    }


    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    public function specialPlan()
    {
        return $this->belongsTo(SubscriptionPlan::class, 'special_plan_id');
    }

    public function branch()
    {
        return $this->hasMany(Branch::class,  'organization_id', 'id');
    }
}
