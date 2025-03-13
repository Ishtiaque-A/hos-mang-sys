<?php

namespace App\Http\Requests;

class PaymentAtteptRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'purchase_attempt_id' => 'required|integer',
            'amount' => 'required|integer',
            'status' => 'required|in:0,1,2',
            'comment' => 'nullable|string|max:255',
            ];
    }
}
