<?php

namespace App\Http\Controllers;

use App\Models\Investigation;
use Illuminate\Http\Request;

class InvestigationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $investigations = Investigation::orderBy('id', 'desc')->get();
        return $investigations;
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
        $investigation = new Investigation();
        $investigation->title = $request->title;
        $investigation->description = $request->description;
        $investigation->save();
        return response(['message' => 'Investigation created successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Investigation  $investigation
     * @return \Illuminate\Http\Response
     */
    public function show(Investigation $investigation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Investigation  $investigation
     * @return \Illuminate\Http\Response
     */
    public function edit(Investigation $investigation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Investigation  $investigation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required'
        ]);
        $investigation = Investigation::find($id);
        $investigation->title = $request->title;
        $investigation->description = $request->description;
        $investigation->save();
        return response(['message' => 'Investigation updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Investigation  $investigation
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $investigation = Investigation::find($id);
        $investigation->delete();
        return response(['message' => 'Investigation deleted successfully'], 200);
    }
}
