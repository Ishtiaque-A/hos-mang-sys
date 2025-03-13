<?php

namespace App\Http\Requests;


class OrganizationUpdateRequest extends BaseRequest
{
    public function rules()
    {
        $method = $this->method();

        return [
            'name' => 'required|string',
            'address' => 'required|string',
            'special_plan_id' => 'integer',
            'mobile' => 'required|string|regex:/^01[0-9]{9}$/',
            'email' => 'required|string',
            'description' => 'required|string',
            'logo' => 'string',
        ];
    }
}
