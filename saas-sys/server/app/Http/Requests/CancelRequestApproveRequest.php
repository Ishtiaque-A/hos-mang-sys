<?php

namespace App\Http\Requests;


class CancelRequestApproveRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'id' => 'required|integer', // Ensure 'id' is required and an integer.
            'status' => 'required|in:0,1,2', // Ensure 'status' is required and either 0 or 1.
            'amount' => 'nullable|numeric|min:0', // Ensure 'amount' is required, numeric, and >= 0.
            'note' => 'nullable|string', // 'note' is optional and should be a string.
        ];
    }
}
