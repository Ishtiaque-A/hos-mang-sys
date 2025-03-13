<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpLabModuleTestSubCategory extends Model
{
    use HasFactory;
    public function group() {
        return $this->belongsTo('App\Models\MhpNewLabModuleTestGroup', 'test_group_id')->select('id','test_group_name');
    }
    public function category() {
        return $this->belongsTo('App\Models\MhpLabModuleTestCatgeory', 'test_category_id')->select('id','test_category_name');
    }
}
