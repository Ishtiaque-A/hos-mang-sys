<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NurseTask extends Model
{
    use HasFactory;
    public function category()
    {
        return $this->belongsTo(NurseTaskCategory::class, 'category_id', 'id');
    }
}
