<?php

namespace App\Http\Controllers;

use App\Models\DoctorTaskCategory;
use Illuminate\Http\Request;

class DoctorTaskCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DoctorTaskCategory::orderBy('id', 'desc')->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function taskList()
    {
        $data = DoctorTaskCategory::with('tasks')->orderBy('id', 'desc')->get();
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = new DoctorTaskCategory();
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
     * @param  \App\Models\DoctorTaskCategory  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function show(DoctorTaskCategory $anaemic)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DoctorTaskCategory  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function edit(DoctorTaskCategory $anaemic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DoctorTaskCategory  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = DoctorTaskCategory::find($id);
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
     * @param  \App\Models\DoctorTaskCategory  $anaemic
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = DoctorTaskCategory::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Data deleted successfully",
            "data" => $data
        ]);
    }
}
