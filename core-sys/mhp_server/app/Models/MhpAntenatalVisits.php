<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MhpDoctorsMaster;
class MhpAntenatalVisits extends Model
{
    use HasFactory;
    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class,'doctor_id')->select('id','dr_given_name','dr_middle_name','dr_last_name');
    }

}
