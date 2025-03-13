<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorRoundPathologyResult extends Model
{
    use HasFactory;

    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'doctor_id');
    }
    public function details()
    {
        return $this->hasMany(DoctorRoundPathologyResultDetails::class, 'result_id'); // 'chart_id' is the foreign key in RoundDiabeticChartDetails table
    }

}
