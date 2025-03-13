<?php

use App\Models\SmsAllowedCountries;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\DB;
use App\Models\MhpSms;
// use App\Models\MhpSms;

// For Update Transaction 
function updateTransaction($authId, $sms, $mobile)
{
    $updateTransaction = DB::table('orders')
        ->where('organization_id', $authId)
        ->where('total_available_sms', '>', 0)
        ->where('expire_date', '>=', now())
        ->first();
    if ($updateTransaction) {
        DB::table('orders')
            ->where('id', $updateTransaction->id)
            ->update([
                'total_available_sms' => $updateTransaction->total_available_sms - 1,
                'total_use_sms' => $updateTransaction->total_use_sms + 1
            ]);

        DB::table('s_m_s_histories')->insert([
            'user_id' => $authId,
            'message' => $sms,
            'phone' => $mobile,
            'created_at' => now()
        ]);
    }
}


//  From ALpha Net Sms
if (!function_exists('sendAlphaNetSms')) {
    function sendAlphaNetSms($sms, $mobile, $url, $authorization, $authId = null)
    {
        try {
            $client = new Client();
            $options = [
                'form_params' => [
                    'api_key' => $authorization,
                    'msg' => $sms,
                    'to' => $mobile
                ]
            ];
            $response = $client->request('POST', $url, $options);
            $json = json_decode($response->getBody(), true);
            if ($json['error'] == 0) {
                if ($authId) {
                    updateTransaction($authId, $sms, $mobile);
                }
                return [
                    'message' => 'Sms sent successfully',
                    'status' => 1,
                    'data' => $json,
                    'id' => $authId
                ];
            } else {
                return [
                    'status' => 0,
                    'message' => $json['msg'],
                    'data' => $json
                ];
            }
        } catch (\Throwable $th) {
            return [
                'status' => 0,
                'message' => $th->getMessage(),
            ];
        }
    }
}

if (!function_exists('sendLocalSms')) {
    function sendLocalSms($sms, $mobile, $userName, $password, $url, $authId = null)
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
            if ($authId) {
                updateTransaction($authId, $sms, $mobile);
            }
            // SMS sent successfully
            return ['message' => 'Sms sent successfully', 'status' => $responseData[0]['success']];
        } else {
            // Failed to send SMS
            return  ['message' => $responseData[0]['message'], 'status' => $responseData[0]['success']];;
        }
    }
}

if (!function_exists('sendGlobalSms')) {

    function sendGlobalSms($sms, $mobile, $authorization, $from, $url, $authId = null)
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
                if ($authId) {
                    updateTransaction($authId, $sms, $mobile);
                }
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
        $senderCountryCode = substr($mobile, 0, 3);
        $allowedCountries = SmsAllowedCountries::where('dial_code', $senderCountryCode)->pluck('gateway_id');
        // Find the SMS gateway that is active and supports the sender's country code
        $gateway = MhpSms::where('status', 1)
            ->with(['countries' => function ($query) use ($senderCountryCode) {
                $query->where('dial_code', 'LIKE', $senderCountryCode . '%');
            }])
            ->first();
        if ($gateway) {
            $url = $gateway->url;
            $authorization = $gateway->authorization;
            $from = $gateway->from;
            $userName = $gateway->user_name;
            $password = $gateway->password;
            // Send the SMS using the selected SMS gateway
            if ($gateway->gateway_type == 'ALPHANET') {
                $data = sendAlphaNetSms($sms, $mobile, $url, $authorization);
                if ($data['status'] == 1) {
                    return response()->json($data, 200);
                } else {

                    return response()->json($data, 400);
                }
            }
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
