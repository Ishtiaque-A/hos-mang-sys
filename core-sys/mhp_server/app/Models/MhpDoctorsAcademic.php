<?php

namespace App\Models;

use App\Models\MhpCountry;
use App\Models\MhpInstitution;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MhpDoctorsAcademic extends Model
{
    use HasFactory;
    public function doctor()
    {
        return $this->hasMany('App\Models\MhpDoctorsMaster', 'doctors_master_id', 'id');
    }

    public function inistitution()
    {
        return $this->hasMany(MhpInstitution::class, 'id', 'institution_id')->select('id', 'name');
    }
    public function country()
    {
        return $this->hasMany(MhpCountry::class, 'id', 'country_id')->select('id', 'country_name');
    }
}
