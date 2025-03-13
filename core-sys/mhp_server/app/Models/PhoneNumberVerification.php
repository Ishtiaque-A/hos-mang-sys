<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhoneNumberVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone_number',
        'verification_code',
        'token'
    ];
}
