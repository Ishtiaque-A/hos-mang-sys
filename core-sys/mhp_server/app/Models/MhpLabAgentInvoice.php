<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpLabAgentInvoice extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function patient()
    {
        return $this->belongsTo('App\Models\MhpPatient', 'patient_id')->select('id', 'patient_first_name', 'patient_mobile_phone', 'patient_dob', 'patient_hn_number', 'patient_images', 'patient_last_name', 'patient_middle_name');
    }
    public function tests()
    {
        return $this->hasMany('App\Models\MhpLabAgentInvoiceDetails', 'invoiceNo', 'invoiceNo');
    }
}
