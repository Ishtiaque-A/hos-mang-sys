<?php

namespace App\Http\Controllers;

use App\Models\DoctorNotification;
use App\Models\PatientNotification;
use Illuminate\Http\Request;

class PatientNotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $data = new PatientNotification();
        $data->patient_hn_number = $request->patient_hn_number;
        $data->title = $request->title;
        $data->description = $request->description;
        $data->save();
        return response()->json([
            'message' => 'Notification Added Successfully',
            'data' => $data
        ]);
    }
    public function doctor_store(Request $request)
    {
        $data = new DoctorNotification();
        $data->doctor_id = $request->doctor_id;
        $data->title = $request->title;
        $data->description = $request->description;
        $data->save();
        return response()->json([
            'message' => 'Notification Added Successfully',
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PatientNotification  $patientNotification
     * @return \Illuminate\Http\Response
     */
    public function show($hn)
    {
        $data = PatientNotification::where('patient_hn_number', $hn)->get();
        return response()->json([
            'data' => $data
        ]);
    }
    public function doctor_show($id)
    {
        $data = DoctorNotification::where('doctor_id', $id)->get();
        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PatientNotification  $patientNotification
     * @return \Illuminate\Http\Response
     */
    public function edit(PatientNotification $patientNotification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PatientNotification  $patientNotification
     * @return \Illuminate\Http\Response
     */
    public function update($hn)
    {
        $data = PatientNotification::where('patient_hn_number', $hn)->get();
        foreach ($data as $key => $value) {
            $value->status = 1;
            $value->save();
        }
        return response()->json([
            'data' => $data
        ]);
    }
    public function doctor_update($id)
    {
        $data = DoctorNotification::where('doctor_id', $id)->get();
        foreach ($data as $key => $value) {
            $value->status = 1;
            $value->save();
        }
        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PatientNotification  $patientNotification
     * @return \Illuminate\Http\Response
     */
    public function destroy(PatientNotification $patientNotification)
    {
        //
    }
}
