<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GreatLabBoothStockOut extends Model
{
    use HasFactory;

    public function invoice () 
    {
        return $this->belongsTo(MhpGreatLabInvoice::class, 'invoice_id')->select('id','invoiceNo');
    }
}
