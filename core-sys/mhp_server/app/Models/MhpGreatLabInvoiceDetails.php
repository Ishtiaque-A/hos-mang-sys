<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpGreatLabInvoiceDetails extends Model
{
    use HasFactory;
    public function test()
    {
        return $this->belongsTo(MhpNewLabModuleTestName::class,  'testCode', 'id');
    }
}
