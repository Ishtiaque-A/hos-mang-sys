<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocSpecialist extends Model
{
    use HasFactory;

    public function department()
    {
        return $this->belongsTo('App\Models\MhpDoctorsDepartment','department_id')->select('id','departments_name');
    }

}
