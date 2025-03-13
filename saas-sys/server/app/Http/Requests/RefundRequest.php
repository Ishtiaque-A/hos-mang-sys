<?php

namespace App\Http\Requests;


class RefundRequest extends BaseRequest
{
    public function rules()
    {
        return [

                'id' => 'required|integer',
                //'note' => 'required|string',
                //'amount' => 'required|numeric|min:0',
                'account_details' => 'nullable|string',
                'refund_note' => 'nullable|string',
                'refund_reference' => 'nullable|string',
                //'refund_by' => 'nullable|string',
                'status' => 'required|integer|between:0,3', // Ensure 'status' is an integer between 0 and 3.

        ];
    }
}
