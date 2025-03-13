<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpLabModuleTestCatgeory extends Model
{
    use HasFactory;

       public function testGroup()
    {
        return $this->belongsTo('App\Models\MhpNewLabModuleTestGroup','test_group_id')->select('id','test_group_name');
    }
}
