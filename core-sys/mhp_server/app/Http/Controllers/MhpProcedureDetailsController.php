<?php

namespace App\Http\Controllers;

use App\Models\MhpProcedureDetails;
use Illuminate\Http\Request;
use Validator;


class MhpProcedureDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $procedureDetails = MhpProcedureDetails::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  Procedure Details",
            "procedureDetails" => $procedureDetails
        ]);
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
        // // return $request ->all();
        // $procedureDetails = new MhpProcedureDetails();
        // $procedureDetails->name = $request->name;
        // $procedureDetails->save();

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Procedure Details Inserted Successfully',
        //     'procedureDetails' => $procedureDetails
        // ]);
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $procedureDetails = new MhpProcedureDetails();
            $procedureDetails->name = $request->name;
            $procedureDetails->details = $request->details;
            $procedureDetails->save();

            return response()->json(['status' => 200, 'message' => 'Procedure Details Added Successfully']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpProcedureDetails  $mhpProcedureDetails
     * @return \Illuminate\Http\Response
     */
    public function show(MhpProcedureDetails $mhpProcedureDetails)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpProcedureDetails  $mhpProcedureDetails
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpProcedureDetails::find($id);

        return response()->json([
            'status' => 200,
            "procedureDetails" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpProcedureDetails  $mhpProcedureDetails
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $procedureDetails = MhpProcedureDetails::find($id);
        // $procedureDetails->name = $request->name;
        // $procedureDetails->update();

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Procedure Details Updated Successfully',
        //     'findingsName' => $procedureDetails
        // ]);
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:100',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $update_path = MhpProcedureDetails::find($id);
            $update_path->name = $request->name;
            $update_path->details = $request->details;

            $update_path->update();

            return response()->json(['status' => 200, 'message' => 'Procedure Details Updated Successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpProcedureDetails  $mhpProcedureDetails
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $procedureDetails = MhpProcedureDetails::find($id);
        $procedureDetails->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Procedure Details Deleted Successfully'
        ]);
    }
}
