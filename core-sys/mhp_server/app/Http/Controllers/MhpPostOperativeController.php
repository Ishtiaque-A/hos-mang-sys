<?php

namespace App\Http\Controllers;

use App\Models\MhpPostOperative;
use Illuminate\Http\Request;
use Validator;

class MhpPostOperativeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $postOperativeName = MhpPostOperative::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  postOperativeName",
            "postOperativeName" => $postOperativeName
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
        // $postOperativeName= new MhpPostOperative();
        // $postOperativeName->name=$request->name;
        // $postOperativeName->save();

        
        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Post Operative Name Inserted Successfully',
        //     'postOperativeName' => $postOperativeName
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
            $postOperativeName = new MhpPostOperative();
            $postOperativeName->name = $request->name;
            $postOperativeName->save();

            return response()->json(['status'=>200,'message'=>'Post Operative Name Added Successfully']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpPostOperative  $mhpPostOperative
     * @return \Illuminate\Http\Response
     */
    public function show(MhpPostOperative $mhpPostOperative)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpPostOperative  $mhpPostOperative
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpPostOperative $id)
    {
        $data = MhpPostOperative::find($id);
        
        return response()->json([
            'status' => 200,
            "postOperativeName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpPostOperative  $mhpPostOperative
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $postOperativeName = MhpPostOperative::find($id);
        // $postOperativeName->name = $request->name;
        // $postOperativeName->update();

        // return response()->json([
        //     'status' => 200,
        //     'message' => "Post Operative Name Updated Successfully",
        //     'postOperativeName' => $postOperativeName
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
            $update_path=MhpPostOperative::find($id);
            $update_path->name=$request->name;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Post Operative Name Updated Successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpPostOperative  $mhpPostOperative
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $postOperativeName = MhpPostOperative::find($id);
        $postOperativeName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Post Operative Name Deleted Successfully'
        ]);
    }
}
