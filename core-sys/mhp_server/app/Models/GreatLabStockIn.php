<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabStockIn extends Model
{
    use HasFactory;

    public function details()
    {
        return $this->hasMany('App\Models\GreatLabStockInDetails', 'stock_in_id')->with('product');
    }
    public function supplier_details()
    {
        return $this->belongsTo(GreatLabSupplier::class, 'supplier');
    }
    public function location()
    {
        return $this->belongsTo(GreatLabStockLocation::class, 'location_id')->select('id', 'name');
    }

}
