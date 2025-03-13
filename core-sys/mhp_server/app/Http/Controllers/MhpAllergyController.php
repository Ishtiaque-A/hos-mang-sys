<?php

namespace App\Http\Controllers;

use App\Models\MhpAllergy;
use App\Models\MhpPatientsAllergy;
use Illuminate\Http\Request;

class MhpAllergyController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $allergySign =MhpAllergy::orderBy('id','asc')->get();

        return response()->json([
            'status' => 200,
            'message' => 'All allergySign',
            'allergySign' => $allergySign
        ]);
    }

    public function save_allergy_patient(Request $request)
    {
        $patientAllergy = new MhpPatientsAllergy();
        $patientAllergy->name = $request->name;
        $patientAllergy->patient_id = $request->patient_id;
        $patientAllergy->desc = $request->desc;
        $patientAllergy->icon = $request->icon;
        $patientAllergy->last_checkup = $request->last_checkup;
        // $patientAllergy->allergy_type = $request->allergy_type;
        $patientAllergy->save();

        return response()->json([
            'status' => 200,
            'message' => 'Patient Allergy Inserted Successfully',
            'patientAllergy' => $patientAllergy
        ]);
    }

    public function vital_patient()
    {
        $allergySign =MhpAllergy::orderBy('id','asc')->where('status_id',1)->get();

        return response()->json([
            'status' => 200,
            'message' => 'All allergySign',
            'allergySign' => $allergySign
        ]);
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
            $files->move('images/allergySignIcon',$name);
        } else {
            $name = "";
        }

        $allergySign = new MhpAllergy();
        $allergySign->name = $request->name;
        $allergySign->desc = $request->desc;
        $allergySign->icon = $name;
        $allergySign->status_id = $request->status_id;

        $allergySign->save();

        return response()->json([
            'status' => 200,
            'message' => 'allergySign Inserted Successfully',
            'allergySign' => $allergySign
        ]);


    }



  

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpAllergy  $MhpAllergy
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'allergySign Inserted Successfully',
        //     'allergySign' => $request->all()
        // ]);
        if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111,99999).$names;
            $files->move('images/allergySignIcon',$name);
        } else {
            $name = "";
        }

        $allergySign = MhpAllergy::find($id);
        $allergySign->name = $request->name;
        $allergySign->desc = $request->desc;
        if ($name == "") {
            $allergySign->icon = $allergySign->icon;
        }else{
            $allergySign->icon = $name;
        }
        $allergySign->status_id = $request->status_id;

        $allergySign->update();

        return response()->json([
            'status' => 200,
            'message' => 'allergySign Update Successfully',
            'allergySign' => $allergySign
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpAllergy  $MhpAllergy
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $allergySign = MhpAllergy::find($id);
        $allergySign->delete();

        return response()->json([
            'status' => 200,
            'message' => 'allergySign Delete Successfully'
        ]);
    }
}
