<?php

namespace App\Http\Controllers;

use App\Models\MhpFindings;
use Illuminate\Http\Request;
use Validator;

class MhpFindingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $findingsName = MhpFindings::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  Findings",
            "findingsName" => $findingsName
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
        // $findingsName = new MhpFindings();
        // $findingsName->name = $request->name;
        // $findingsName->save();

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Findings Name Inserted Successfully',
        //     'findingsName' => $findingsName
        // ]);
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
            $findingsName = new MhpFindings();
            $findingsName->name = $request->name;
            $findingsName->save();

            return response()->json(['status'=>200,'message'=>'Findings Name Added Successfully']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpFindings  $mhpFindings
     * @return \Illuminate\Http\Response
     */
    public function show(MhpFindings $mhpFindings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpFindings  $mhpFindings
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpFindings::find($id);
        
        return response()->json([
            'status' => 200,
            "findingsName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpFindings  $mhpFindings
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $findingsName = MhpFindings::find($id);
        // $findingsName->name = $request->name;
        // $findingsName->update();

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Finding Name Updated Successfully',
        //     'findingsName' => $findingsName
        // ]);
        
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
            $update_path=MhpFindings::find($id);
            $update_path->name=$request->name;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Findings Updated Successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpFindings  $mhpFindings
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $indicationName = MhpFindings::find($id);
        $indicationName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Findings Name Deleted Successfully'
        ]);
    }
}
