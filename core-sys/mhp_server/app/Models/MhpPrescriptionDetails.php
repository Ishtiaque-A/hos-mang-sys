<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpPrescriptionDetails extends Model
{
    use HasFactory;
    public function rx()
    {
        return $this->belongsTo('App\Models\MhpRx','rx_id')
        ->select('id', 'patient_id', 'drug_id','drug_name','drug_generic_name','dose','frequency','food','others','route','quantity','brand_name');
    }
}
