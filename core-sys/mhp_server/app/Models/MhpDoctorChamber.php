<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpDoctorChamber extends Model
{
    use HasFactory;
    protected $guarded=[];
    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'doctor_id', 'id');
    }
    public function usual_provider()
    {
        return $this->belongsTo(MhpUsualProvider::class, 'chamber_id', 'id');
    }
}
