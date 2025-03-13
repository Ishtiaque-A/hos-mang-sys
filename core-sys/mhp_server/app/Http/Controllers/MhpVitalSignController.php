<?php

namespace App\Http\Controllers;

use App\Models\MhpVitalSign;
use Illuminate\Http\Request;

class MhpVitalSignController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vitalSign =MhpVitalSign::orderBy('id','asc')->get();

        return response()->json([
            'status' => 200,
            'message' => 'All VitalSign',
            'vitalSign' => $vitalSign
        ]);
    }

    public function vital_patient()
    {
        $vitalSign =MhpVitalSign::orderBy('id','asc')->where('status_id',1)->get();

        return response()->json([
            'status' => 200,
            'message' => 'All VitalSign',
            'vitalSign' => $vitalSign
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
        if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111,99999).$names;
            $files->move('images/VitalSignIcon',$name);
        } else {
            $name = "";
        }

        $vitalSign = new MhpVitalSign();
        $vitalSign->name = $request->name;
        $vitalSign->value = $request->value;
        $vitalSign->desc = $request->desc;
        $vitalSign->color = $request->color;
        $vitalSign->icon = $name;
        $vitalSign->units_id = $request->units_id;
        $vitalSign->status_id = $request->status_id;
       

        $vitalSign->save();

        return response()->json([
            'status' => 200,
            'message' => 'VitalSign Inserted Successfully',
            'vitalSign' => $vitalSign
        ]);


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpVitalSign  $mhpVitalSign
     * @return \Illuminate\Http\Response
     */
    public function show(MhpVitalSign $mhpVitalSign)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpVitalSign  $mhpVitalSign
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpVitalSign $mhpVitalSign)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpVitalSign  $mhpVitalSign
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'VitalSign Inserted Successfully',
        //     'vitalSign' => $request->all()
        // ]);
        if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111,99999).$names;
            $files->move('images/VitalSignIcon',$name);
        } else {
            $name = "";
        }

        $vitalSign = MhpVitalSign::find($id);
        $vitalSign->name = $request->name;
        $vitalSign->value = $request->value;
        $vitalSign->desc = $request->desc;
        $vitalSign->color = $request->color;
        if ($name == "") {
            $vitalSign->icon = $vitalSign->icon;
        }else{
            $vitalSign->icon = $name;
        }
        $vitalSign->units_id = $request->units_id;
        $vitalSign->status_id = $request->status_id;

        $vitalSign->update();

        return response()->json([
            'status' => 200,
            'message' => 'VitalSign Update Successfully',
            'vitalSign' => $vitalSign
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpVitalSign  $mhpVitalSign
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $vitalSign = MhpVitalSign::find($id);
        $vitalSign->delete();

        return response()->json([
            'status' => 200,
            'message' => 'VitalSign Delete Successfully'
        ]);
    }
    public function getVitalValue($id){
        $vitalSignValue =MhpVitalSign::where('name',$id)->orderBy('id','asc')->first();

        return response()->json([
            'status' => 200,
            'message' => 'All VitalSign',
            'vitalSignValue' => $vitalSignValue
        ]);
    }
}
