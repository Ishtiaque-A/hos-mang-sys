<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseSms extends Model
{
    use HasFactory;
    protected $fillable = [
        'organization_id',
        'package_id',
        'phone_number',
        'expire_date',
        'organization_name',
        'package_name',
        'expire_date',
        'total_sms_count',
        'available_sms_count',
        'used_sms_count',
        'transaction_id',
        'status',
    ];
}
