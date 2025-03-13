<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpPatientRequest extends Model
{
    use HasFactory;
    public function patients()
    {
        return $this->belongsTo('App\Models\MhpPatient', 'patient_id', 'id')->with('patient_birth_sex');
    }
    public function doctors()
    {
        return $this->belongsTo('App\Models\MhpDoctorsMaster', 'doctors_master_id', 'id')->with('specialist', "department", "usual_provider", 'academic', 'title', 'token', 'workExperience');
    }
    public function doctor()
    {
        return $this->belongsTo('App\Models\MhpDoctorsMaster', 'doctors_master_id', 'id');
    }
    public function token()
    {
        $doctorUserData = User::where('user_type', 'Doctor')->get();

        return $this->belongsTo(User::class, 'doctors_master_id', 'user_id')
            ->when($doctorUserData->isNotEmpty(), function ($query) use ($doctorUserData) {
                $doctorIds = $doctorUserData->pluck('id')->toArray();
                return $query->whereIn('id', $doctorIds)->select('user_type', 'user_id', 'deviceToke');
            });
    }
}
