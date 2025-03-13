<?php

namespace App\Http\Controllers;

use App\Models\MhpObstetrics;
use Illuminate\Http\Request;

class MhpObstetricsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $obstetricsName = MhpObstetrics::orderBy('id', 'desc')->get();

        return response()->json([
            "status" => 200,
            "message" => "All  obstetricsName",
            "obstetricsName" => $obstetricsName
        ]);
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
         // return $request ->all();
         $obstetricsName = new MhpObstetrics();
         $obstetricsName->name = $request->name;
         $obstetricsName->save();
 
         return response()->json([
             'status' => 200,
             'message' => 'Obstetrics Name Inserted Successfully',
             'obstetricsName' => $obstetricsName
         ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpObstetrics  $mhpObstetrics
     * @return \Illuminate\Http\Response
     */
    public function show(MhpObstetrics $mhpObstetrics)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpObstetrics  $mhpObstetrics
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = MhpObstetrics::find($id);
        
        return response()->json([
            'status' => 200,
            "obstetricsName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpObstetrics  $mhpObstetrics
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $obstetricsName = MhpObstetrics::find($id);
        $obstetricsName->name = $request->name;
        $obstetricsName->update();

        return response()->json([
            'status' => 200,
            'message' => 'Obstetrics Name Updated Successfully',
            'obstetricsName' => $obstetricsName
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpObstetrics  $mhpObstetrics
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $obstetricsName = MhpObstetrics::find($id);
        $obstetricsName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Obstetrics Name Deleted Successfully'
        ]);
    }
}
