<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MHPAdvise extends Model
{
        use HasFactory;
        protected $fillable = [
                'doctor_id',
                'patient_id',
                'check',
                'advise_name',
                'saas_branch_id',
                'saas_branch_name',
        ];
}
