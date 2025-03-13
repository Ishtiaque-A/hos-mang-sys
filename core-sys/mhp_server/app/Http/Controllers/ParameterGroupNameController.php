<?php

namespace App\Http\Controllers;

use App\Models\ParameterGroupName;
use Illuminate\Http\Request;

class ParameterGroupNameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = ParameterGroupName::with("test_name")->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)

    {
        $data = new ParameterGroupName();
        $data->group_name = $request->group_name;
        $data->test_name_id = $request->test_name_id;
        $data->hidden = $request->hidden;
        $data->save();
        return response()->json(["message" => "Data Added Successfully"], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ParameterGroupName  $parameterGroupName
     * @return \Illuminate\Http\Response
     */
    public function show(ParameterGroupName $parameterGroupName)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ParameterGroupName  $parameterGroupName
     * @return \Illuminate\Http\Response
     */
    public function edit(ParameterGroupName $parameterGroupName)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ParameterGroupName  $parameterGroupName
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = ParameterGroupName::find($id);
        $data->group_name = $request->group_name;
        $data->test_name_id = $request->test_name_id;
        $data->hidden = $request->hidden;
        $data->save();
        return response()->json(["message" => "Data Updated Successfully"], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ParameterGroupName  $parameterGroupName
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = ParameterGroupName::find($id);
        $data->delete();
        return response()->json($data, 200);
    }
    public function findByTestNameId($id)
    {
        $data = ParameterGroupName::with('parameter')->where("test_name_id", $id)->get();
        return response()->json($data, 200);
    }
}
