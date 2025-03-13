<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpNewLabModuleTestName extends Model
{
    public function category()
    {
        return $this->belongsTo('App\Models\MhpLabModuleTestCatgeory', 'test_category_id')->select('id', 'test_category_name');
    }
    public function group()
    {
        return $this->belongsTo('App\Models\MhpNewLabModuleTestGroup', 'test_group_id')->select('id', 'test_group_name');
    }
    public function subCategory()
    {
        return $this->belongsTo('App\Models\MhpLabModuleTestSubCategory', 'test_sub_category_id')->select('id', 'test_sub_category_name');
    }
    public function accounts()
    {
        return $this->belongsTo('App\Models\MhpAccounts', 'accounts_id')->select('id', 'name');
    }
    public function accounts_type()
    {
        return $this->belongsTo('App\Models\MhpAccountsType', 'accounts_type_id')->select('id', 'name');
    }
    public function accounts_group()
    {
        return $this->belongsTo('App\Models\MhpDoctorFeeName', 'accounts_group_id')->select('id', 'fee_name');
    }
    public function parameter_value()
    {
        return $this->hasManyThrough(
            'App\Models\MhpNewLabModuleTestParameter',
            'App\Models\MhpLabTestParameterNameAndUnit',
            'test_id',
            'parameter',
        );
    }
    public function parameter()
    {
        return $this->hasMany('App\Models\MhpLabTestParameterNameAndUnit', 'test_id')->with('parameter_value', 'parameter_config');
    }
    public function lab_parameter()
    {
        return $this->hasMany('App\Models\MhpLabTestParameterNameAndUnit', 'test_id');
    }
    public function parameterGroup()
    {
        return $this->hasMany('App\Models\ParameterGroupName', 'test_name_id', 'id')->with('parameter');
    }
    public function parameter_group()
    {
        return $this->hasMany('App\Models\ParameterGroupName', 'test_name_id', 'id');
    }



    use HasFactory;
}
