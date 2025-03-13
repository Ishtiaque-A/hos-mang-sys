<?php

namespace App\Models;

use App\Models\MhpDoctor;
use App\Models\MhpPatient;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DoctorPayment extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'doctor_id');
    }

    public function patient()
    {
        return $this->belongsTo(MhpPatient::class, 'patient_hn_number', 'patient_hn_number');
    }
    public function patientWithOnlineAppointment()
    {
        return $this->belongsTo(MhpPatient::class, 'patient_hn_number', 'patient_hn_number')->with('mhpPatientAppointment');
    }
}
