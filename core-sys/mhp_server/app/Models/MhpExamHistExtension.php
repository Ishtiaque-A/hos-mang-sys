<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpExamHistExtension extends Model
{
    use HasFactory;

    public function examination()
    {
        return $this->belongsTo('App\Models\MhpExamination','examination_name_id')->select('id','examination_code','examination_name');
    }

    public function history()
    {
        return $this->belongsTo('App\Models\MhpHistory','history_name_id')->select('id','history_code','history_name');
    }
}
