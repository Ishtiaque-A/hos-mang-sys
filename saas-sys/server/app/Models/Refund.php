<?php

namespace App\Models;

class Refund extends BaseModel
{

    public function cancelRequest()
    {
        return $this->belongsTo(SubscriptionCancelRequest::class);
    }
}
