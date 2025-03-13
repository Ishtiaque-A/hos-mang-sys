<?php

namespace App\Http\Controllers;

use App\Models\MhpIschaemicRiskFactor;
use Illuminate\Http\Request;

class MhpIschaemicRiskFactorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MhpIschaemicRiskFactor::orderBy("id", "desc")->get();

        return response()->json([
            "status" => 200,
            "message" => "All Risk Factors",
            "riskFactor" => $data
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
        $data = new MhpIschaemicRiskFactor();
        $data->name = $request->input('name');
        $data->save();


        return response()->json([
            "status" => 200,
            "message" => "Ischaemic Risk Factor Added Successfully"
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpIschaemicRiskFactor  $mhpIschaemicRiskFactor
     * @return \Illuminate\Http\Response
     */
    public function show(MhpIschaemicRiskFactor $mhpIschaemicRiskFactor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpIschaemicRiskFactor  $mhpIschaemicRiskFactor
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpIschaemicRiskFactor::find($id);

        return response()->json([
            "status" => 200,
            "riskFactor" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpIschaemicRiskFactor  $mhpIschaemicRiskFactor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = MhpIschaemicRiskFactor::find($id);
        $data->name = $request->input("name");
        $data->update();

        return response()->json([
            "status" => 200,
            "message" => "Risk Factor Updated Successfully"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpIschaemicRiskFactor  $mhpIschaemicRiskFactor
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = MhpIschaemicRiskFactor::find($id);
        $data->delete();

        return response()->json([
            "status" => 200,
            "message" => "Risk Factor Deleted Successfully"
        ]);
    }
}
