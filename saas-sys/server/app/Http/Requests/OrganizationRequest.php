<?php

namespace App\Http\Requests;


use Illuminate\Validation\Rule;

class OrganizationRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules() : array
    {
        $method = $this->method();

        return [

            'name' => 'required|string',
            'address' => 'required|string',
            'mobile' => 'required|string|regex:/^01[0-9]{9}$/',
            'contact_person_name' => 'required|string',
            'contact_person_mobile' => 'required|string',
            'contact_person_email' => 'required|email',
            'contact_person_designation' => 'string',
            'description' => 'string',
            'logo' => 'string',
            'meta_tags' => 'string',
            'status' => 'integer',
            'special_plan_id' => 'nullable|integer',

            ...match ($method) {
                'PUT' => [
                    'id' => 'required|numeric',
                    'email' => [
                        'required',
                        Rule::unique('organizations')->ignore($this->id),
                    ],
                ],
                'POST' =>[
                    'email' => 'required|string|unique:organizations',
                ],
                default => [],
            }
        ];
    }
}
