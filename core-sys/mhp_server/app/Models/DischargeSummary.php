<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DischargeSummary extends Model
{
    use HasFactory;
    public function medication()
    {
        return $this->hasMany(DischargeMedication::class, 'discharge_id', 'id');
    }

    public function patient()
    {
        return $this->belongsTo(MhpPatient::class, 'patient_id')->with('patient_birth_sex');
    }

    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'doctor_id');
    }

    public function procedure()
    {
        return $this->belongsTo(MhpProcedureReportChart::class, 'operation_note');
    }
}
