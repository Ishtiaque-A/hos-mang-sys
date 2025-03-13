<?php

namespace App\Models;

class PaymentAttempt extends BaseModel
{
    public function purchase()
    {
        return $this->belongsTo(Purchase::class, 'purchase_attempt_id');
    }
}
