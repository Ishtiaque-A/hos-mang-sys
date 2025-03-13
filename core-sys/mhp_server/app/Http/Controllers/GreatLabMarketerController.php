<?php

namespace App\Http\Controllers;

use App\Models\GreatLabMarketer;
use Illuminate\Http\Request;

class GreatLabMarketerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $collectorInfo = GreatLabMarketer::orderBy('id', 'desc')->get();
            return response()->json($collectorInfo);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
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
        try {
            $collectorInfo = new GreatLabMarketer();
            $collectorInfo->name = $request->name;
            $collectorInfo->phone = $request->phone;
            $collectorInfo->email = $request->email;
            $collectorInfo->address = $request->address;
            $collectorInfo->save();
            return response()->json($collectorInfo, 201);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GreatLabMarketer  $collectorInfo
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $collectorInfo = GreatLabMarketer::find($id);
            return response()->json($collectorInfo);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GreatLabMarketer  $collectorInfo
     * @return \Illuminate\Http\Response
     */
    public function edit(GreatLabMarketer $collectorInfo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GreatLabMarketer  $collectorInfo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GreatLabMarketer $collectorInfo)
    {
        try {
            $collectorInfo = GreatLabMarketer::find($request->id);
            $collectorInfo->name = $request->name;
            $collectorInfo->phone = $request->phone;
            $collectorInfo->email = $request->email;
            $collectorInfo->address = $request->address;
            $collectorInfo->save();
            return response()->json($collectorInfo);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GreatLabMarketer  $collectorInfo
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $collectorInfo = GreatLabMarketer::find($id);
            $collectorInfo->delete();
            return response()->json($collectorInfo);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }
}
