<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpNewLabModuleTestGroup extends Model
{
    use HasFactory;

    public function getTestCategory(){

        return $this->hasMany(MhpNewLabModuleTestCategory::class,'test_group_id','id');
    }
}
