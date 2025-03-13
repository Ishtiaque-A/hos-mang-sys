<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabBoothStock extends Model
{
    use HasFactory;
    public function product()
    {
        return $this->belongsTo(GreatLabInventory::class, 'product_id', 'id')->select('id', 'name','item_code');
    }
    public function booth()
    {
        return $this->belongsTo(GreatLabBooth::class, 'booth_id', 'id')->select('id', 'name','booth_no');
    }
}
