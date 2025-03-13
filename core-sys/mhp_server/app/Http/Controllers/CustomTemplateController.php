<?php

namespace App\Http\Controllers;

use App\Models\CustomTemplate;
use App\Models\MhpPatientReferralLeter;
use Illuminate\Http\Request;

class CustomTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tem = CustomTemplate::orderBy('id','DESC')->get();
       
        return response()->json([
            'status' => 200,
            'message' => 'Data get Successfully',
            'tem' => $tem
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
        $tem = new CustomTemplate();
        $tem->name =  $request->name;             
        $tem->data =  $request->data; 
        $tem->user_id =  $request->user_id;            
        $tem->user_type =  $request->user_type;            
        $tem->save();
        
        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'tem' => $tem
        ]);
    }


    public function Patient_Lette(Request $request)
    {
        $tem = new MhpPatientReferralLeter();
        $tem->patient_id =  $request->patient_id;             
        $tem->data =  $request->data; 
        $tem->user_id =  $request->user_id;            
        $tem->user_type =  $request->user_type;            
        $tem->save();
        
        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'tem' => $tem
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CustomTemplate  $customTemplate
     * @return \Illuminate\Http\Response
     */
    public function show(CustomTemplate $customTemplate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CustomTemplate  $customTemplate
     * @return \Illuminate\Http\Response
     */
    public function edit(CustomTemplate $customTemplate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CustomTemplate  $customTemplate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CustomTemplate $customTemplate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CustomTemplate  $customTemplate
     * @return \Illuminate\Http\Response
     */
    public function destroy(CustomTemplate $customTemplate)
    {
        //
    }
}
