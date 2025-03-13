<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabBoothRequision extends Model
{
    use HasFactory;

    public function booth()
    {
        return $this->belongsTo(GreatLabBooth::class, 'booth_id', 'id')->select('id', 'name', 'booth_no', 'branch_id');
    }
    public function details()
    {
        return $this->hasMany(GreatLabRequisitionDetails::class, 'requisition_id', 'id')
            ->select('id', 'requisition_id', 'product_id', 'quantity', 'price', 'pending_quantity', 'delivered_quantity', 'branch_id', 'dispatched_quantity')
            ->with('product', 'stocks');
    }
}
