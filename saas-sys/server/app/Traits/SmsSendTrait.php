<?php

namespace App\Traits;

use App\Models\Setting;
use App\Models\SmsLogs;
use Illuminate\Support\Facades\Http;

trait SmsSendTrait {
    use LoggingTrait;

    public function configureSms($data) {
    }

    public function sendOtp($sms) {
        $requestBody = [
            'api_token' => env('SMS_API_TOKEN'),
            'sid' => env('SMS_SID'),
            'msisdn' => $sms->phone_number,
            'sms' => $sms->message_body,
            'csms_id' => $sms->uuid,
        ];
        $this->log('debug', 'sendSms in smsSendTrait', $requestBody);

        return $this->callSmsSendApi($requestBody, 'OTP');
    }

    public function sendSms($sms) {
        $requestBody = [
            'api_token' => env('SMS_API_TOKEN'),
            'sid' => env('SMS_SID'),
            'msisdn' => $sms->phone_number,
            'sms' => $sms->message_body,
            'csms_id' => $sms->uuid,
        ];
        $this->log('debug', 'sendSms in smsSendTrait', $requestBody);

        return $this->callSmsSendApi($requestBody);
    }

    private function callSmsSendApi($params, $type = null) {
        try {
            if ($type == 'OTP') {
                $apiUrl = 'https://smsplus.sslwireless.com/api/v3/send-otp-sms';
            //                $apiUrl = env("SMS_API_URL").'api/v3/send-otp-sms';
            } else {
                $apiUrl = 'https://smsplus.sslwireless.com/api/v3/send-sms';
                //                $apiUrl = env("SMS_API_URL").'api/v3/send-sms';
            }
            //TODO: refactor this code , very very important!
            $httpRequest = Http::withHeaders([
                'Content-Type' => 'application/json',
                'accept' => 'application/json',
            ])->post($apiUrl, $params)->json();
            if (isset($httpRequest['status']) && $httpRequest['status'] === 'SUCCESS') {
                $this->updateStatus($params['csms_id'], 'done');
            }

            return ['status' => true, 'body' => $httpRequest];
        } catch (\Exception $exception) {
            $this->log('ERROR', $exception->getMessage(), $exception);
            $this->updateStatus($params['csms_id'], 'failed');

            return ['status' => false];
        }
    }

    public function storeSms($data) {
        $sms = new SmsLogs;
        $sms->user_id = $data['user_id'] ?? null;
        $sms->phone_number = $data['phone_number'];
        $sms->message_body = $data['message_body'];
        $sms->uuid = uniqid();
        $sms->status = 'processing';
        $sms->save();
        $this->log('debug', 'sendSms in storeSms', $sms);

        return $sms;
    }

    public function updateStatus($id, $status) {
        $sms = SmsLogs::where('uuid', $id)->first();
        $sms->status = $status;
        $sms->save();
    }

    public function sendSmsApiCall($data) {
        $setting = Setting::where('id', 1)->first();
        if ($setting->is_sms_notification == 0) {
            return ['status' => true, 'message' => 'message notification is disabled'];
        }
        $this->storeSms($data);
        $httpRequest = Http::withHeaders([
            'Content-Type' => 'application/json',
            'accept' => 'application/json',
            'Authorization' => 'Bearer 1534|SXkqAAqrVtBjY3cxZBFlGLV5IxjCvT2uZm0wIMW3',
        ])->post('https://gdbackend.macrohealthplus.org/api/send-delivery-sms',
            [
                'mobile' => $data['phone_number'],
                'sms' => $data['message_body'],
            ])->json();

        return ['status' => true, 'message' => 'message sent'];
    }
}
