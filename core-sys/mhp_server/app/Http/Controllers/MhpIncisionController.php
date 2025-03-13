<?php

namespace App\Http\Controllers;

use App\Models\MhpIncision;
use Illuminate\Http\Request;
use Validator;

class MhpIncisionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $incisionName = MhpIncision::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  incisionName",
            "incisionName" => $incisionName
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
            $incisionName = new MhpIncision();
            $incisionName->name = $request->name;
            $incisionName->save();

            return response()->json(['status'=>200,'message'=>'Incision Added Successfully']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpIncision  $mhpIncision
     * @return \Illuminate\Http\Response
     */
    public function show(MhpIncision $mhpIncision)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpIncision  $mhpIncision
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpIncision::find($id);
        
        return response()->json([
            'status' => 200,
            "incisionName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpIncision  $mhpIncision
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
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
            $update_path=MhpIncision::find($id);
            $update_path->name=$request->name;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Incision Updated Successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpIncision  $mhpIncision
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $incisionName = MhpIncision::find($id);
        $incisionName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Incision Deleted Successfully'
        ]);
    }
}
