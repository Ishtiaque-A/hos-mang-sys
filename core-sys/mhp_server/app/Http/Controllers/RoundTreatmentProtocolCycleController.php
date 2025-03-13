<?php

namespace App\Http\Controllers;

use App\Models\RoundTreatmentProtocolCycle;
use Illuminate\Http\Request;

class RoundTreatmentProtocolCycleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = RoundTreatmentProtocolCycle::with('protocol')->get();
        return response()->json($data);
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
        $data = new RoundTreatmentProtocolCycle();
        $data->name = $request->name;
        $data->protocol_id = $request->protocol_id;
        $data->save();
        return response()->json([
            "status" => 200,
            "message" => "Data saved successfully",
            "data" => $data
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RoundTreatmentProtocolCycle  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function show(RoundTreatmentProtocolCycle $anaemic)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RoundTreatmentProtocolCycle  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function edit(RoundTreatmentProtocolCycle $anaemic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RoundTreatmentProtocolCycle  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = RoundTreatmentProtocolCycle::find($id);
        $data->name = $request->name;
        $data->protocol_id = $request->protocol_id;
        $data->update();
        return response()->json([
            "status" => 200,
            "message" => "Data updated successfully",
            "data" => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RoundTreatmentProtocolCycle  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = RoundTreatmentProtocolCycle::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Data deleted successfully",
            "data" => $data
        ]);
    }
}
