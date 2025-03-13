<?php

namespace App\Http\Controllers;

use App\Models\CollectorInfo;
use Illuminate\Http\Request;

class CollectorInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $collectorInfo = CollectorInfo::orderBy('id', 'desc')->get();
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
            $collectorInfo = new CollectorInfo();
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
     * @param  \App\Models\CollectorInfo  $collectorInfo
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $collectorInfo = CollectorInfo::find($id);
            return response()->json($collectorInfo);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CollectorInfo  $collectorInfo
     * @return \Illuminate\Http\Response
     */
    public function edit(CollectorInfo $collectorInfo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CollectorInfo  $collectorInfo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CollectorInfo $collectorInfo)
    {
        try {
            $collectorInfo = CollectorInfo::find($request->id);
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
     * @param  \App\Models\CollectorInfo  $collectorInfo
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $collectorInfo = CollectorInfo::find($id);
            $collectorInfo->delete();
            return response()->json($collectorInfo);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }
}
