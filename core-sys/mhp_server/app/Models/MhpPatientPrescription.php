<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class MhpPatientPrescription extends Model
{
    use HasFactory;
    protected $guarded=[];
    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class,'doctor_id')->with('title');
    }

    public function patient()
    {
        return $this->belongsTo(MhpPatient::class,'patient_id');
    }


    protected $dateFormat = 'Y-m-d H:i:s';
    
     // Accessor to customize the format when retrieving from the database
     public function getCreatedAtAttribute($value)
     {
         return Carbon::parse($value)->addHours(6)->format($this->dateFormat);
     }
 
     // Mutator to customize the format when saving to the database
     public function setCreatedAtAttribute($value)
     {
         $this->attributes['created_at'] = Carbon::parse($value)->format('Y-m-d H:i:s');
        
     }
}
