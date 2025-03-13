<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocTimeSlot extends Model
{
    use HasFactory;

    public function doctorInfo(){
        return $this->belongsTo('App\Models\MhpDoctorsMaster','doctor_id','id');
    }
}
