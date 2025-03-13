<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabBooth extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
        'booth_no',
    ];
    public function stocks ()
    {
        return $this->hasMany(GreatLabBoothStock::class, 'booth_id')->select('id', 'booth_id', 'quantity','product_id','price')->with('product');
    }
}
