<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class smsGatewayDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'service_name',
        'status',
        'sms_gateway_id',
    ];
}
