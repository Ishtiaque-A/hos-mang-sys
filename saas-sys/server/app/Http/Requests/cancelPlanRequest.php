<?php

namespace App\Http\Requests;


class cancelPlanRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'purchase_id' => 'required|integer',
            'reason' => 'required|string',
        ];
    }
}
