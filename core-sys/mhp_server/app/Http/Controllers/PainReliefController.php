<?php

namespace App\Http\Controllers;

use App\Models\PainRelief;
use Illuminate\Http\Request;

class PainReliefController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = PainRelief::orderBy('id', 'desc')->get();
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
        $data = new PainRelief();
        $data->title = $request->title;
        $data->description = $request->description;
        $data->save();
        return response(['message' => 'PainRelief created successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PainRelief  $data
     * @return \Illuminate\Http\Response
     */
    public function show(PainRelief $data)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PainRelief  $data
     * @return \Illuminate\Http\Response
     */
    public function edit(PainRelief $data)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PainRelief  $data
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required'
        ]);
        $data = PainRelief::find($id);
        $data->title = $request->title;
        $data->description = $request->description;
        $data->save();
        return response(['message' => 'PainRelief updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PainRelief  $data
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = PainRelief::find($id);
        $data->delete();
        return response(['message' => 'PainRelief deleted successfully'], 200);
    }
}
