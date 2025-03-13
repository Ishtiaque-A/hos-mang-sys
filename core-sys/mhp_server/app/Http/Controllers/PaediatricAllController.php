<?php

namespace App\Http\Controllers;

use App\Models\PaediatricAll;
use Illuminate\Http\Request;

class PaediatricAllController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = PaediatricAll::latest()->get();

        return response()->json([
        'message'=> 'Data get Sucessfully',
        'all' => $data
        ],201);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $data = PaediatricAll::create($request->all());

       return response()->json([
        'message'=> 'Data Save Sucessfully',
        'data' => $data
       ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PaediatricAll  $paediatricAll
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = PaediatricAll::findOrfail($id);
        return response()->json([
            'message'=> 'Data get Sucessfully',
            'data' => $data
           ],201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PaediatricAll  $paediatricAll
     * @return \Illuminate\Http\Response
     */
    public function edit(PaediatricAll $paediatricAll)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PaediatricAll  $paediatricAll
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PaediatricAll $paediatricAll)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PaediatricAll  $paediatricAll
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $record = PaediatricAll::findOrFail($id);
        $record->delete();
        return response()->json(['message' => 'Record deleted successfully.'], 200);
    }
}
