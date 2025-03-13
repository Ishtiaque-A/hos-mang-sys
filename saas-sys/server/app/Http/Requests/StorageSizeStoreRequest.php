<?php

namespace App\Http\Requests;


class StorageSizeStoreRequest extends BaseRequest
{
    public function rules()
    {
        $method = $this->method();

        return [
            'name' => 'required|string',
            'size' => 'required|integer',

            ...match ($method) {
                'PUT' => [
                    'id' => 'required|numeric|exists:storage_sizes,id',
                ],
                default => [],
            }
        ];
    }
}
