<?php

namespace App\Http\Requests;

class MultipleStatusChangeRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'id' => 'required|array',
            'id.*' => 'integer',
            'status' => 'required|in:0,1,2,3',
        ];
    }
}
