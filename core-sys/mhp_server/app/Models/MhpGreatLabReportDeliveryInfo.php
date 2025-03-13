<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpGreatLabReportDeliveryInfo extends Model
{
    use HasFactory;
    public function invoice()
    {
        return $this->belongsTo('App\Models\MhpGreatLabInvoice','invoiceNo','invoiceNo');
    }
    public function patient ()
    {
        return $this->belongsTo('App\Models\MhpPatient','patient_id')->select('id','patient_first_name', 'patient_last_name', 'patient_middle_name','patient_mobile_phone','patient_dob','patient_hn_number','patient_images');
    }
}
