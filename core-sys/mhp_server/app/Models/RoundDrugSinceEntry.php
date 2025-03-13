<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoundDrugSinceEntry extends Model
{
    use HasFactory;
    public function drug()
    {
        return $this->belongsTo(DoctorRoundDrugSinceDrug::class, 'drug_id', 'id');
    }
}
