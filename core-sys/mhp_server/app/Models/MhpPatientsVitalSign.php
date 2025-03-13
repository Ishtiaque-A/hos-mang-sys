<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MhpPatientsVitalSign extends Model
{
    use HasFactory;

    public function patientInfo()
    {
        return $this->belongsTo('App\Models\MhpPatient', 'patient_id', 'id');
    }
}
