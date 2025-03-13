<?php

namespace App\Http\Requests;


class SubscriptionDetailsRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules() : array
    {
        $method = $this->method();

        return [
            'organization_id' => 'required|integer',
            'user_id' => 'required|integer',
            'subscription_plan_id' => 'required|integer',
            'user_limit' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
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
