<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientLabRequestFromApp extends Model
{
    use HasFactory;
    protected $fillable = [
        'patient_id',
        'branch_id',
        'test_type',
        'test_name',
        'amount',
        'lat',
        'long',
        'sample_collention',
        'payment_number',
        'tran_id',
        'ref_num',
        'date',
        'status',
        'address'
    ];



    public function patient()
    {
        return $this->belongsTo(MhpPatient::class, 'patient_id', 'patient_hn_number');
    }
}
