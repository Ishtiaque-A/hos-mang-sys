<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorRoundDrugSinceDrug extends Model
{
    use HasFactory;
    public function category()
    {
        return $this->belongsTo(DoctorRoundDrugSinceCategory::class, 'category_id', 'id');
    }
}
