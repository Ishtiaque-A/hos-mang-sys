<?php

namespace App\Http\Controllers;

use App\Models\MhpBreast;
use Illuminate\Http\Request;

class MhpBreastController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $breastName = MhpBreast::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  breastName",
            "breastName" => $breastName
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
        $breastName = new MhpBreast();
        $breastName->name = $request->name;
        $breastName->save();

        return response()->json([
            'status' => 200,
            'message' => 'Breast Name Inserted Successfully',
            'obstetricsName' => $breastName
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpBreast  $mhpBreast
     * @return \Illuminate\Http\Response
     */
    public function show(MhpBreast $mhpBreast)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpBreast  $mhpBreast
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpBreast::find($id);
        
        return response()->json([
            'status' => 200,
            "breastName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpBreast  $mhpBreast
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $breastName = MhpBreast::find($id);
        $breastName->name = $request->name;
        $breastName->update();

        return response()->json([
            'status' => 200,
            'message' => 'Breast Name Updated Successfully',
            'obstetricsName' => $breastName
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpBreast  $mhpBreast
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $breastName = MhpBreast::find($id);
        $breastName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Breast Name Deleted Successfully'
        ]);
    }
}
