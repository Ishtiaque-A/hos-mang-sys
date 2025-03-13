<?php

namespace App\Http\Controllers;

use App\Models\MhpSms;
use App\Models\SmsAllowedCountries;
use App\Models\SmsCredentials;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Support\Facades\DB;

class MhpSmsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function test(Request $request)
    {
        $mobile = $request->mobile;
        $sms = $request->sms;
        // $url = 'https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php';
        // $userName = 'fauziaali2000@gmail.com';
        // $password = '80f50e35f83130f022e78a2862aab390';
        // $data = sendLocalSms($sms, $mobile, $userName, $password, $url);
        // return $data;
        // $mobile = $request->mobile;
        // $sms = $request->sms;
        // $url = 'https://ggkwee.api.infobip.com/sms/2/text/advanced';
        // $authorization = 'App c37960382407baf9187501715e99d985-89c27a05-5fd7-4c41-add5-4e6a09c92484';
        // $from = 'ServiceSMS';
        // $data = sendGlobalSms($sms, $mobile, $authorization, $from, $url);
        // return $data;
        $data = customSendSms($mobile, $sms);
        return $data;
    }
    public function index()
    {
        $data = MhpSms::with('countries', 'credentials')->orderby('id', 'desc')->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = new MhpSms();
        $data->name = $request->name;
        $data->user_id = $request->user_id;
        $data->uid = $request->uid;
        $data->url = $request->url;
        $data->is_api_type_parameter = $request->is_api_type_parameter;
        $data->status = $request->status;
        $data->from = $request->from;
        $data->authorization = $request->authorization;
        $data->password = $request->password;
        $data->user_name = $request->user_name;
        $data->provider_name = $request->provider_name;
        $data->message = $request->message;
        $data->gateway_type = $request->gateway_type;
        $data->save();
        $countryArray = $request->countries;
        $parameterArray = $request->parameter;

        foreach ($countryArray as $key => $value) {
            $country = new SmsAllowedCountries();
            $country->gateway_id = $data->id;
            $country->name = $value['name'];
            $country->code = $value['code'];
            $country->dial_code = $value['dial_code'];
            $country->flag = $value['flag'];
            $country->save();
        }
        foreach ($parameterArray as $key => $value) {
            $param = new SmsCredentials();
            $param->gateway_id = $data->id;
            $param->key = $value['key'];
            $param->value = $value['value'];
            $param->save();
        }
        return response()->json([
            'status' => 200,
            'message' => 'Sms gateway created successfully',
            'data' => $data
        ]);
    }
    public function update(Request $request, $id)
    {
        $data = MhpSms::find($id);
        $data->name = $request->name;
        $data->uid = $request->uid;
        $data->url = $request->url;
        $data->is_api_type_parameter = $request->is_api_type_parameter;
        $data->status = $request->status;
        $data->from = $request->from;
        $data->authorization = $request->authorization;
        $data->password = $request->password;
        $data->user_name = $request->user_name;
        $data->provider_name = $request->provider_name;
        $data->message = $request->message;
        $data->gateway_type = $request->gateway_type;
        $data->save();
        $countryArray = $request->countries;
        $parameterArray = $request->parameter;

        foreach ($countryArray as $key => $value) {
            if ($value['id']) {
                $country = SmsAllowedCountries::find($value['id']);
            } else {
                $country = new SmsAllowedCountries();
            }
            $country->gateway_id = $data->id;
            $country->name = $value['name'];
            $country->code = $value['code'];
            $country->dial_code = $value['dial_code'];
            $country->flag = $value['flag'];
            $country->save();
        }
        foreach ($parameterArray as $key => $value) {
            if ($value['id']) {
                $param = SmsCredentials::find($value['id']);
            } else {
                $param = new SmsCredentials();
            }
            $param->gateway_id = $data->id;
            $param->key = $value['key'];
            $param->value = $value['value'];
            $param->save();
        }
        return response()->json([
            'status' => 200,
            'message' => 'Sms gateway updated successfully',
            'data' => $data
        ]);
    }

    public function destroy_country($id)
    {

        $data = SmsAllowedCountries::find($id);
        $data->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Country removed successfully',
            'data' => $data
        ]);
    }
    public function destroy_param($id)
    {

        $data = SmsCredentials::find($id);
        $data->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Country removed successfully',
            'data' => $data
        ]);
    }
    public function update_status(Request $request, $id)

    {
        $data = MhpSms::find($id);
        if (empty($data)) {
            return response()->json(['message' => 'Data not found'], 404);
        } else {
            $data->status = $request->status;
            $data->save();
            if ($request->status == 1) {
                $all_gateway_without_this = MhpSms::where('id', '!=', $id)->get();
                foreach ($all_gateway_without_this as $key => $value) {
                    $value->status = 0;
                    $value->save();
                }
            }
            return response()->json(['message' => 'Status updated successfully'], 200);
        }
    }
    protected function isAvailablePackage($user_id)
    {
        $packages = DB::table('orders')->where("organization_id", $user_id)->get();

        if (count($packages) == 0) {
            return false; // No packages found
        }

        $smsCount = 0;
        foreach ($packages as $package) {
            if ($package->expire_date >= now()) {
                $smsCount += $package->total_available_sms;
            }
        }

        return $smsCount > 0;
    }
    public function sendSms(Request $request)
    {
        // Retrieve sender's country code from the incoming request
        $mobile = $request->input('number');
        $sms = $request->input('message');
        $senderCountryCode = substr($mobile, 0, 3);

        $auth = Auth::user();
        if (!$auth || !$this->isAvailablePackage($auth->organization_id)) {
            return response()->json(['error' => 'Please buy a package first'], 400);
        }

        // Find the SMS gateway that is active and supports the sender's country code
        $gateway = MhpSms::where('status', 1)
            ->with(['countries' => function ($query) use ($senderCountryCode) {
                $query->where('dial_code', 'LIKE', $senderCountryCode . '%');
            }])
            ->first();
        $url = $gateway->url;
        $authorization = $gateway->authorization;
        $from = $gateway->from;
        $userName = $gateway->user_name;
        $password = $gateway->password;

        if ($gateway) {
            // Send the SMS using the selected SMS gateway
            if (count($gateway['countries']) > 0) {
                if ($gateway->gateway_type == 'ALPHANET') {
                    $data = sendAlphaNetSms($sms, $mobile, $url, $authorization, $auth->organization_id);
                    return response()->json($data, 200);
                } else {
                    if ($gateway->is_api_type_parameter == 1) {
                        $data = sendGlobalSms($sms, $mobile, $authorization, $from, $url, $auth->organization_id);
                        return response()->json($data, 200);
                    } else {
                        $data = sendLocalSms($sms, $mobile, $userName, $password, $url, $auth->organization_id);
                        return response()->json($data, 200);
                    }
                }
            } else {
                return response()->json([
                    'error' => 'No suitable SMS gateway found for the sender\'s country code',
                    'data' => $gateway,
                    'senderCountryCode' => $senderCountryCode
                ], 400);
            }
        } else {
            return response()->json(['error' => 'No suitable SMS gateway found for the sender\'s country code'], 400);
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpSms  $mhpSms
     * @return \Illuminate\Http\Response
     */
    public function show(MhpSms $mhpSms)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpSms  $mhpSms
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpSms $mhpSms)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpSms  $mhpSms
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpSms $mhpSms)
    {
        //
    }
}
