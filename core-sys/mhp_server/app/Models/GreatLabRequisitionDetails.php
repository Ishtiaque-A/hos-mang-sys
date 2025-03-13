<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabRequisitionDetails extends Model
{
    use HasFactory;

    public function product()
    {
        return $this->belongsTo(GreatLabInventory::class, 'product_id', 'id')->select('id', 'name', 'item_code');
    }
    public function requisition()
    {
        return $this->belongsTo(GreatLabBoothRequision::class, 'requisition_id', 'id')->select('id', 'requisition_no', 'approved_by');
    }
    public function stocks()
    {
        return $this->hasMany(GreatLabStock::class, 'product_id', 'product_id')->select('id', 'product_id', 'stock', 'location_id', 'branch_id')->with('location');
    }
}
