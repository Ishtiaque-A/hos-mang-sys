<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpLabTestParameterNameAndUnit extends Model
{
    use HasFactory;
    protected $fillable = [
        'parameter',
        'parameter_name',
        'unit',
        'parameter_id',
        'parameter_group_id',
        'test_id',
    ];
    public function parameter_value()
    {
        return $this->hasMany('App\Models\MhpNewLabModuleTestParameter', 'parameter');
    }
    public function parameter_config()
    {
        return $this->belongsTo('App\Models\TestNameConfig', 'id', 'parameter_id');
    }
    public function reportResult()
    {
        return $this->belongsTo("App\Models\MhpGreatLabReportDetails", "parameter_id",);
    }
}
