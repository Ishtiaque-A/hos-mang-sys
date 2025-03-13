<?php

namespace App\Http\Controllers;

use App\Models\MhpAnalgesia;
use Illuminate\Http\Request;
use Validator;

class MhpAnalgesiaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $analgesiaName = MhpAnalgesia::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  dietName",
            "analgesiaName" => $analgesiaName
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
        // $analgesiaName= new MhpAnalgesia();
        // $analgesiaName->name=$request->name;
        // $analgesiaName->save();

        
        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Analgesia Name Inserted Successfully',
        //     'dietName' => $analgesiaName
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
            $analgesiaName = new MhpAnalgesia();
            $analgesiaName->name = $request->name;
            $analgesiaName->save();

            return response()->json(['status'=>200,'message'=>'Analgesia Added Successfully']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpAnalgesia  $mhpAnalgesia
     * @return \Illuminate\Http\Response
     */
    public function show(MhpAnalgesia $mhpAnalgesia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpAnalgesia  $mhpAnalgesia
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpAnalgesia::find($id);
        
        return response()->json([
            'status' => 200,
            "analgesiaName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpAnalgesia  $mhpAnalgesia
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $analgesiaName = MhpAnalgesia::find($id);
        // $analgesiaName->name = $request->name;
        // $analgesiaName->update();

        // return response()->json([
        //     'status' => 200,
        //     'message' => "Analgesia Name Updated Successfully",
        //     'dietName' => $analgesiaName
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
            $update_path=MhpAnalgesia::find($id);
            $update_path->name=$request->name;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Analgesia Updated Successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpAnalgesia  $mhpAnalgesia
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $analgesiaName = MhpAnalgesia::find($id);
        $analgesiaName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Analgesia Name Deleted Successfully'
        ]);
    }
}
