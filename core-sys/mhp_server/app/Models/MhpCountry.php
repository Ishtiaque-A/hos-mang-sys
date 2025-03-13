<?php

namespace App\Models;

use App\Models\MhpDoctorsAcademic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MhpCountry extends Model
{
    use HasFactory;

    //    protected $table = 'mhp_countries';
    //    protected $fillable = [
    //        'country_name',
    //    ];

    public function doctorsAcademic()
    {
        return $this->belongsTo(MhpDoctorsAcademic::class, 'id', 'country_id');
    }
}
