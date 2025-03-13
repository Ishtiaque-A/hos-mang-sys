<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpInstitution extends Model
{
    use HasFactory;
    public function academic()
    {
        return $this->belongsTo(MhpDoctorsAcademic::class, 'id', 'institution_id');
    }
}
