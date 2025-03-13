<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpGreatDocImmunisation extends Model
{
    use HasFactory;

    public function MhpBillingProvider()
    {
        return $this->belongsTo('App\Models\MhpBillingProvider','billing_provider_id')->select('id','name');
    }

    public function MhpGivenBy()
    {
        return $this->belongsTo('App\Models\MhpGivenBy','given_by_id')->select('*');
    }

    public function MhpBatchNo()
    {
        return $this->belongsTo('App\Models\MhpBatchNo','batch_no')->select('*');
    }

    public function MhpSite()
    {
        return $this->belongsTo('App\Models\MhpSite','site_id')->select('*');
    }

    public function MhpImmunisationRoute()
    {
        return $this->belongsTo('App\Models\MhpImmunisationRoute','route_id')->select('*');
    }

     public function mhp_vaccine_names()
    {
        return $this->belongsTo('App\Models\MhpVaccineName','vaccine_against_id');
    }
    public function MhpVaccineAgainst()
    {
        return $this->belongsTo('App\Models\MhpVaccineAgainst','vaccine_against_id');
    }
   
}
