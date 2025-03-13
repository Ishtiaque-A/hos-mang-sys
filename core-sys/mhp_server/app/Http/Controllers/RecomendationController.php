<?php

namespace App\Http\Controllers;

use App\Models\Recomendation;
use Illuminate\Http\Request;

class RecomendationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Recomendation::orderBy('id', 'desc')->get();
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
        $data = new Recomendation();
        $data->title = $request->title;
        $data->description = $request->description;
        $data->save();
        return response(['message' => 'Recomendation created successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Recomendation  $data
     * @return \Illuminate\Http\Response
     */
    public function show(Recomendation $data)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Recomendation  $data
     * @return \Illuminate\Http\Response
     */
    public function edit(Recomendation $data)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Recomendation  $data
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required'
        ]);
        $data = Recomendation::find($id);
        $data->title = $request->title;
        $data->description = $request->description;
        $data->save();
        return response(['message' => 'Recomendation updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Recomendation  $data
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Recomendation::find($id);
        $data->delete();
        return response(['message' => 'Recomendation deleted successfully'], 200);
    }
}
