<?php

namespace App\Http\Requests;


class CardStoreRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'number' => 'required|string',
            'ccv' => 'nullable|integer',
            'expire_month' => 'required|string|max:255',
            'expire_year' => 'required|string|max:255',
            ];
    }

}
