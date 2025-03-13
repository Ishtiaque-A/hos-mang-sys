<?php

namespace App\Http\Controllers;

use App\Models\mhpgynecologies;
use Illuminate\Http\Request;

class MhpgynecologiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $gynecologiesName = mhpgynecologies::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  gynecologies",
            "gynecologiesName" => $gynecologiesName
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
        // return $request ->all();
        $gynecologiesName = new mhpgynecologies();
        $gynecologiesName->name = $request->name;
        $gynecologiesName->save();

        return response()->json([
            'status' => 200,
            'message' => 'Gynecologies Name Inserted Successfully',
            'gynecologiesName' => $gynecologiesName
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\mhpgynecologies  $mhpgynecologies
     * @return \Illuminate\Http\Response
     */
    public function show(mhpgynecologies $mhpgynecologies)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\mhpgynecologies  $mhpgynecologies
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = mhpgynecologies::find($id);
        
        return response()->json([
            'status' => 200,
            "gynecologiesName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\mhpgynecologies  $mhpgynecologies
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $gynecologiesName = mhpgynecologies::find($id);
        $gynecologiesName->name = $request->name;
        $gynecologiesName->update();

        return response()->json([
            'status' => 200,
            'message' => 'Gynecologies Name Updated Successfully',
            'gynecologiesName' => $gynecologiesName
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\mhpgynecologies  $mhpgynecologies
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $gynecologiesName = mhpgynecologies::find($id);
        $gynecologiesName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Gynecologies Name Deleted Successfully'
        ]);
    }
}
