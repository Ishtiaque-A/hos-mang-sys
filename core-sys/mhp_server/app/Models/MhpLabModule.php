<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpLabModule extends Model
{
    use HasFactory;
    public function patient ()
    {
        return $this->belongsTo('App\Models\MhpPatient','patient_id')->select('id','patient_first_name', 'patient_middle_name','patient_last_name','patient_mobile_phone','patient_dob','patient_hn_number','patient_images','patient_birth_sex_id');
    }
    public function details ()
    {
        return $this->hasMany('App\Models\MhpGreatLabReportDetails','report_id');
    }
    public function files ()
    {
        return $this->hasMany('App\Models\MhpLabDocInboxFile','message_id');
    }
    public function reports ()
    {
        return $this->belongsTo('App\Models\MhpGreatLabReport','report_id')->with('details');
    }
    public function doctor () {
        return $this->belongsTo('App\Models\MhpDoctorsMaster','doctor_id')->select('id','dr_given_name', 'dr_middle_name','dr_last_name', );
    }
}
