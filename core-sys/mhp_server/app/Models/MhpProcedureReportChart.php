<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpProcedureReportChart extends Model
{
    use HasFactory;
    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'doctor_id');
    }

    public function patient()
    {
        return $this->belongsTo(MhpPatient::class, 'patient_id')->with('patient_birth_sex');
    }
}
