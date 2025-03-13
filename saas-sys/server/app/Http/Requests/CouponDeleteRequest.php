<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CouponDeleteRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'id'=>'array',
            'status'=>'integer'
        ];
    }
}
