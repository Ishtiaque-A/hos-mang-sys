<?php

namespace App\Http\Controllers;

use App\Models\AssignedTaskForNurse;
use Illuminate\Http\Request;

class AssignedTaskForNurseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $data = AssignedTaskForNurse::where(['admission_id' => $id, 'status' => 1])->get();
        $all = AssignedTaskForNurse::where(['admission_id' => $id])->orderBy('id', 'desc')->get();
        return response()->json([
            'data' => $data,
            'all' => $all
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
        $arr = $request->tasks;
        foreach ($arr as $key => $task) {
            $data = new AssignedTaskForNurse();
            $data->task_id = $task['id'];
            $data->name = $task['name'];
            $data->admission_id = $request->admission_id;
            $data->patient_id = $request->patient_id;
            $data->save();
        }
        return response()->json([
            "status" => 200,
            "message" => "Tasks saved successfully "
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AssignedTaskForNurse  $assignedTaskForDoctor
     * @return \Illuminate\Http\Response
     */
    public function show(AssignedTaskForNurse $assignedTaskForDoctor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AssignedTaskForNurse  $assignedTaskForDoctor
     * @return \Illuminate\Http\Response
     */
    public function edit(AssignedTaskForNurse $assignedTaskForDoctor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AssignedTaskForNurse  $assignedTaskForDoctor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = AssignedTaskForNurse::find($id);
        $data->status = $request->status;
        $data->save();
        return response()->json([
            "status" => 200,
            "message" => "Data updated Successfully "
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AssignedTaskForNurse  $assignedTaskForDoctor
     * @return \Illuminate\Http\Response
     */
    public function destroy(AssignedTaskForNurse $assignedTaskForDoctor)
    {
        //
    }
}
