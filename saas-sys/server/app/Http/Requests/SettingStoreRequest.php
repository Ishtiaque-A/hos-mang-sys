<?php

namespace App\Http\Requests;

class SettingStoreRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'organization_id' => 'nullable',
            'is_2fa' => 'nullable',
            'is_api_key' => 'nullable',
            'is_notification' => 'nullable',
            'is_push_notification' => 'nullable',
            'is_sms_notification' => 'nullable',
            'is_email_notification' => 'nullable',
            'is_sso' => 'nullable',
            'is_social_login' => 'nullable',
            'is_direct_purchase' => 'nullable',
            'contact_number' => 'required|string',
            'contact_mail' => 'nullable|email',
            'currency' => 'nullable|string',
            'logo' => 'nullable|string',
            'id'=>'required|integer'
        ];
    }
}
