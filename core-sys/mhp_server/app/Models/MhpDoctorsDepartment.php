<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpDoctorsDepartment extends Model
{
    use HasFactory;

    public function MhpDoctorsMaster()
    {
        return $this->hasMany(MhpDoctorsMaster::class, 'department_id', 'id')->with('title', 'department', 'specialist', 'contact_via', 'workExperience', 'academic', 'usual_provider', 'token');
    }
}
