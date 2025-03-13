<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocPointPlanAssign extends Model
{
    use HasFactory;
    public function invoice()
    {
        return $this->hasMany(MhpGreatLabInvoice::class, 'referrer', 'share_user_id')->select('id', 'referrer', 'point_amount', 'point_share', 'totalBill', 'invoiceNo','discount')->withSum('details','point');
    }
    public function redeem()
    {
        return $this->hasMany(GreatLabPointRedeem::class, 'user_id', 'share_user_id')->select('id', 'user_id', 'redeem_amount');
    }
    public function plan()
    {
        return $this->belongsTo(DoctorsLabPointsPlan::class, 'plan_id', 'id')->with('shares');
    }

    public function shares()
    {
        return $this->hasMany(DoctorsLabPointsPlanShares::class, 'plan_id', 'plan_id');
    }
    public function invoice_only()
    {
        return $this->hasMany(MhpGreatLabInvoice::class, 'point_plan', 'id')->select('id', 'point_plan', 'active_plan', 'totalBill', 'invoiceNo')->with('details');
    }
    public function doctor()
    {
        return $this->belongsTo(MhpDoctorsMaster::class, 'share_user_id', 'id')->select('id', 'dr_given_name', 'dr_middle_name', 'dr_last_name', 'dr_identity_no');
    }
}
