<?php

namespace App\Http\Controllers;

use App\Models\MhpPathology;
use Illuminate\Http\Request;
use Validator;

class MhpPathologyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pathologyName = MhpPathology::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  pathologyName",
            "pathologyName" => $pathologyName
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
        // $pathologyName= new MhpPathology();
        // $pathologyName->name=$request->name;
        // $pathologyName->save();

        
        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Pathology Name Inserted Successfully',
        //     'pathologyName' => $pathologyName
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
            $pathalogy_test = new MhpPathology();
            $pathalogy_test->name = $request->name;
            $pathalogy_test->save();

            return response()->json(['status'=>200,'message'=>'Pathology Added Successfully']);
        }
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpPathology  $mhpPathology
     * @return \Illuminate\Http\Response
     */
    public function show(MhpPathology $mhpPathology)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpPathology  $mhpPathology
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpPathology::find($id);
        
        return response()->json([
            'status' => 200,
            "pathologyName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpPathology  $mhpPathology
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        // $pathologyName = MhpPathology::find($id);
        // $pathologyName->name = $request->name;
        // $pathologyName->update();

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Pathology Name Updated Successfully',
        //     'pathologyName' => $pathologyName
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
            $update_path=MhpPathology::find($id);
            $update_path->name=$request->name;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Pathology Updated Successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpPathology  $mhpPathology
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $pathologyName = MhpPathology::find($id);
        $pathologyName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Pathology Name Deleted Successfully'
        ]);
    }
}
