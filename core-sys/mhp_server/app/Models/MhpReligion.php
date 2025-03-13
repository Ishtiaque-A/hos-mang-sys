<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpReligion extends Model
{
    use HasFactory;

    protected $table = 'mhp_religions';
    protected $fillable = [
        'religion_name',
    ];


}
