<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorTask extends Model
{
    use HasFactory;
    public function category()
    {
        return $this->belongsTo(DoctorTaskCategory::class, 'category_id');
    }
}
