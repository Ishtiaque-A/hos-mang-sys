<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorRound extends Model
{
    use HasFactory;
    protected $fillable = [
        'doctorId',
        'patient_id',
        'appointment_id',
        'admission_id',
        'consultant_id',
        'residentId',
        'protocolId',
        'freshComplaint',
        'day',
        'cycle',
        'date',
        'anaemic',
        'jaundiced',
        'cyanosis',
        'skin_turgor',
        'capillary_refill',
        'nail_sign',
        'dehydration',
        'radio_femoral_delay',
        'mucositis',
        'ecog_scale',
        'kps_scale',
        'pathology_result',
        'temperature',
        'o2_saturation',
        'blood_sugar',
        'blood_sugar_type',
        'pulse',
        'respiratory_rate',
        'bp_sitting_systolic',
        'bp_sitting_diastolic',
        'bp_standing_systolic',
        'bp_standing_diastolic',
        'bp_lying_systolic',
        'bp_lying_diastolic',
        'weight',
        'height',
        'body_surface_area',
        'bmi',
        'waist_measurement',
        'hip_measurement',
        'whr',
        'abdomen',
        'abdominal_guard',
        'skin',
        'chest',
        'cns',
        'cvs',
        'consultants_advice'
    ];
    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'doctorId', 'id');
    }
    public function resident()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'residentId', 'id');
    }
    public function patient()
    {
        return $this->belongsTo(MhpPatient::class, 'patient_id', 'id')->with('patient_birth_sex');
    }
    public function admission()
    {
        return $this->belongsTo(PatientAdmission::class, 'admission_id', 'id');
    }
    public function protocol()
    {
        return $this->belongsTo(RoundTreatmentProtocolName::class, 'protocolId', 'id');
    }
    public function drugSince()
    {
        return $this->belongsTo(RoundDrugSinceEntryMaster::class, 'admission_id', 'admission_id')
            ->with('drugs')
            ->latest('created_at');
    }
    public function intakeOutput()
    {
        return $this->belongsTo(IntakeOutput::class, 'admission_id', 'admission_id')
            ->with('details')
            ->latest('created_at');
    }
    public function urineResult()
    {
        return $this->belongsTo(RoundUrineResult::class, 'admission_id', 'admission_id')
            ->latest('created_at');
    }
}
