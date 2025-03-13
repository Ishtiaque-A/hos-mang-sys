<?php

namespace App\Http\Requests;
use Illuminate\Validation\Rule;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends BaseRequest
{
    public function rules()
    {
        $method = $this->method();

        return [
            'name' => 'required|string',
            'photo' => 'nullable|string',
            'organization_id' => 'integer',
            'user_type' => 'integer',
            'status' => 'nullable|integer',
            ...match ($method) {
                'PUT' => [
                    'id' => 'required|numeric',
                    'email' => [
                        'required',
                        Rule::unique('users')->ignore($this->id),
                    ],
                    'mobile' => [
                        'required',
                        'string',
                        'regex:/^01[0-9]{9}$/',
                        Rule::unique('users')->ignore($this->id),
                    ],

                ],
                'POST' =>[
                    'password' => 'required|string|min:6',
                    'email' => 'required|email|unique:users,email',
                    'mobile' => 'required|string|unique:users|regex:/^01[0-9]{9}$/',
                ],
                default => [],
            }
        ];
    }
}
