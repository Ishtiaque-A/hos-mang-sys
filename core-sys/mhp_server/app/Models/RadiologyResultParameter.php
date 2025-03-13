<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RadiologyResultParameter extends Model
{
    use HasFactory;
    public function details()
    {
        return $this->hasMany(DoctorRoundPathologyResultDetails::class, 'setup_id'); // 'chart_id' is the foreign key in RoundDiabeticChartDetails table
    }

}
