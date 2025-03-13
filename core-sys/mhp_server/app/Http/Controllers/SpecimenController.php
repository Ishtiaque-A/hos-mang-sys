<?php

namespace App\Http\Controllers;

use App\Models\Specimen;
use Illuminate\Http\Request;

class SpecimenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Specimen = Specimen::all();
        return response()->json($Specimen, 200);
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
        $name = $request->name;
        $Specimen = new Specimen();
        $Specimen->name = $name;
        $Specimen->save();
        return response()->json([
            'message' => "Specimen created successfully"
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Specimen  $specimen
     * @return \Illuminate\Http\Response
     */
    public function show(Specimen $specimen)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Specimen  $specimen
     * @return \Illuminate\Http\Response
     */
    public function edit(Request  $request, $id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Specimen  $specimen
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $specimen = Specimen::find($id);
        $specimen->name = $request->name;
        $specimen->update();
        return response()->json([
            'data' => $specimen,
            'message' => "Specimen updated successfully"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Specimen  $specimen
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $specimen = Specimen::find($id);
        $specimen->delete();
        return response()->json([
            'message' => "Specimen deleted successfully"
        ], 200);
    }
}
