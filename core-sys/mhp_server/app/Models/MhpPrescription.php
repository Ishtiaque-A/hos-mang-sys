<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpPrescription extends Model
{
    use HasFactory;


    public function rx()
    {
        return $this->belongsTo('App\Models\MhpRx','medicen_id')->select('*');
    }
   
}
