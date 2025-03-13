<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpGreatLabReport extends Model
{
    use HasFactory;
    public function details()
    {
        return $this->hasMany('App\Models\MhpGreatLabReportDetails', 'report_id')->with('parameter');
    }
    public function parameterGroup()
    {
        return $this->hasMany('App\Models\ParameterGroupName', 'test_name_id', 'test_id')->with('parameter');
    }
    public function test()
    {
        return $this->belongsTo('App\Models\MhpNewLabModuleTestName', 'test_id')->with('parameter_group');
    }
    public function test_only()
    {
        return $this->belongsTo('App\Models\MhpNewLabModuleTestName', 'test_id')->select('id', 'hide_test_name');
    }
}
