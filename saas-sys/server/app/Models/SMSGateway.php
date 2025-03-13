<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SMSGateway extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'currency',
        'price',
        'expire_date',
        'status',
        'buy_sms_count',
    ];

    public function service_titles()
    {
        return $this->hasMany(smsGatewayDetails::class, 'sms_gateway_id', 'id')->select(['id', 'service_name', 'status', 'sms_gateway_id']);
    }
}
