<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmsHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'sms_type',
        'sms_to',
        'message',
        'status',
        'code',
        'sms_from',
    ];
}
