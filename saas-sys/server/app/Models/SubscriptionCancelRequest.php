<?php

namespace App\Models;


class SubscriptionCancelRequest extends BaseModel
{
    public function purchase()
    {
        return $this->belongsTo(Purchase::class, 'purchase_id');
    }
}
