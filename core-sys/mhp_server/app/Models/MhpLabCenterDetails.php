<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpLabCenterDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'address1',
        'address2',
        'email',
        'city_id',
        'postal_code',
        'country_id',
        'phone',
        'mobile',
        'service',
        'name',
    ];
    public function city()
    {
        return $this->belongsTo('App\Models\MhpCity', 'city_id')->select('id', 'city_name');
    }
    public function country()
    {
        return $this->belongsTo('App\Models\MhpCountry', 'country_id')->select('id', 'country_name');
    }
}
