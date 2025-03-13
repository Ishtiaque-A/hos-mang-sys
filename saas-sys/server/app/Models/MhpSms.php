<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpSms extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'uid',
        'url',
        'is_api_type_parameter',
        'status',
        'provider_name',
        'others',
        'from',
        'authorization',
        'password',
        'user_name',
        'user_id',
        'message'
    ];
    public function countries()
    {
        return $this->hasMany(SmsAllowedCountries::class, 'gateway_id', 'id');
    }
    public function credentials()
    {
        return $this->hasMany(SmsCredentials::class, 'gateway_id', 'id');
    }
}
