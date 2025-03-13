<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoundTreatmentProtocolCycle extends Model
{
    use HasFactory;

    public function protocol()
    {
        return $this->belongsTo(RoundTreatmentProtocolName::class, 'protocol_id');
    }

    public function drugs()
    {
        return $this->hasMany(RoundProtocolCycleDetails::class, 'protocol_cycle_id')->with('route');
    }
}
