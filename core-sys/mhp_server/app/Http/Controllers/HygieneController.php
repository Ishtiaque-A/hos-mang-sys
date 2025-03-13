<?php

namespace App\Http\Controllers;

use App\Models\Hygiene;
use Illuminate\Http\Request;

class HygieneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Hygiene::orderBy('id', 'desc')->get();
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
        $data = new Hygiene();
        $data->title = $request->title;
        $data->description = $request->description;
        $data->save();
        return response(['message' => 'Hygiene created successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Hygiene  $data
     * @return \Illuminate\Http\Response
     */
    public function show(Hygiene $data)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Hygiene  $data
     * @return \Illuminate\Http\Response
     */
    public function edit(Hygiene $data)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Hygiene  $data
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required'
        ]);
        $data = Hygiene::find($id);
        $data->title = $request->title;
        $data->description = $request->description;
        $data->save();
        return response(['message' => 'Hygiene updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Hygiene  $data
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Hygiene::find($id);
        $data->delete();
        return response(['message' => 'Hygiene deleted successfully'], 200);
    }
}
