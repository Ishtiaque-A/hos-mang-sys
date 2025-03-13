<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabPurchaseInDetails extends Model
{
    use HasFactory;
    public function product()
    {
        return $this->belongsTo('App\Models\GreatLabInventory', 'product_id')->select('id', 'name', 'manufacturer','item_code');
    }
}
