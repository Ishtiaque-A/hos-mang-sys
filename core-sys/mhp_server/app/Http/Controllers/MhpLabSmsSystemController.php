<?php

namespace App\Http\Controllers;

use App\Models\MhpLabBillSms;
use App\Models\MhpLabReportReadySms;
use App\Models\MhpLabSmsSystem;
use Illuminate\Http\Request;

class MhpLabSmsSystemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MhpLabSmsSystem::orderBy('id','desc')->first();
        return response()->json([
            'status' => 200,
            'message' => 'Welcome sms',
            'sms' => $data
        ]);
    }
    public function bill_sms()
    {
        $data = MhpLabBillSms::orderBy('id','desc')->first();
        return response()->json([
            'status' => 200,
            'message' => 'Welcome sms',
            'sms' => $data
        ]);
    }
    public function report_sms()
    {
        $data = MhpLabReportReadySms::orderBy('id','desc')->first();
        return response()->json([
            'status' => 200,
            'message' => 'Welcome sms',
            'sms' => $data
        ]);
    }
    public function edit_welcome_sms($id)
    {
        $data = MhpLabSmsSystem::find($id);
        return response()->json([
            'status' => 200,
            'message' => 'Welcome sms',
            'sms' => $data
        ]);
    }
    public function eidt_bill_sms($id)
    {
        $data = MhpLabBillSms::find($id);
        return response()->json([
            'status' => 200,
            'message' => 'Welcome sms',
            'sms' => $data
        ]);
    }
    public function eidt_report_sms($id)
    {
        $data = MhpLabReportReadySms::find($id);
        return response()->json([
            'status' => 200,
            'message' => 'Welcome sms',
            'sms' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add_welcome_sms(Request $request)
    {
        $data = new MhpLabSmsSystem();
        $data -> sms_value = $request -> sms_value;
        $data -> sms_status = $request -> sms_status;
        $data->save();
        return response()->json([
            'status' => 200,
            'message' => 'Sms updated successfully',
            'sms' => $data
        ]);
    }
    public function add_bill_sms(Request $request)
    {
        $data = new MhpLabBillSms();
        $data -> sms_value = $request -> sms_value;
        $data -> sms_status = $request -> sms_status;
        $data->save();
        return response()->json([
            'status' => 200,
            'message' => 'Sms updated successfully',
            'sms' => $data
        ]);
    }
    public function add_report_sms(Request $request)
    {
        $data = new MhpLabReportReadySms();
        $data -> sms_value = $request -> sms_value;
        $data -> sms_status = $request -> sms_status;
        $data->save();
        return response()->json([
            'status' => 200,
            'message' => 'Sms updated successfully',
            'sms' => $data
        ]);
    }
    public function update_welcome_sms(Request $request, $id)
    {
        $data = MhpLabSmsSystem::find($id);
        $data -> sms_value = $request -> sms_value;
        $data -> sms_status = $request -> sms_status;
        $data->update();
        return response()->json([
            'status' => 200,
            'message' => 'Sms updated successfully',
            'sms' => $data
        ]);
    }
    public function update_bill_sms(Request $request, $id)
    {
        $data = MhpLabBillSms::find($id);
        $data -> sms_value = $request -> sms_value;
        $data -> sms_status = $request -> sms_status;
        $data->update();
        return response()->json([
            'status' => 200,
            'message' => 'Sms updated successfully',
            'sms' => $data
        ]);
    }
    public function update_report_sms(Request $request, $id)
    {
        $data = MhpLabReportReadySms::find($id);
        $data -> sms_value = $request -> sms_value;
        $data -> sms_status = $request -> sms_status;
        $data->update();
        return response()->json([
            'status' => 200,
            'message' => 'Sms updated successfully',
            'sms' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpLabSmsSystem  $mhpLabSmsSystem
     * @return \Illuminate\Http\Response
     */
    public function show(MhpLabSmsSystem $mhpLabSmsSystem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpLabSmsSystem  $mhpLabSmsSystem
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpLabSmsSystem $mhpLabSmsSystem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpLabSmsSystem  $mhpLabSmsSystem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpLabSmsSystem $mhpLabSmsSystem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpLabSmsSystem  $mhpLabSmsSystem
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpLabSmsSystem $mhpLabSmsSystem)
    {
        //
    }
}
