<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpRx extends Model
{
    use HasFactory;
    public function medicine()
    {
        return $this->belongsTo('App\Models\MhpDrugName', 'drug_id')->select('id', 'macrohealth_sg', 'mims_sg');
    }
    public function appointment()
    {
        return $this->belongsTo('App\Models\MhpAppointmentScheduler', 'appointment_id')->select('id', 'doctors_id')->with('doctors');
    }
    public function history()
    {
        return $this->hasMany('App\Models\MhpMedicationChartPartOneAllTable', 'rx_id');
    }
}
