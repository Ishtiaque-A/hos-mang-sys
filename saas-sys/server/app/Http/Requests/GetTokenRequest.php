<?php

namespace App\Http\Requests;


class GetTokenRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'token' => 'required|string',
        ];
    }
}
