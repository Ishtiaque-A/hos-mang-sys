<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpLabAgent extends Model
{
    use HasFactory;
    public function titleName()
    {
        return $this->belongsTo('App\Models\MhpTitle','title')->select('id','title_name');
    }

    public function genderName()
    {
        return $this->belongsTo('App\Models\MhpBirthSex','gender')->select('id','birth_sex_name');
    }

    // public function city()
    // {
    //     return $this->belongsTo('App\Models\MhpCity','dr_city_id')->select('id','city_name');
    // }
}
