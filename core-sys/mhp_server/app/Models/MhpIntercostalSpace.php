<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpIntercostalSpace extends Model
{
    use HasFactory;

    public function selection_criteria()
    {
        return $this->belongsTo('App\Models\MhpSelectionCriteria','selection_criteria_id')->select('id','selection_criteria_name');
    }

}
