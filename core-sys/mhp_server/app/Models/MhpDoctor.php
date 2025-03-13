<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\OnlineAppointmentBooking;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MhpDoctor extends Model
{
    use HasFactory;
    public function doctorPayments()
    {
        return $this->hasMany(DoctorPayment::class,'doctor_id');
    }
    public function mhpPatientPrescription()
    {
        return $this->hasMany(DoctorPayment::class,'doctor_id');
    }
}
