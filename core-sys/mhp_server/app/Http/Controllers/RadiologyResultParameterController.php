<?php

namespace App\Http\Controllers;

use App\Models\RadiologyResultParameter;
use Illuminate\Http\Request;

class RadiologyResultParameterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = RadiologyResultParameter::orderBy('id', 'desc')->get();
        return response()->json($data);
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
        $data = new RadiologyResultParameter();
        $data->name = $request->name;
        $data->save();
        return response()->json([
            "status" => 200,
            "message" => "Data saved successfully",
            "data" => $data
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RadiologyResultParameter  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function show(RadiologyResultParameter $anaemic)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RadiologyResultParameter  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function edit(RadiologyResultParameter $anaemic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RadiologyResultParameter  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = RadiologyResultParameter::find($id);
        $data->name = $request->name;
        $data->update();
        return response()->json([
            "status" => 200,
            "message" => "Data updated successfully",
            "data" => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RadiologyResultParameter  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = RadiologyResultParameter::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Data deleted successfully",
            "data" => $data
        ]);
    }
}
