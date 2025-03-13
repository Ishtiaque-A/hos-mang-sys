<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabPointRedeem extends Model
{
    use HasFactory;
    public function details()
    {
        return $this->hasMany(PointsRedeemDetails::class, 'redeem_id', 'id')->with('invoice');
    }
    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'user_id', 'id')->select('id', 'dr_given_name', 'dr_middle_name', 'dr_last_name', 'dr_identity_no', 'specialists_id', 'title', 'dr_work_phone', 'dr_dob', 'dr_address_line_1', 'dr_email')->with('title', 'specialist');
    }
}
