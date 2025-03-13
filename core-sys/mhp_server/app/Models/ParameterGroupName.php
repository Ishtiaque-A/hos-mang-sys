<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MhpNewLabModuleTestName;

class ParameterGroupName extends Model
{
    use HasFactory;
    protected $fillable = [
        "group_name",
        "test_name_id",
        "hidden"
    ];

    public function test_name()
    {
        return $this->belongsTo(MhpNewLabModuleTestName::class, "test_name_id", "id")->select("id", "test_name");
    }
    public function parameter()
    {
        return $this->hasMany('App\Models\MhpLabTestParameterNameAndUnit', 'parameter_group_id');
    }
    public function testNameConfig()
    {
        return $this->hasMany('App\Models\TestNameConfig', 'parameter_id');
    }
    // public function reportResult()
    // {
    //     return $this->hasMany("App\Models\MhpGreatLabReportDetails", "parameter_id");
    // }
}
