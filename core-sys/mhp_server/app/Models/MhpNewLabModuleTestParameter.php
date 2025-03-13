<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpNewLabModuleTestParameter extends Model
{
    use HasFactory;
    public function parameter_value() {
        return $this->hasMany('App\Models\MhpLabTestParameterNameAndUnit','parameter');
    }
}
