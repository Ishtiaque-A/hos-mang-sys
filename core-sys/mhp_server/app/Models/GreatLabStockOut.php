<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabStockOut extends Model
{
    use HasFactory;
    public function invoice()
    {
        return $this->belongsTo(GreatLabBoothRequision::class, 'invoice_id')->select('id', 'requisition_no');
    }
    public function location()
    {
        return $this->belongsTo(GreatLabStockLocation::class, 'location_id')->select('id', 'name');
    }
}
