<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MhpDoctorsMaster;
use App\Models\MhpPrescription;

class MhpPrescriptionsList extends Model
{
    use HasFactory;
    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'doctor_id')->with('title', 'department', 'specialist', 'workExperience', 'academic', 'usual_provider');
    }
    public function rx()
    {
        return $this->belongsTo('App\Models\MhpRx', 'medicen_id')->select('*');
    }
    public function prescription()
    {
        return $this->hasMany(MhpPrescription::class, 'prescription_no', 'prescription_name')->with('rx');
    }
    public function details()
    {
        return $this->hasMany(MhpPrescriptionDetails::class, 'prescription_id', 'id')->with('rx');
    }
    public function patient()
    {
        return $this->belongsTo('App\Models\MhpPatient', 'patient_id')->select('id', 'patient_last_name', 'patient_first_name', 'patient_middle_name', 'patient_dob' , 'patient_birth_sex_id')->with('patient_birth_sex');
    }
}
