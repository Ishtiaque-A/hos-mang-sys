<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabCentralStock extends Model
{
    use HasFactory;
    public function product ()
    {
        return $this->belongsTo(GreatLabInventory::class, 'product_id', 'id')->select('id', 'name','item_code');
    }
    public function in ()
    {
        return $this->hasMany(GreatLabStockInDetails::class, 'product_id', 'product_id');
    }
    public function out ()
    {
        return $this->hasMany(GreatLabCentralStockOut::class, 'product_id', 'product_id');
    }
}
