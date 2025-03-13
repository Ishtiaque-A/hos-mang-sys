<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpGreatLabReportDetails extends Model
{
    use HasFactory;
    // public function parameter()
    // {
    //     return $this->hasMany(MhpLabTestParameterNameAndUnit::class, 'id', 'parameter_id')->with('parameter_config', 'parameter_value');
    // }
    public function parameter()
    {
        return $this->belongsTo(MhpLabTestParameterNameAndUnit::class, 'parameter_id');
    }
}
