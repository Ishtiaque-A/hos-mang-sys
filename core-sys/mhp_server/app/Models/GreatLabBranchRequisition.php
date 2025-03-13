<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabBranchRequisition extends Model
{
    use HasFactory;
    public function details()
    {
        return $this->hasMany(GreatLabBranchRequisitionDetails::class, 'requisition_id', 'id')->select('id', 'requisition_id', 'product_id', 'quantity', 'price','pending_quantity', 'delivered_quantity','central_delivered', 'central_pending')->with('product','stocks');
    }
}
