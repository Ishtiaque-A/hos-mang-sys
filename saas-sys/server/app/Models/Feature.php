<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends BaseModel
{
    public function parent()
    {
        return $this->belongsTo(Feature::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Feature::class, 'parent_id');
    }
}
