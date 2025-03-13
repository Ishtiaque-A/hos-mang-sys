<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpGreatLabMoneRecipt extends Model
{
    use HasFactory;

    public function invoice()
    {
        return $this->belongsTo(MhpGreatLabInvoice::class, 'invoice_id')
            ->with('patient', 'tests', 'reports', 'parameterGroup', 'inventory', 'doctor', 'plan', 'details');
    }
    public function invoice_only()
    {
        return $this->belongsTo(MhpGreatLabInvoice::class, 'invoice_id')->with('patient');
    }
    public function shift()
    {
        return $this->belongsTo(LabShift::class, 'shift_id', 'id');
    }
}
