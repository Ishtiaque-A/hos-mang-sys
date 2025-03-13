<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpProcedureFee extends Model
{
    use HasFactory;
    public function procedure() {
        return $this->belongsTo('App\Models\MhpProcedure','procedure_id');
    }
}
