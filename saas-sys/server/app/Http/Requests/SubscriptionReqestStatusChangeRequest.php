<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubscriptionReqestStatusChangeRequest extends FormRequest
{

    public function rules()
    {
        return [
            'subscription_plan_id' => 'required|integer',
            'subscription_request_id' => 'integer',
            'status' => 'required|integer',
            'business_type' => 'nullable|in:B2B,B2C'
        ];
    }
}
