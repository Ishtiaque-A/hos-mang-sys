<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasswordUpdateRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ];
    }
}
