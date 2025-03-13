<?php

namespace App\Http\Controllers;

use App\Models\RoundTreatmentProtocolResult;
use Illuminate\Http\Request;

class RoundTreatmentProtocolResultController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function current(Request $request)
    {
        $data = RoundTreatmentProtocolResult::where(['protocol_id' => $request->protocol_id, 'patient_id' => $request->patient_id, 'appointment_id' => $request->appointment_id])->get();
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $arr = $request->details;
        foreach ($arr as $key => $value) {
            $existing = RoundTreatmentProtocolResult::where(['protocol_cycle_id' => $value['protocol_cycle_id'], 'protocol_drug_id' => $value['protocol_drug_id'], 'appointment_id' => $request->appointment_id])->first();
            if ($existing) {
                $existing->instruction = $value['instruction'];
                $existing->trigger_dose_change = $value['trigger_dose_change'];
                $existing->dose = $value['dose'];
                // $existing->route = $value['route_id'];
                $existing->type = $value['type'];
                $existing->date = $value['date'];
                $existing->date_to = $value['date_to'];
                $existing->day = $value['day'];
                $existing->protocol_drug_id = $value['protocol_drug_id'];
                $existing->drug_name = $value['drug_name'];
                $existing->nurse = $value['nurse'];
                $existing->given_date_time = $value['given_date_time'];
                $existing->update();
            } else {
                $data = new RoundTreatmentProtocolResult();
                $data->patient_id = $request->patient_id;
                $data->doctor_id = $request->doctor_id;
                $data->appointment_id = $request->appointment_id;
                $data->protocol_id = $request->id;
                $data->protocol_cycle_id = $value['protocol_cycle_id'];
                $data->instruction = $value['instruction'];
                $data->trigger_dose_change = $value['trigger_dose_change'];
                $data->dose = $value['dose'];
                $data->route = $value['route_id'];
                $data->type = $value['type'];
                $data->date = isset($value['date']) ? $value['date'] : null;
                $data->date_to = isset($value['date_to']) ? $value['date_to'] : null;
                $data->day = isset($value['day']) ? $value['day'] : null;
                $data->protocol_drug_id = isset($value['protocol_drug_id']) ? $value['protocol_drug_id'] : null;
                $data->drug_name = $value['drug_name'];
                $data->nurse = isset($value['nurse']) ? $value['nurse'] : null;
                $data->given_date_time = isset($value['given_date_time']) ? $value['given_date_time'] : null;
                $data->save();
            }
        }
        return response()->json([
            "status" => 200,
            "message" => "Data saved successfully",
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RoundTreatmentProtocolResult  $roundTreatmentProtocolResult
     * @return \Illuminate\Http\Response
     */
    public function show(RoundTreatmentProtocolResult $roundTreatmentProtocolResult)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RoundTreatmentProtocolResult  $roundTreatmentProtocolResult
     * @return \Illuminate\Http\Response
     */
    public function edit(RoundTreatmentProtocolResult $roundTreatmentProtocolResult)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RoundTreatmentProtocolResult  $roundTreatmentProtocolResult
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RoundTreatmentProtocolResult $roundTreatmentProtocolResult)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RoundTreatmentProtocolResult  $roundTreatmentProtocolResult
     * @return \Illuminate\Http\Response
     */
    public function destroy(RoundTreatmentProtocolResult $roundTreatmentProtocolResult)
    {
        //
    }
}
