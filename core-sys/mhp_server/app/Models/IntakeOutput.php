<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IntakeOutput extends Model
{
    use HasFactory;
    public function details()
    {
        return $this->hasMany(IntakeOutputDetails::class, 'intake_output_id');
    }
}
