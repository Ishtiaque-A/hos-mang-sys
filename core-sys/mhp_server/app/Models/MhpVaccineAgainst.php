<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpVaccineAgainst extends Model
{
    use HasFactory;

    protected $fillable = [  'vaccine_id',
    'against_tags',
    'Dosages',
    'Name_of_Manufacturer',
    'Validity'];

     public function mhp_vaccine_names()
    {
        return $this->belongsTo('App\Models\mhp_vaccine_names','vaccine_id')->select('*');
    }
}
