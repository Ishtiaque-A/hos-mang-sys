<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpPastHistory extends Model
{
    use HasFactory;
    protected $table = 'mhp_past_histories';
    public function doctor()
    {
        return $this->belongsTo('App\Models\MhpDoctorsMaster','doctor_id')->select('*');
    }
}
