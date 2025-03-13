<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\Models\Activity;

class User extends Authenticatable {
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id'
    ];

    protected $hidden = ['password','Two_factor_secret','two_factor_recovery_codes','remember_token'];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    /*protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at',
        'email_verified_at',
    ];*/

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function roles() {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    public function coupons()
    {
        return $this->belongsToMany(Coupon::class, 'coupon_users', 'user_id', 'coupon_id');
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function subscriptionDetails()
    {
        return $this->hasMany(SubscriptionDetail::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class, 'causer_id');
    }
}
