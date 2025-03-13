<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadedPrescription extends Model
{
    use HasFactory;

    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'doctor_id')->with('title');
    }

    public function patient()
    {
        return $this->belongsTo(MhpPatient::class, 'patient_id');
    }
    public function prescription()
    {
        return $this->hasMany(MhpPatientPrescription::class, 'appointment_id', 'appointment_id');
    }
}
