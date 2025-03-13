<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabTestName extends Model
{
    use HasFactory;

    public function TypeName()
    {
        return $this->belongsTo('App\Models\MhpLabTestType','test_type_id')->select('*');
    }
}