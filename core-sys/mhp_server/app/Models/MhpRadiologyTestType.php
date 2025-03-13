<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpRadiologyTestType extends Model
{
    use HasFactory;
     public function testName()
    {
        return $this->belongsTo('App\Models\MhpRadiologyTestName','radiology_test_id')->select('id','radiology_test_name');
    }
}
