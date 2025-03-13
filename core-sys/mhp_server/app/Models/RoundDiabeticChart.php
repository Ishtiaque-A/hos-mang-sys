<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoundDiabeticChart extends Model
{
    use HasFactory;
    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'doctor_id');
    }
    public function details()
    {
        return $this->hasMany(RoundDiabeticChartDetails::class, 'chart_id'); // 'chart_id' is the foreign key in RoundDiabeticChartDetails table
    }


}
