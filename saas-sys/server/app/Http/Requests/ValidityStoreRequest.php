<?php

namespace App\Http\Requests;


class ValidityStoreRequest extends BaseRequest
{
    public function rules()
    {
        $method = $this->method();

        return [
            'name' => 'required|string',
            'days' => 'required|integer',

            ...match ($method) {
                'PUT' => [
                    'id' => 'required|numeric|exists:validities,id',
                ],
                default => [],
            }
        ];
    }
}
