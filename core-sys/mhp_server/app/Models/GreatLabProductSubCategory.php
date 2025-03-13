<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabProductSubCategory extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(GreatLabProductCategory::class, 'category_id', 'id');
    }
}
