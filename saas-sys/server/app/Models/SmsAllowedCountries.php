<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmsAllowedCountries extends Model
{
    use HasFactory;
    protected $fillable = [
        'gateway_id',
        'name',
        'code',
        'dial_code',
        'flag',
    ];
}
