<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;


class UpdateProfileRequest extends BaseRequest
{

    public function rules()
    {

        return [
            'name' => 'required',
            'photo' => 'string',
            'email' => [
                'required','email'],
            'mobile' => 'required|string|regex:/^01[0-9]{9}$/',
        ];
    }
}
