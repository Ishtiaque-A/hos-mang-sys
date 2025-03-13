<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubscriptionRequestRequest extends BaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        $method = $this->method();

        $rules = [
            'name' => 'required|string',
            'email' => 'required|string',
            'subscription_plan_id' => 'required|integer',
            'mobile' => [
                'required',
                'string',
                'regex:/^01[0-9]{9}$/',
                Rule::unique('users', 'mobile')->ignore($this->route('user')),
            ],
            'country' => 'string',
            'message' => 'required|string',
            'status' => 'integer',
        ];

        $customMessages = [
            'mobile.unique' => 'This number belongs to an existing user.',
        ];

        if ($method === 'PUT') {
            $rules['id'] = 'required|numeric';
        }

        return $rules;
    }
}



