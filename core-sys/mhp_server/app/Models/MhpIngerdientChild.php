<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpIngerdientChild extends Model
{
    use HasFactory;

    public function MhpIngredient()
    {
        return $this->belongsTo('App\Models\MhpIngredient','ingredient_id')->select('*');
    }

}
