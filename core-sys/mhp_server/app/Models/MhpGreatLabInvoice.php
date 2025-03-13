<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpGreatLabInvoice extends Model
{
    use HasFactory;

    public function patient()
    {
        return $this->belongsTo('App\Models\MhpPatient', 'patient_id')->with('patient_birth_sex')->select('id', 'patient_first_name', 'patient_last_name', 'patient_middle_name', 'patient_mobile_phone', 'patient_dob', 'patient_hn_number', 'patient_images', 'patient_birth_sex_id');
    }
    public function tests()
    {
        return $this->hasMany('App\Models\MhpGreatLabInvoiceDetails', 'invoiceNo', 'invoiceNo');
    }

    public function reports()
    {
        return $this->hasMany('App\Models\MhpGreatLabReport', 'invoice_id')->with('test', 'details');
    }

    public function parameterGroup()
    {
        return $this->hasMany('App\Models\MhpLabTestParameterNameAndUnit', 'test_id')->with('parameter_value', 'parameter_config');
    }
    public function inventory()
    {
        return $this->hasMany(GreatLabInvoiceInventory::class, 'invoice_id')->select('invoice_id', 'name', 'price', 'quantity');
    }
    // for report
    public function doctor()
    {
        return $this
            ->belongsTo(MhpDoctorsMaster::class, 'referrer')
            ->select('id', 'dr_given_name', 'dr_middle_name', 'dr_last_name', 'dr_identity_no', 'dr_work_phone', 'title', 'specialists_id')
            ->with('specialist', 'title', 'academic');
    }
    public function plan()
    {
        return $this->belongsTo(DoctorsLabPointsPlan::class, 'active_plan', 'id')->select('id')->with('share');
    }
    public function sales()
    {
        return $this->belongsTo(GreatLabMarketer::class, 'marketer', 'id');
    }
    public function shift()
    {
        return $this->belongsTo(LabShift::class, 'shift_id', 'id');
    }
    public function details()
    {
        return $this->hasMany('App\Models\MhpGreatLabInvoiceDetails', 'invoiceNo', 'invoiceNo')->select('id', 'invoiceNo', 'testCode', 'testName', 'discount', 'fee', 'point', 'point_percent');
    }

    public function money_recipts()
    {
        return $this->hasMany(MhpGreatLabMoneRecipt::class,  'invoice_number', 'invoiceNo')->orderBy('id', 'desc')->select('invoice_number', 'money_receipt_number', 'money_receipt_type', 'requested_amount', 'paid_amount', 'due_amount', 'created_at');
    }
}
