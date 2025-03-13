<?php

namespace App\Http\Requests;

class FeatureRequest extends BaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $method = $this->method();

        return [
            'name' => 'required|string',
            'details' => 'string',
            'parent_id' => 'integer',
            'status' => 'integer',
            ...match ($method) {
                'PUT' => [
                    'id' => 'required|numeric',
                ],
                default => [],
            }
        ];
    }

}
