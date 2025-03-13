<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpDrugName extends Model
{
    use HasFactory;

    public function generic_name()
    {
        return $this->belongsTo('App\Models\MhpDrugGenericName','generic_id')->select('id','name');
    }
}
