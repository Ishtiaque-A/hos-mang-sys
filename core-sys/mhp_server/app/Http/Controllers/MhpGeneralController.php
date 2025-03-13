<?php

namespace App\Http\Controllers;

use App\Models\MhpGeneral;
use App\Models\MhpGeneralHistory;
use Illuminate\Http\Request;

class MhpGeneralController extends Controller
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
        // return $request->all();
        $general = new MhpGeneral();
        $general->patient_id = $request->patient_id;
        $general->appointment_id = $request->appointment_id;

        $general->history = $request->history;
        $general->pulse = $request->pulse;
        $general->respiratoryRate = $request->respiratoryRate;
        $general->o2saturation = $request->o2saturation;

        $general->bloodSuger = $request->bloodSuger;
        $general->bloodSugerType = $request->bloodSugerType;


        $general->sitting_left = $request->sitting_left;
        $general->sitting_right = $request->sitting_right;

        $general->standing_left = $request->standing_left;
        $general->standing_right = $request->standing_right;
        $general->lying_left = $request->lying_left;
        $general->lying_right = $request->lying_right;

        $general->weight = $request->weight;
        $general->height = $request->height;
        $general->BMI = $request->BMI;
        $general->waist_measurement = $request->waist_measurement;
        $general->hip_measurement = $request->hip_measurement;
        $general->WHR = $request->WHR;
        $general->temp = $request->temp;

        $general->Anaemic = $request->Anaemic;
        $general->Jaundiced = $request->Jaundiced;
        $general->Cyanosis = $request->Cyanosis;
        $general->Skin = $request->Skin;
        $general->capillary = $request->capillary;
        $general->dehydration = $request->dehydration;
        $general->radioFD = $request->radioFD;
        $general->nailSign = $request->nailSign;
        $general->save();

        return response()->json([
            'status' => 200,
            'message' => 'General data Inserted Successfully',
            'general' => $general
        ]);
    }

    public function general_data($id)
    {
        // $Others = $request->all();

        $history = MhpGeneral::where('patient_id', $id)
            ->orderBy('created_at', 'DESC')->first();

        return response()->json([
            'status' => 200,
            'message' => 'Data get Successfully',
            'history' => $history
        ]);
    }


    public function general_history_data($id)
    {
        // $Others = $request->all();

        $history = MhpGeneralHistory::where('general_id', $id)
            ->orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'message' => 'Data get Successfully',
            'history' => $history
        ]);
    }

    public function save_general_history(Request $request)
    {
        // $Others = $request->all();

        $history = new MhpGeneralHistory();
        $history->patient_id = $request->patient_id;
        $history->general_id = $request->general_id;
        $history->history_id = $request->history_id;
        $history->value = $request->value;
        $history->save();

        return response()->json([
            'status' => 200,
            'message' => 'history Inserted Successfully',
            'history' => $history
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpGeneral  $mhpGeneral
     * @return \Illuminate\Http\Response
     */
    public function show(MhpGeneral $mhpGeneral)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpGeneral  $mhpGeneral
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpGeneral $mhpGeneral)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpGeneral  $mhpGeneral
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpGeneral $mhpGeneral)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpGeneral  $mhpGeneral
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpGeneral $mhpGeneral)
    {
        //
    }
}
