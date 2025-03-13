<?php

namespace App\Http\Requests;


class RedirectTokenRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'to_url' => 'required|string',
        ];
    }
}
