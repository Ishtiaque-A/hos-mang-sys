<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mhpPrescriptionSetup extends Model
{
    use HasFactory;
    protected $fillable = [
        'prescription_type',
        'doctor_id',
        'doctor_email',
        'header_img',
        'footer_img',
        'use_header',
        'use_footer',
        'doctor_signature',
        'use_doctor_signature',
        'header_content',
        'footer_content',
    ];
}
