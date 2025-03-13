<?php

namespace App\Http\Controllers;

use App\Models\MhpObservation;
use Illuminate\Http\Request;
use Validator;

class MhpObservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $observationName = MhpObservation::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  observationName",
            "observationName" => $observationName
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
        // $observationName= new MhpObservation();
        // $observationName->name=$request->name;
        // $observationName->save();

        
        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Observation Name Inserted Successfully',
        //     'observationName' => $observationName
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
            $observationName = new MhpObservation();
            $observationName->name = $request->name;
            $observationName->save();

            return response()->json(['status'=>200,'message'=>'Observation Added Successfully']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpObservation  $mhpObservation
     * @return \Illuminate\Http\Response
     */
    public function show(MhpObservation $mhpObservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpObservation  $mhpObservation
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpObservation::find($id);
        
        return response()->json([
            'status' => 200,
            "observationName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpObservation  $mhpObservation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $observationName = MhpObservation::find($id);
        // $observationName->name = $request->name;
        // $observationName->update();

        // return response()->json([
        //     'status' => 200,
        //     'message' => "Observation Name Updated Successfully",
        //     'observationName' => $observationName
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
            $update_path=MhpObservation::find($id);
            $update_path->name=$request->name;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Observation Updated Successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpObservation  $mhpObservation
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $observationName = MhpObservation::find($id);
        $observationName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Observation Name Deleted Successfully'
        ]);
    }
}
