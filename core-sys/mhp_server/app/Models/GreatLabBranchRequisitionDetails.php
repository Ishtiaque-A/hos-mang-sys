<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabBranchRequisitionDetails extends Model
{
    use HasFactory;
    public function product()
    {
        return $this->belongsTo(GreatLabInventory::class, 'product_id', 'id')->select('id', 'name', 'item_code');
    }
    public function stocks()
    {
        return $this->belongsTo(GreatLabCentralStock::class, 'product_id', 'product_id')->select('id', 'product_id', 'stock');
    }
}
