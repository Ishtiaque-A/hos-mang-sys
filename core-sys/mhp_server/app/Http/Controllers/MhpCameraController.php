<?php

namespace App\Http\Controllers;

use App\Models\MhpCamera;
use Illuminate\Http\Request;

class MhpCameraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function camera_index($docId, $patId)
    {
        return MhpCamera::where([['doctor_id', $docId], ['patient_id', $patId]])->get();
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
        return MhpCamera::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpCamera  $mhpCamera
     * @return \Illuminate\Http\Response
     */
    public function show(MhpCamera $mhpCamera)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpCamera  $mhpCamera
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpCamera $mhpCamera)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpCamera  $mhpCamera
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpCamera $mhpCamera)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpCamera  $mhpCamera
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = MhpCamera::find($id);
        $data->delete();
    }
}
