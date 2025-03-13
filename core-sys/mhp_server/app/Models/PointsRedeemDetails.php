<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PointsRedeemDetails extends Model
{
    use HasFactory;
    public function invoice()
    {
        return $this->belongsTo(MhpGreatLabInvoice::class, 'invoice_id', 'id')
            ->with('details')
            ->select('id','invoiceNo','referrer', 'point_plan', 'point_plan_master', 'point_share', 'point_amount', 'totalBill','discount', 'created_at');
    }
}
