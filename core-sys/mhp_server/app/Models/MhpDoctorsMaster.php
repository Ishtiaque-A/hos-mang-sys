<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpDoctorsMaster extends Model
{
    use HasFactory;

    public function getFullNameAttribute()
    {
        $fullName = $this->attributes['dr_given_name'];

        if ($this->attributes['dr_middle_name'] && $this->attributes['dr_middle_name'] !== 'null') {
            $fullName .= ' ' . $this->attributes['dr_middle_name'];
        }
        if ($this->attributes['dr_last_name'] && $this->attributes['dr_last_name'] !== 'null') {
            $fullName .= ' ' . $this->attributes['dr_last_name'];
        }



        return $fullName;
    }
    protected $appends = ['fullName'];

    public function MhpDoctorsDepartment()
    {
        return $this->belongsTo(MhpDoctorsDepartment::class);
    }

    public function title()
    {
        return $this->belongsTo('App\Models\MhpTitle', 'title')->select('id', 'title_name');
    }

    public function department()
    {
        return $this->belongsTo('App\Models\MhpDoctorsDepartment', 'department_id')->select('id', 'departments_name');
    }

    public function specialist()
    {
        return $this->belongsTo('App\Models\DocSpecialist', 'specialists_id')->select('id', 'specialists_name');
    }

    public function birth_sex()
    {
        return $this->belongsTo('App\Models\MhpBirthSex', 'dr_birth_sex_id')->select('id', 'birth_sex_name');
    }

    public function city()
    {
        return $this->belongsTo('App\Models\MhpCity', 'dr_city_id')->select('id', 'city_name');
    }

    public function contact_via()
    {
        return $this->belongsTo('App\Models\MhpContactVia', 'dr_contact_via_id')->select('id', 'contact_via_name');
    }

    public function usual_provider()
    {
        return $this->belongsTo('App\Models\MhpUsualProvider', 'dr_provider_id')->select('id', 'usual_provider_name', 'address', 'mobile', 'phone', 'email');
    }

    public function slots()
    {
        return $this->hasMany('App\Models\MhpDoctorsMaster', 'doctor_id', 'id');
    }
    public function academic()
    {
        return $this->hasMany('App\Models\MhpDoctorsAcademic', 'doctors_master_id', 'id')->with('inistitution', 'country');
    }
    public function workExperience()
    {
        return $this->hasMany('App\Models\MhpDoctorsWorkExperience', 'doctors_master_id', 'id');
    }

    public function mhpPatientRequest()
    {
        return $this->hasMany('App\Models\MhpPatientRequest', 'doctors_master_id', 'id')->with('token');
    }

    public function onlineAppointmentBooking()
    {
        return $this->hasMany('App\Models\OnlineAppointmentBooking::class', 'doctor_id');
    }
    public function holiday()
    {
        return $this->hasMany(Holiday::class, 'doctors_master_id');
    }
    public function token()
    {
        $doctorUserData = User::where('user_type', 'Doctor')->get();

        return $this->belongsTo(User::class, 'id', 'user_id')
            ->when($doctorUserData->isNotEmpty(), function ($query) use ($doctorUserData) {
                $doctorIds = $doctorUserData->pluck('id')->toArray();
                return $query->whereIn('id', $doctorIds)->select('user_type', 'user_id', 'deviceToke');
            });
    }
}
