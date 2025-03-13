<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpCommonHistory extends Model
{
    use HasFactory;

    public function examination_heading()
    {
        return $this->belongsTo('App\Models\MhpExaminationHeading','examination_id')->select('id','examinationHeading_name');
    }
}
