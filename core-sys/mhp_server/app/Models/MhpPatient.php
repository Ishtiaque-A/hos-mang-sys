<?php

namespace App\Models;

use App\Models\MhpBirthSex;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MhpPatient extends Model
{
    use HasFactory;

    //    protected $with = ['contact_via'];



    public function getFullNameAttribute()
    {

        $fullName = $this->attributes['patient_first_name'];

        if (isset($this->attributes['patient_middle_name'])) {
            $fullName .= ' ' . $this->attributes['patient_middle_name'];
        }
        if (isset($this->attributes['patient_last_name'])) {
            $fullName .= ' ' . $this->attributes['patient_last_name'];
        }



        return $fullName;

        // return $this->attributes['patient_first_name'] . ' ' . $this->attributes['patient_middle_name'] . ' ' . $this->attributes['patient_last_name'];
    }
    protected $appends = ['fullName'];

    // public function appointment_type(){
    //     return $this->belongsTo('App\Models\MhpAppointmentScheduler', 'appointment_type_id')->select('id', 'appointment_type_name');
    // }

    public function title()
    {
        return $this->belongsTo('App\Models\MhpTitle', 'patient_title_id')->select('id', 'title_name');
    }

    public function religion()
    {
        return $this->belongsTo('App\Models\MhpReligion', 'patient_religion_id')->select('id', 'religion_name');
    }

    public function ethnicity()
    {
        return $this->belongsTo('App\Models\MhpEthnicity', 'patient_ethnicity_id')->select('id', 'ethnicity_name');
    }

    public function occupation()
    {
        return $this->belongsTo('App\Models\MhpOccupation', 'patient_occupation_id')->select('id', 'occupation_name');
    }

    public function contact_via()
    {
        return $this->belongsTo('App\Models\MhpContactVia', 'patient_contact_via')->select('id', 'contact_via_name');
    }

    public function patient_birth_sex()
    {
        return $this->belongsTo(MhpBirthSex::class, 'patient_birth_sex_id')->select('id', 'birth_sex_name');
    }

    public function statuses()
    {
        return $this->belongsTo('App\Models\MhpStatus', 'patient_status')->select('id', 'status_name');
    }

    public function city()
    {
        return $this->belongsTo('App\Models\MhpCity', 'patient_city_id')->select('id', 'city_name');
    }

    public function state()
    {
        return $this->belongsTo('App\Models\MhpState', 'patient_state_id')->select('id', 'state_name');
    }

    public function usual_provider()
    {
        return $this->belongsTo('App\Models\MhpUsualProvider', 'patient_usual_provider_id')->select('id', 'usual_provider_name');
    }

    public function usual_account()
    {
        return $this->belongsTo('App\Models\MhpUsualAccount', 'patient_usual_account')->select('id', 'usual_account_name');
    }

    public function blood_group()
    {
        return $this->belongsTo('App\Models\PtnBloodGroup', 'ptn_blood_group_id')->select('id', 'blood_group_name');
    }

    public function vital_sign()
    {
        return $this->belongsTo('App\Models\MhpPatientsVitalSign', 'patient_id')->select('id', 'name');
    }

    public function vitalSigns()
    {
        return $this->hasMany('App\Models\MhpVitalSign', 'patient_id', 'id');
    }

    public function mhpPatientRequest()
    {
        return $this->hasMany('App\Models\MhpPatientRequest', 'doctors_master_id', 'id');
    }

    public function mhpAppointmentScheduler()
    {
        return $this->hasMany('App\Models\MhpAppointmentScheduler', 'patient_id', 'id');
    }

    public function mhpPatientAppointment()
    {
        return $this->hasMany('App\Models\OnlineAppointmentBooking', 'patient_hn_number', 'patient_hn_number');
    }
    public function doctorPayments()
    {
        return $this->hasMany(DoctorPayment::class, 'patient_hn_number', 'patient_hn_number');
    }
    public function mhpPatientPrescription()
    {
        return $this->hasMany(DoctorPayment::class, 'patient_hn_number', 'patient_hn_number');
    }


    public function token()
    {
        $doctorUserData = User::where('user_type', 'patient')->get();

        return $this->belongsTo(User::class, 'id', 'user_id')
            ->when($doctorUserData->isNotEmpty(), function ($query) use ($doctorUserData) {
                $doctorIds = $doctorUserData->pluck('id')->toArray();
                return $query->whereIn('id', $doctorIds)->select('user_type', 'user_id', 'deviceToke', 'login_status');
            });
    }
}
