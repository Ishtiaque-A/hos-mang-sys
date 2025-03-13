<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpInvoice extends Model
{
    use HasFactory;

    public function patient_id()
    {
        return $this->belongsTo('App\Models\MhpPatient','patient_id')->select('*');
    }
}
