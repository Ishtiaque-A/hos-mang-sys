<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaediatricAll extends Model
{
    use HasFactory;
    protected $fillable = [
        'patient_id','image','page_no'
    ];
}
