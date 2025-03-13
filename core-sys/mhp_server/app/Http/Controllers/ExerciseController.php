<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Exercise::orderBy('id', 'desc')->get();
        return $data;
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
        $request->validate([
            'title' => 'required'
        ]);
        $data = new Exercise();
        $data->title = $request->title;
        $data->description = $request->description;
        $data->save();
        return response(['message' => 'Exercise created successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Exercise  $data
     * @return \Illuminate\Http\Response
     */
    public function show(Exercise $data)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Exercise  $data
     * @return \Illuminate\Http\Response
     */
    public function edit(Exercise $data)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Exercise  $data
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required'
        ]);
        $data = Exercise::find($id);
        $data->title = $request->title;
        $data->description = $request->description;
        $data->save();
        return response(['message' => 'Exercise updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Exercise  $data
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Exercise::find($id);
        $data->delete();
        return response(['message' => 'Exercise deleted successfully'], 200);
    }
}
