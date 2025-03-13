<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\UploadedPrescription;

class MhpAppointmentScheduler extends Model
{
    use HasFactory;

    public function doctors()
    {
        return $this->belongsTo('App\Models\MhpDoctorsMaster', 'doctors_id', 'id')
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

    public function patients()
    {
        return $this->belongsTo('App\Models\MhpPatient', 'patient_id')->select('id', 'patient_hn_number', 'patient_first_name', 'patient_middle_name', 'patient_last_name', 'patient_preferred_name', 'patient_images', 'patient_city_id', 'patient_address2', 'patient_address1', 'patient_bcid', 'ptn_blood_group_id', 'patient_contact_via', 'patient_dob', 'patient_birth_sex_id')->with('patient_birth_sex', 'contact_via', 'city', 'blood_group', 'mhpPatientAppointment', 'token');
    }

    public function patientAppionment()
    {
        return $this->belongsTo('App\Models\MhpPatient', 'patient_id')->select('id', 'patient_first_name', 'patient_middle_name', 'patient_last_name', 'patient_preferred_name', 'patient_images', 'patient_city_id', 'patient_address2', 'patient_address1', 'patient_bcid', 'ptn_blood_group_id', 'patient_contact_via', 'patient_hn_number', 'patient_dob', 'patient_birth_sex_id', 'patient_email', 'patient_mobile_phone')->with('patient_birth_sex', 'contact_via', 'city', 'blood_group');
    }
    public function onlineApp()
    {
        return $this->belongsTo('App\Models\OnlineAppointmentBooking', 'id', 'reschedule_id')->with('schedule');
    }
    public function isExistPrescription()
    {
        return $this->hasOne(UploadedPrescription::class, 'appointment_id', 'id');
    }
}
