<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabStock extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'stock',
        'bonus_qty',
        'price',
        'opening_stock',
        'closing_stock',
    ];

    public function product()
    {
        return $this->belongsTo(GreatLabInventory::class, 'product_id', 'id');
    }
    public function stockIn()
    {
        return $this->hasMany(GreatLabStockInDetails::class, 'product_id', 'product_id');
    }

    public function stockOut()
    {
        return $this->hasMany(GreatLabStockOut::class, 'product_id', 'product_id');
    }
    public function location()
    {
        return $this->belongsTo(GreatLabStockLocation::class, 'location_id');
    }
    
}
