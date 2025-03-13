<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientAdmission extends Model
{
    protected $fillable = [
        'patient_id',
        'specialist_id',
        'department_id',
        'doctor_id',
        'block',
        'level',
        'unit',
        'admission_date',
        'ward',
        'bed',
        'cabin',
        'reason_for_admission',
        'status',
        'PRN',
        'note',
        'referred_by',
        'paying',
        'nonpaying',
    ];
    public function doctor()
    {
        return $this->belongsTo('App\Models\MhpDoctorsMaster', 'doctor_id', 'id')
            ->select(
                'id',
                'dr_family_name',
                'dr_given_name',
                'dr_middle_name',
                'dr_preferred_name',
                'dr_last_name',
                'dr_images',
                'title',
                'dr_work_phone',
                'dr_identity_no'
            )
            ->with('title');
    }
    public function specialist()
    {
        return $this->belongsTo('App\Models\DocSpecialist', 'specialist_id')->select('id', 'specialists_name');
    }
    public function patient()
    {
        return $this->belongsTo('App\Models\MhpPatient', 'patient_id')->select('id', 'patient_hn_number', 'patient_first_name', 'patient_middle_name', 'patient_last_name', 'patient_preferred_name', 'patient_images', 'patient_city_id', 'patient_address2', 'patient_address1', 'patient_bcid', 'ptn_blood_group_id', 'patient_contact_via', 'patient_dob', 'patient_birth_sex_id')->with('patient_birth_sex', 'contact_via', 'city', 'blood_group', 'mhpPatientAppointment', 'token');
    }
    public function department()
    {
        return $this->belongsTo('App\Models\MhpDoctorsDepartment', 'department_id')->select('id', 'departments_name');
    }
    use HasFactory;
}
