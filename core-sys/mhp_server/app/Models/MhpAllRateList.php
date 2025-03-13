<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpAllRateList extends Model
{
    use HasFactory;

    public function patient_birth_sex()
    {
        return $this->belongsTo('App\Models\MhpBirthSex','gender')->select('id','birth_sex_name');
    }
    public function rateListCategory()
    {
        return $this->belongsTo('App\Models\MhpLabAgentRateList','categoryId')->select('id','name');
    }
}

