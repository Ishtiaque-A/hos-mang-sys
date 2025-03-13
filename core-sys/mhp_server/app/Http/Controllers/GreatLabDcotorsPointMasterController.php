<?php

namespace App\Http\Controllers;

use App\Models\GreatLabDcotorsPointMaster;
use Illuminate\Http\Request;
use Sandy\ApiResponse\Facades\ApiResponse;

class GreatLabDcotorsPointMasterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return ApiResponse::success(GreatLabDcotorsPointMaster::orderBy('id', 'desc')->get());
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
        $data = GreatLabDcotorsPointMaster::create($request->all());
        return ApiResponse::success($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GreatLabDcotorsPointMaster  $greatLabDcotorsPointMaster
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ApiResponse::success(GreatLabDcotorsPointMaster::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GreatLabDcotorsPointMaster  $greatLabDcotorsPointMaster
     * @return \Illuminate\Http\Response
     */
    public function edit(GreatLabDcotorsPointMaster $greatLabDcotorsPointMaster)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GreatLabDcotorsPointMaster  $greatLabDcotorsPointMaster
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = GreatLabDcotorsPointMaster::find($id);
        $data->update($request->all());
        return ApiResponse::success($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GreatLabDcotorsPointMaster  $greatLabDcotorsPointMaster
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = GreatLabDcotorsPointMaster::find($id);
        $data->delete();
    }
}
