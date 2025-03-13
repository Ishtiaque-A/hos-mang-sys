<?php

namespace App\Http\Requests;


class UpgradePlanRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'subscription_id'=>'required|integer',
            'actual_price'=>'required',
            'sell_price'=>'required',
            'coupon_id'=>'nullable|integer'
        ];
    }
}
