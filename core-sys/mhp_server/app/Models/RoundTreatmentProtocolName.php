<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoundTreatmentProtocolName extends Model
{
    use HasFactory;
    public function cycles()
    {
        return $this->hasMany(RoundTreatmentProtocolCycle::class, 'protocol_id', 'id')->with('drugs');
    }
}
