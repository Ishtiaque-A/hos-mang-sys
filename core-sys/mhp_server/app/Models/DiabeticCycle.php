<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiabeticCycle extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id','image'
    ];
}
