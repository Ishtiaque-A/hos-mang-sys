<?php

namespace App\Http\Controllers;

use App\Models\SMSGateway;
use App\Models\smsGatewayDetails;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SMSGatewayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $SMSGateway = SMSGateway::with('service_titles')->get();
        return response()->json(['data' => $SMSGateway, "code" => 200], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $requestData = $request->all();

        // $saveSMSGateway = SMSGateway::create($requestData);
        $SMSGateway = new SMSGateway();
        $SMSGateway->title = $request->title;
        $SMSGateway->description = $request->description;
        $SMSGateway->currency = $request->currency;
        $SMSGateway->price = $request->price;
        $SMSGateway->expire_date = $request->expire_date;
        $SMSGateway->status = $request->status;
        $SMSGateway->duration = $request->duration;
        $SMSGateway->buy_sms_count = $request->buy_sms_count;
        $SMSGateway->save();
        foreach ($request->services as $key => $value) {
            $smsGatewayDetails = new smsGatewayDetails();
            $smsGatewayDetails->service_name = $value['name'];
            $smsGatewayDetails->status = $value['status'];
            $smsGatewayDetails->sms_gateway_id = $SMSGateway->id;
            $smsGatewayDetails->save();
        }
        return response()->json(['SMSGateway' => "SMSGateway created", "code" => 200], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SMSGateway  $sMSGateway
     * @return \Illuminate\Http\Response
     */
    public function show(SMSGateway $sMSGateway)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SMSGateway  $sMSGateway
     * @return \Illuminate\Http\Response
     */
    public function edit(SMSGateway $sMSGateway)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SMSGateway  $sMSGateway
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $status = $request->status;
        $SMSGateway = SMSGateway::find($id);
        $SMSGateway->status = $status;
        $SMSGateway->save();
        return response()->json(['SMSGateway' => "SMSGateway updated", "code" => 200], 200);
    }
    public function activeSMSGateway()
    {
        $SMSGateway = SMSGateway::with('service_titles')->where('status', 1)->where('expire_date', '>', Carbon::now())->get();
        return response()->json(['data' => $SMSGateway, "code" => 200], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SMSGateway  $sMSGateway
     * @return \Illuminate\Http\Response
     */
    public function destroy(SMSGateway $sMSGateway)
    {
        //
    }
}
