<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemNumbers extends Model
{
    use HasFactory;
    public function dept()
    {
        return $this->belongsTo(MhpDoctorsDepartment::class, 'department');
    }
}
