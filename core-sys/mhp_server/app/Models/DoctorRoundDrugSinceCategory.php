<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorRoundDrugSinceCategory extends Model
{
    use HasFactory;
    public function drugs()
    {
        return $this->hasMany(DoctorRoundDrugSinceDrug::class, 'category_id', 'id');
    }
}
