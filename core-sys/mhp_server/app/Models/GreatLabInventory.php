<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabInventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'item_code',
        'description',
        'manufacturer',
        'mrp',
        'purchase_price',
        'expiry_date',
        'category_id',
        'sub_category_id',
        'opening_stock',
        'image',
        'status',
    ];
    
}
