<?php

namespace App\Http\Requests;

class SubscriptionPlanRequest extends BaseRequest
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
            'validity_id' => 'required|integer',
            'user_limit' => 'required|integer|min:1',
            'storage_limit_id' => 'required|integer',
            'price' => 'required|integer|min:0',
            'details' => 'required|string',
            'status' => 'integer',
            'type' => 'integer',
            'subscription_request_id' => 'integer',
            'features'=> 'required|array|min:1',
            'features.*'  => 'required|int|distinct',
            ...match ($method) {
                'PUT' => [
                    'id' => 'required|numeric',
                ],
                default => [],

            }
        ];
    }

}
