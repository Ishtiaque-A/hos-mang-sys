<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MhpClinicalDetails;
use App\Models\MhpPatient;
use App\Models\MhpLabratory;


class MhpGreatDocPathology extends Model
{
    use HasFactory;
    public function clinical_details()
    {
        return $this->belongsTo(MhpClinicalDetails::class, 'clinical_details_id', 'id');
    }
    public function patient_details()
    {
        return $this->belongsTo(MhpPatient::class, 'patient_id', 'id')->with('patient_birth_sex')->select('id', 'patient_birth_sex_id', 'patient_mobile_phone', 'patient_email', 'patient_last_name', 'patient_middle_name', 'patient_first_name');
    }
    public function laboratory_details()
    {
        return $this->belongsTo(MhpLabratory::class, 'laboratory_id', 'id');
    }
}
