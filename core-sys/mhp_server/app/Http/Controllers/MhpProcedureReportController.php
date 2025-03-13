<?php

namespace App\Http\Controllers;

use App\Models\MhpProcedureReport;
use Illuminate\Http\Request;
use Validator;

class MhpProcedureReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $procedureName = MhpProcedureReport::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All procedureName",
            "procedureName" => $procedureName
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
   
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
        ]);
           
        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $procedureName = new MhpProcedureReport();
            $procedureName->name = $request->name;
            $procedureName->save();

            return response()->json(['status'=>200,'message'=>'Procedure Name Added Successfully']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpProcedureReport  $mhpProcedureReport
     * @return \Illuminate\Http\Response
     */
    public function show(MhpProcedureReport $mhpProcedureReport)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpProcedureReport  $mhpProcedureReport
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpProcedureReport::find($id);

        return response()->json([
            'status' => 200,
            "procedureName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpProcedureReport  $mhpProcedureReport
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    
        
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_path=MhpProcedureReport::find($id);
            $update_path->name=$request->name;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Procedure Updated Successfully']);
        }
     
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpProcedureReport  $mhpProcedureReport
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $procedureName = MhpProcedureReport::find($id);
        $procedureName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Procedure Name Deleted Successfully'
        ]);
    }
}
