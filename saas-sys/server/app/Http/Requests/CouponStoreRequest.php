<?php

namespace App\Http\Requests;


use Illuminate\Validation\Rule;

class CouponStoreRequest extends BaseRequest
{

    public function rules()
    {
        $method = $this->method();

        return [
            'amount' => 'required|integer',
            'discount_type' => 'required|in:0,1',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'status' => 'nullable|integer',
            'user_type' => 'required|in:0,1',
            'subscription_plan_type' => 'required|in:0,1',
            'plan_ids' => 'nullable|required_if:subscription_plan_type,1|array',
            'user_ids' => 'nullable|required_if:user_type,1|array',

            ...match ($method) {
                'PUT' => [
                    'id' => 'required|numeric',
                    'code' => [
                        'required',
                        Rule::unique('coupons')->ignore($this->id),
                    ],
                ],
                'POST' =>[
                    'code' => 'required|string|unique:coupons',
                ],
                default => [],
            }
        ];
    }
}
