<?php

namespace App\Http\Controllers;

use App\Models\MhpFollowup;
use Illuminate\Http\Request;
use Validator;

class MhpFollowupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $followupName = MhpFollowup::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  followupName",
            "followupName" => $followupName
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
        // $followupName= new MhpFollowup();
        // $followupName->name=$request->name;
        // $followupName->save();

        
        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Followup Name Inserted Successfully',
        //     'followupName' => $followupName
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
            $followupName = new MhpFollowup();
            $followupName->name = $request->name;
            $followupName->save();

            return response()->json(['status'=>200,'message'=>'Follow up Name Added Successfully']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpFollowup  $mhpFollowup
     * @return \Illuminate\Http\Response
     */
    public function show(MhpFollowup $mhpFollowup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpFollowup  $mhpFollowup
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpFollowup::find($id);
        
        return response()->json([
            'status' => 200,
            "followupName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpFollowup  $mhpFollowup
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        // $followupName = MhpFollowup::find($id);
        // $followupName->name = $request->name;
        // $followupName->update();

        // return response()->json([
        //     'status' => 200,
        //     'message' => "Followup Name Updated Successfully",
        //     'followupName' => $followupName
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
            $update_path=MhpFollowup::find($id);
            $update_path->name=$request->name;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Follow up Name Updated Successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpFollowup  $mhpFollowup
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $followupName = MhpFollowup::find($id);
        $followupName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Followup Name Deleted Successfully'
        ]);
    }
}
