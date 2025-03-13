<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NurseTaskCategory extends Model
{
    use HasFactory;
    public function tasks()
    {
        return $this->hasMany(NurseTask::class, 'category_id');
    }
}
