<?php

use App\Models\MhpSms;
use App\Models\SmsAllowedCountries;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

if (!function_exists('sendLocalSms')) {
    function sendLocalSms($sms, $mobile, $userName, $password, $url)
    {
        // $mobile = $request->mobile;
        // $sms = $request->sms;
        // $sms = urlencode($sms);

        $params = [
            'masking' => 'NOMASK',
            'userName' => $userName,
            'password' => $password,
            'MsgType' => 'TEXT',
            'receiver' => $mobile,
            'message' => $sms,
        ];

        $url .= '?' . http_build_query($params);

        // Set up options for the HTTP request
        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
            ],
        ];

        // Create a stream context
        $context = stream_context_create($options);

        // Make the request and get the response
        $result = file_get_contents($url, false, $context);

        // Handle the response (you may need to adjust this based on the actual API response format)
        $responseData = json_decode($result, true);
        if ($responseData && $responseData[0]['success'] == 1) {
            // SMS sent successfully
            return ['message' => 'Sms sent successfully', 'status' => $responseData[0]['success']];
        } else {
            // Failed to send SMS
            return  ['message' => $responseData[0]['message'], 'status' => $responseData[0]['success']];;
        }
    }
}

if (!function_exists('sendGlobalSms')) {

    function sendGlobalSms($sms, $mobile, $authorization, $from, $url)
    {
        try {
            $client = new Client();

            $response = $client->post($url, [
                'headers' => [
                    'Authorization' => $authorization,
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ],
                'json' => [
                    'messages' => [
                        [
                            'destinations' => [
                                ['to' => $mobile],
                            ],
                            'from' => $from,
                            'text' => $sms,
                        ],
                    ],
                ],
            ]);

            if ($response->getStatusCode() == 200) {
                return response()->json(['message' => 'Sms sent successfully']);
            } else {
                return 'Unexpected HTTP status: ' . $response->getStatusCode() . ' ' . $response->getReasonPhrase();
            }
        } catch (RequestException $e) {
            return 'Error: ' . $e->getMessage();
        }
    }
}

if (!function_exists('customSendSms')) {
    function customSendSms($mobile, $sms)
    {
        // Retrieve sender's country code from the incoming request
        $senderCountryCode = substr($mobile, 0, 4);
        $allowedCountries = SmsAllowedCountries::where('dial_code', $senderCountryCode)->pluck('gateway_id');
        // Find the SMS gateway that is active and supports the sender's country code
        $gateway = MhpSms::where('status', 1)
            ->whereIn('id', $allowedCountries)
            ->first();
        if ($gateway) {
            $url = $gateway->url;
            $authorization = $gateway->authorization;
            $from = $gateway->from;
            $userName = $gateway->user_name;
            $password = $gateway->password;
            // Send the SMS using the selected SMS gateway
            if ($gateway->is_api_type_parameter == 1) {
                $data = sendGlobalSms($sms, $mobile, $authorization, $from, $url);
                return response()->json($data, 200);
            } else {
                $data = sendLocalSms($sms, $mobile, $userName, $password, $url);
                if ($data['status'] == 1) {
                    return response()->json($data, 200);
                } else {
                    return response()->json($data, 400);
                }
            }
        } else {
            return response()->json(['message' => 'No suitable SMS gateway found for the sender\'s country code'], 400);
        }
    }
}


if (!function_exists('UpdateModelWithBranch')) {
    function UpdateModelWithBranch($model, $headers)
    {
        try {
            if ($headers['is-super-admin'] == 0) {
                $model->saas_branch_id = $headers['branch-id'] ?? null;
                $model->saas_branch_name = $headers['branch-name'] ?? null;
                $model->save();
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}

if (!function_exists('getBranchData')) {
    function getBranchData($headers)
    {
        if ($headers['is-super-admin'][0] == 'false') {
            return [
                'branch_id' => $headers['branch-id'][0],
                'branch_name' => $headers['branch-name'][0],
                'super_admin' => false,
                'B2B' => $headers['bs-type'][0] == 'B2B' ? true : false,
                'B2C' => $headers['bs-type'][0] == 'B2C' ? true : false,
                'user_id' => $headers['user-id'][0],
            ];
        } else {
            return [
                'super_admin' => true,
                'branch_id' => null,
                'branch_name' => null,
            ];
        }
    }
}
