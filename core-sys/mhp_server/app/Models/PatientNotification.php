<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'patient_hn_number',
        'from',
    ];
}
