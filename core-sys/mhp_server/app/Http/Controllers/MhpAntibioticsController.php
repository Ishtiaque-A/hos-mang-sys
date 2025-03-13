<?php

namespace App\Http\Controllers;

use App\Models\MhpAntibiotics;
use Illuminate\Http\Request;
use Validator;

class MhpAntibioticsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $antibioticsName = MhpAntibiotics::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  antibioticsName",
            "antibioticsName" => $antibioticsName
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
        // $antibioticsName= new MhpAntibiotics();
        // $antibioticsName->name=$request->name;
        // $antibioticsName->save();

        
        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Antibiotics Name Inserted Successfully',
        //     'antibioticsName' => $antibioticsName
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
            $antibioticsName = new MhpAntibiotics();
            $antibioticsName->name = $request->name;
            $antibioticsName->save();

            return response()->json(['status'=>200,'message'=>'Antibiotics Added Successfully']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpAntibiotics  $mhpAntibiotics
     * @return \Illuminate\Http\Response
     */
    public function show(MhpAntibiotics $mhpAntibiotics)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpAntibiotics  $mhpAntibiotics
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpAntibiotics::find($id);
        
        return response()->json([
            'status' => 200,
            "antibioticsName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpAntibiotics  $mhpAntibiotics
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $antibioticsName = MhpAntibiotics::find($id);
        // $antibioticsName->name = $request->name;
        // $antibioticsName->update();

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Antibiotics Name Updated Successfully',
        //     'drainName' => $antibioticsName
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
            $update_path=MhpAntibiotics::find($id);
            $update_path->name=$request->name;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Antibiotics Updated Successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpAntibiotics  $mhpAntibiotics
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $antibioticsName = MhpAntibiotics::find($id);
        $antibioticsName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Antibiotics Name Deleted Successfully'
        ]);
    }
}
