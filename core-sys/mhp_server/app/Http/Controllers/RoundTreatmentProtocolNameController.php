<?php

namespace App\Http\Controllers;

use App\Models\RoundProtocolCycleDetails;
use App\Models\RoundTreatmentProtocolCycle;
use App\Models\RoundTreatmentProtocolName;
use Illuminate\Http\Request;

class RoundTreatmentProtocolNameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = RoundTreatmentProtocolName::orderBy('id', 'desc')->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function details($id)
    // {
    //     $data = RoundTreatmentProtocolName::with('cycles')
    //         ->where('id', $id)->first();
    //     return response()->json($data);
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = new RoundTreatmentProtocolName();
        $data->name = $request->name;
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
     * @param  \App\Models\RoundTreatmentProtocolName  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = RoundTreatmentProtocolCycle::with('drugs')
            ->where('protocol_id', $id)->get();
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RoundTreatmentProtocolName  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function edit(RoundTreatmentProtocolName $anaemic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RoundTreatmentProtocolName  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = RoundTreatmentProtocolName::find($id);
        $data->name = $request->name;
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
     * @param  \App\Models\RoundTreatmentProtocolName  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = RoundTreatmentProtocolName::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Data deleted successfully",
            "data" => $data
        ]);
    }
    public function saveDetails(Request $request)
    {
        $arr = $request->details;
        foreach ($arr as $key => $value) {
            foreach ($value['drugs'] as $k => $v) {
                if (isset($v['id'])) {
                    $existing = RoundProtocolCycleDetails::find($v['id']);
                    if ($existing) {
                        $existing->day = $v['day'];
                        $existing->day_to = $v['day_to'];
                        $existing->route_id = $v['route_id'];
                        $existing->dose = $v['dose'];
                        $existing->trigger_dose_change = $v['trigger_dose_change'];
                        $existing->instruction = $v['instruction'];
                        $existing->save();
                    }
                } else {
                    $data = new RoundProtocolCycleDetails();
                    $data->protocol_cycle_id = $value['id'];
                    $data->protocol_id = $value['protocol_id'];
                    $data->drug_name = $v['drug_name'];
                    $data->drug_id = $v['newid'];
                    $data->day = $v['day'];
                    $data->day = $v['day_to'];
                    $data->route_id = $v['route_id'];
                    $data->dose = $v['dose'];
                    $data->trigger_dose_change = $v['trigger_dose_change'];
                    $data->instruction = $v['instruction'];
                    $data->type = $v['type'];
                    $data->save();
                }
            }
        }
        $protocol = RoundTreatmentProtocolName::find($request->id);
        $protocol->cycle = $request->cycle;
        $protocol->frequency = $request->frequency;
        $protocol->save();
        return response()->json([
            "status" => 200,
            "message" => "Data saved successfully",
        ]);
    }
    public function deleteDetails($id)
    {
        $data = RoundProtocolCycleDetails::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Data deleted successfully",
        ]);
    }
}
