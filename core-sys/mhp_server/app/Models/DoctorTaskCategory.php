<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorTaskCategory extends Model
{
    use HasFactory;
    public function tasks()
    {
        return $this->hasMany(DoctorTask::class, 'category_id', 'id');
    }
}
