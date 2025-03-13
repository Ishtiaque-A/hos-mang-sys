<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabPurchaseIn extends Model
{
    use HasFactory;

    public function supplier()
    {
        return $this->belongsTo(GreatLabSupplier::class, 'supplier_id')->select('id', 'name');

    }
    public function details()
    {
        return $this->hasMany(GreatLabPurchaseInDetails::class, 'purchase_id')->with('product');
    }
}
