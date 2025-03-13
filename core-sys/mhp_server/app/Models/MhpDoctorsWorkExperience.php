<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpDoctorsWorkExperience extends Model
{
    use HasFactory;
    public function doctor()
    {
        return $this->hasMany('App\Models\MhpDoctorsMaster', 'doctors_master_id', 'id');
    }
}
