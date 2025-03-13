<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnlineAppointmentBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_hn_number',
        'doctor_id',
        'date',
        'time',
        'appointment_type',
        'calling_type',
        'chamber_id',
        'disease',
        'payment_type',
        'amount',
        'transaction_no',
    ];

    public function patients()
    {
        return $this->belongsTo(MhpPatient::class, 'patient_hn_number', "patient_hn_number")->with('patient_birth_sex', 'token', 'doctorPayments');
    }

    public function doctors()
    {
        return $this->belongsTo('App\Models\MhpDoctorsMaster', 'doctor_id')->with('title');
    }
    public function schedule()
    {
        return $this->belongsTo('App\Models\MhpAppointmentScheduler', 'reschedule_id');
    }
    public function appointment()
    {
        return $this->belongsTo('App\Models\MhpAppointmentScheduler', 'reschedule_id')->with('isExistPrescription');
    }
    public function appointment_comment()
    {
        return $this->hasOne('App\Models\AppointmantComment', 'appointment_request_id')->latest();
    }
    public function consult_comment()
    {
        return $this->hasOne('App\Models\ConsultationComment', 'appointment_request_id')->latest();
    }
}
