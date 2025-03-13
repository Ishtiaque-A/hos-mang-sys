<?php

namespace App\Models;

use App\Models\MhpPatient;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MhpBirthSex extends Model
{
    use HasFactory;

    public function patient_birth_sex()
    {
        return $this->hasMany(MhpPatient::class, 'patient_birth_sex_id')->select('id', 'birth_sex_name');
    }
}
