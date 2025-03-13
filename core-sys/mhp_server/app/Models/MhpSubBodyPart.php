<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpSubBodyPart extends Model
{
    use HasFactory;
    public function MainBodyPart()
    {
        return $this->belongsTo('App\Models\MhpMainBodyPart','MainBodyPart_id')->select('id','MainBodyPart_name');
    }
}
