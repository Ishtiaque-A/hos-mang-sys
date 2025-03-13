<?php

namespace App\Http\Controllers\MobileApp;

use App\Http\Controllers\Controller;
use App\Models\MhpPatient;
use App\Models\PhoneNumberVerification;
use App\Models\SmsHistory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Hash;
use Illuminate\Validation\Rule;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class PatientAuthController extends Controller
{
    public function send_verification_code(Request $request)
    {
        // return response()->json(['message' => 'Verification code sent successfully', 'req' => $request->all()]);
        $request->validate([
            'phone_number' =>  [
                'required',
                'string',
                'max:14', // Check uniqueness in the 'users' table
            ]
        ]);

        $user =  User::where("email", $request->input('phone_number'))->where('user_type', 'Patient')->first();
        if ($user) {
            return response([
                'message' => 'User already registered!'
            ], 401);
        }

        $verificationCode = rand(1000, 9999); // Generate a random 4-digit verification code
        $phoneNumber = $request->input('phone_number');
        $countryCode = substr($phoneNumber, 0, 4);
        $message = "(macrohealthplus) Your Digipatient verification code is: {$verificationCode}.Thank you.";

        if ($countryCode === '+880') {
            // $res =  Http::post("https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=fauziaali2000@gmail.com&password=80f50e35f83130f022e78a2862aab390&MsgType=TEXT&receiver={$phoneNumber}&message={$message}");
            $res = Http::post("https://api.sms.net.bd/sendsms?api_key=Qi5AYc3ln98s422LNXhFo62RWOReTqG3eDulVr00&msg=${message}&to=${phoneNumber}");
            $token = Str::random(50);
            $data = PhoneNumberVerification::create([
                'phone_number' => $phoneNumber,
                'verification_code' => $verificationCode,
                'token' => $token
            ]);

            $parsed = json_decode($res->body(), true);

            if (isset($parsed["error"])) {
                $responseData = [
                    'message' => $parsed["msg"],
                    "sms-send-count" => $parsed
                ];

                if ($parsed['error'] == 0) {
                    $responseData['token'] = $data->token;
                    SmsHistory::create([
                        'sms_type' => 'OTP',
                        'sms_to' => $phoneNumber,
                        'message' => $message,
                        'status' => 'sent',
                        'code' => $verificationCode,
                        'sms_from' => ''
                    ]);
                    return response()->json($responseData);
                } else {
                    return response()->json($responseData, 500);
                }
            } else {
                return response()->json($parsed, 500);
            }
        } else {
            try {
                $client = new Client();

                $response = $client->post('https://vvxw9r.api.infobip.com/sms/2/text/advanced', [
                    'headers' => [
                        'Authorization' => 'App 39e73aff5379c5e5aef2c6077b613234-063d919f-9426-4c94-abc4-ab083747787d',
                        'Content-Type' => 'application/json',
                        'Accept' => 'application/json',
                    ],
                    'json' => [
                        'messages' => [
                            [
                                'destinations' => [
                                    ['to' => $phoneNumber],
                                ],
                                'from' => '61485889521',
                                'text' => $message,
                            ],
                        ],
                    ],
                ]);

                if ($response->getStatusCode() == 200) {
                    $token = Str::random(50);

                    $data = PhoneNumberVerification::create([
                        'phone_number' => $phoneNumber,
                        'verification_code' => $verificationCode,
                        'token' => $token,

                    ]);
                    SmsHistory::create([
                        'sms_type' => 'OTP',
                        'sms_to' => $phoneNumber,
                        'message' => $message,
                        'status' => 'sent',
                        'code' => $verificationCode,
                        'sms_from' => ''
                    ]);
                    return response()->json([
                        'message' => 'Verification code sent successfully',
                        "rr" => $response->getBody()->getContents(),
                        'token' => $data->token
                    ]);
                } else {
                    return 'Unexpected HTTP status: ' . $response->getStatusCode() . ' ' . $response->getReasonPhrase();
                }
            } catch (RequestException $e) {
                return 'Error: ' . $e->getMessage();
            }
        }
    }
    public function send_verification_code_forgot_password(Request $request)
    {
        $request->validate([
            'phone_number' =>  [
                'required',
                'string',
                'max:16',
            ]
        ]);

        $user =  User::where("email", $request->input('phone_number'))->where('user_type', 'Patient')->first();
        if (!$user) {
            return response([
                'message' => 'User not found !'
            ], 404);
        }

        $verificationCode = rand(1000, 9999); // Generate a random 4-digit verification code
        $phoneNumber = $request->input('phone_number');
        $countryCode = substr($phoneNumber, 0, 4);
        $message = "Your verification code : {$verificationCode}";
        if ($countryCode === '+880') {
            // $response = Http::post("https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=fauziaali2000@gmail.com&password=80f50e35f83130f022e78a2862aab390&MsgType=TEXT&receiver={$phoneNumber}&message={$message}");
            $res = Http::post("https://api.sms.net.bd/sendsms?api_key=Qi5AYc3ln98s422LNXhFo62RWOReTqG3eDulVr00&msg=${message}&to=${phoneNumber}");
            $token = Str::random(50);
            $parsed = json_decode($res->body(), true);

            $data = PhoneNumberVerification::create([
                'phone_number' => $phoneNumber,
                'verification_code' => $verificationCode,
                'token' => $token
            ]);

            if (isset($parsed["error"])) {
                $responseData = [
                    'message' => $parsed["msg"],
                    "sms-send-count" => $parsed
                ];

                if ($parsed['error'] == 0) {
                    $responseData['token'] = $data->token;
                    return response()->json($responseData);
                } else {
                    return response()->json($responseData, 500);
                }
            } else {
                return response()->json($parsed, 500);
            }
        } else {
            try {
                $client = new Client();

                $response = $client->post('https://vvxw9r.api.infobip.com/sms/2/text/advanced', [
                    'headers' => [
                        'Authorization' => 'App 39e73aff5379c5e5aef2c6077b613234-063d919f-9426-4c94-abc4-ab083747787d',
                        'Content-Type' => 'application/json',
                        'Accept' => 'application/json',
                    ],
                    'json' => [
                        'messages' => [
                            [
                                'destinations' => [
                                    ['to' => $phoneNumber],
                                ],
                                'from' => '61485889521',
                                'text' => $message,
                            ],
                        ],
                    ],
                ]);

                if ($response->getStatusCode() == 200) {
                    $token = Str::random(50);
                    $data = PhoneNumberVerification::create([
                        'phone_number' => $phoneNumber,
                        'verification_code' => $verificationCode,
                        'token' => $token
                    ]);
                    return response()->json(['message' => 'Verification code sent successfully', 'token' => $data->token]);
                } else {
                    return 'Unexpected HTTP status: ' . $response->getStatusCode() . ' ' . $response->getReasonPhrase();
                }
            } catch (RequestException $e) {
                return 'Error: ' . $e->getMessage();
            }
        }
    }
    public function verification_check(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'phone_number' => 'required',
            'verification_code' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {
            $data = PhoneNumberVerification::where(['token' => $request->token, 'phone_number' => $request->phone_number, 'verification_code' => $request->verification_code])->first();
            if ($data) {
                $data->verify_at = date('Y-m-d H:i:s');
                $data->save();

                return response()->json(['message' => 'Phone number verified', 'verify' => true]);
            }
            return response()->json(['message' => 'Invalid verification code']);
        }
    }
    public function patient_token($hn)
    {
        $data = MhpPatient::where('patient_hn_number', $hn)->first();
        if (!$data) {
            return response()->json(['message' => 'Patient not found']);
        }
        $token = User::where('user_id', $data->id)->value('deviceToke');
        return response()->json(['token' => $token]);
    }
    // public function patients_sign_up(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'token' => 'required',
    //         'phone_number' => 'required',
    //         'verification_code' => 'required',

    //         'patient_first_name' => 'required',
    //         'patient_birth_sex_id' => 'required',
    //         'ptn_blood_group_id' => 'required',
    //         'patient_dob' => 'required',
    //         'password' => 'required|min:8'   

    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json($validator->messages());
    //     } else{
    //         $data = PhoneNumberVerification::where(['token'=>$request->token,'phone_number'=>$request->phone_number,'verification_code'=>$request->verification_code])->first();
    //         if ($data) {
    //             $dataPatient = MhpPatient::latest()->first();
    //             $generate = $dataPatient->id+100000000001;
    //             $patient_hn_generate = "HN-{$generate}";

    //             if ($files = $request->file('image')) {
    //                 $names = $files->getClientOriginalName();
    //                 $name = rand(111, 99999) . $names;
    //                 $files->move('images/files/', $name);
    //             } else {
    //                 $name = "";
    //             }
    //             $patients = new MhpPatient();
    //             $patients->patient_hn_number = $patient_hn_generate;
    //             $patients->patient_first_name = $request->patient_first_name;
    //             $patients->ptn_blood_group_id = $request->ptn_blood_group_id;
    //             $patients->patient_last_name = $request->patient_last_name;

    //             $patients->patient_mobile_phone = $request->phone_number;
    //             $patients->patient_birth_sex_id = $request->patient_birth_sex_id;
    //             $patients->patient_address1 = $request->patient_address1;
    //             $patients->patient_images = $name;
    //             $patients->patient_dob = $request->patient_dob;
    //             $patients->patient_status = 1;

    //             $patients->patient_email = $request->patient_email;

    //             $patients->save();

    //             $data = new User();
    //             $data->name = $request->patient_first_name;
    //             $data->email = $request->phone_number;
    //             $data->password = Hash::make($request->password);
    //             $data->user_type ='Patient';
    //             $data->user_id =$patients->id;
    //             $data->save();

    //             return response()->json(['message' => 'Phone number verified and user registered successfully',
    //             'patients'=>$patients,
    //             'data'=>$data
    //         ],200);
    //         }
    //         return response()->json(['message' => 'Oops! Something is wrong'],400);
    //     }

    // }

}
