<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoundUrineResult extends Model
{
    use HasFactory;
    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'doctor_id');
    }
}
