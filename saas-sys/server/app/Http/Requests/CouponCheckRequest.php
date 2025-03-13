<?php

namespace App\Http\Requests;


class CouponCheckRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'coupon_id'=>'required',
            'plan_id'=>'required|integer'
        ];
    }
}
