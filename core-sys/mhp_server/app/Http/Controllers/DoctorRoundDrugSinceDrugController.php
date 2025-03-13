<?php

namespace App\Http\Controllers;

use App\Models\DoctorRoundDrugSinceDrug;
use App\Models\RoundDrugSinceEntry;
use App\Models\RoundDrugSinceEntryMaster;
use Illuminate\Http\Request;

class DoctorRoundDrugSinceDrugController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DoctorRoundDrugSinceDrug::with('category')->orderBy('id', 'desc')->get();
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
        $data = new DoctorRoundDrugSinceDrug();
        $data->name = $request->name;
        $data->category_id = $request->category_id;
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
     * @param  \App\Models\DoctorRoundDrugSinceDrug  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function show(DoctorRoundDrugSinceDrug $anaemic)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DoctorRoundDrugSinceDrug  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function edit(DoctorRoundDrugSinceDrug $anaemic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DoctorRoundDrugSinceDrug  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = DoctorRoundDrugSinceDrug::find($id);
        $data->name = $request->name;
        $data->category_id = $request->category_id;
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
     * @param  \App\Models\DoctorRoundDrugSinceDrug  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = DoctorRoundDrugSinceDrug::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Data deleted successfully",
            "data" => $data
        ]);
    }
    public function saveEntries(Request $request)
    {
        $exist = RoundDrugSinceEntryMaster::where('admission_id', $request->admission_id)->first();
        if (!$exist) {
            $data = new RoundDrugSinceEntryMaster();
            $data->appointment_id = $request->appointment_id;
            $data->admission_id = $request->admission_id;
            $data->patient_id = $request->patient_id;
            $data->doctor_id = $request->doctor_id;
            $data->save();
            $arr = $request->drugs;
            foreach ($arr as $key => $value) {
                $drug = new RoundDrugSinceEntry();
                $drug->master_id = $data->id;
                $drug->drug_id = $value['drug_id'];
                if (isset($value['dose'])) {
                    $drug->dose = $value['dose'];
                }
                if (isset($value['days'])) {
                    $drug->days = $value['days'];
                }
                if (isset($value['route'])) {
                    $drug->route = $value['route'];
                }
                $drug->save();
            }
        } else {
            $arr = $request->drugs;
            foreach ($arr as $key => $value) {
                $drug_exist = RoundDrugSinceEntry::where(['master_id' => $exist->id, 'drug_id' => $value['drug_id']])->first();
                if (!$drug_exist) {
                    $drug = new RoundDrugSinceEntry();
                    $drug->master_id = $exist->id;
                    $drug->drug_id = $value['drug_id'];
                    if (isset($value['dose'])) {
                        $drug->dose = $value['dose'];
                    }
                    if (isset($value['days'])) {
                        $drug->days = $value['days'];
                    }
                    if (isset($value['route'])) {
                        $drug->route = $value['route'];
                    }

                    $drug->save();
                } else {
                    if (isset($value['dose'])) {
                        $drug_exist->dose = $value['dose'];
                    }
                    if (isset($value['days'])) {
                        $drug_exist->days = $value['days'];
                    }
                    if (isset($value['route'])) {
                        $drug_exist->route = $value['route'];
                    }

                    $drug_exist->save();
                }
            }
        }

        return response()->json([
            "status" => 200,
            "message" => "Data saved successfully"
        ]);
    }
    public function getEntries($id)
    {
        $data = RoundDrugSinceEntryMaster::with('drugs')
            ->where('admission_id', $id)
            ->first();
        return response()->json($data);
    }
}
