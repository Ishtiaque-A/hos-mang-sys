<?php

namespace App\Http\Controllers;

use App\Models\MhpPatientsVitalSign;
use App\Models\MhpVitalSign;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;

class MhpPatientsVitalSignController extends Controller

{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        // return response()->json([
        //     'status' => 200,
        //     'message' => 'VitalSign Inserted Successfully',
        //     'vitalSign' => $request->all()
        // ]);

        $vitalSign = new MhpPatientsVitalSign();
        $vitalSign->patient_id = $request->patient_id;
        $vitalSign->name = $request->name;
        $vitalSign->value = $request->value;
        $vitalSign->desc = $request->desc;
        $vitalSign->color = $request->color;
        $vitalSign->last_check_up_date = Carbon::now();
        $vitalSign->icon = $request->icon;
        $vitalSign->units_id = $request->units_id;
        $vitalSign->status_id = $request->status_id;
        $vitalSign->ref_range_value = $request->ref_range_value;
        $vitalSign->remarks = $request->remarks;
        $vitalSign->nurse_id = $request->nurse_id;
        $vitalSign->save();

        return response()->json([
            'status' => 200,
            'message' => 'VitalSign Inserted Successfully',
            'vitalSign' => $vitalSign
        ]);
    }
    public function saveFromGeneral(Request $request, $id)
    {
        $signs = $request->signs;
        foreach ($signs as $sign) {
            // $vt = MhpVitalSign::where('name', $sign['name'])->first();
            $vt = MhpVitalSign::whereRaw('LOWER(name) = ?', [strtolower($sign['name'])])->first();
            if ($vt) {
                $vitalSign = new MhpPatientsVitalSign();
                $vitalSign->patient_id = $id;
                $vitalSign->name = $vt->name;
                $vitalSign->value = $sign['value'];
                $vitalSign->desc = $vt->desc;
                $vitalSign->color = $vt->color;
                $vitalSign->last_check_up_date = Carbon::now();
                $vitalSign->icon = $vt->icon;
                $vitalSign->units_id = $vt->units_id;
                $vitalSign->status_id = 1;
                $vitalSign->ref_range_value = 0;
                $vitalSign->remarks = '';
                $vitalSign->nurse_id = '';
                $vitalSign->save();
            }
        }
        return response()->json([
            'status' => 200,
            'message' => 'VitalSign Inserted Successfully',
            'vitalSign' => $vitalSign
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpPatientsVitalSign  $mhpPatientsVitalSign
     * @return \Illuminate\Http\Response
     */
    public function show(MhpPatientsVitalSign $mhpPatientsVitalSign)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpPatientsVitalSign  $mhpPatientsVitalSign
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpPatientsVitalSign $mhpPatientsVitalSign)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpPatientsVitalSign  $mhpPatientsVitalSign
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpPatientsVitalSign $mhpPatientsVitalSign)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpPatientsVitalSign  $mhpPatientsVitalSign
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpPatientsVitalSign $mhpPatientsVitalSign)
    {
        //
    }

    public function getTodaysVitalSign($id)
    {
        $todaysDate = date("Y-m-d");
        // $checkUpdate=(date('Y-m-d', strtotime('-1 day', strtotime($todaysDate))));

        $getTodayPatientVital = MhpPatientsVitalSign::where('last_check_up_date', 'LIKE', '%' . $todaysDate . '%')->where('patient_id', $id)->get();

        return response()->json([
            'status' => 200,
            'getTodayPatientVital' => $getTodayPatientVital,

        ]);
    }
    public function deletePatientVital(Request $request, $id)
    {
        $deleteData = MhpPatientsVitalSign::where('id', $id)->first();
        $deleteData->delete();
        return response()->json([
            'status' => 200
        ]);
    }
    public function editPatientVital($id)
    {
        $editVital = MhpPatientsVitalSign::where('id', $id)->first();
        return response()->json([
            'status' => 200,
            'editVital' => $editVital
        ]);
    }
    public function updatePatientVital(Request $request, $id)
    {

        $vitalSign = MhpPatientsVitalSign::find($id);
        $vitalSign->patient_id = $request->patient_id;
        $vitalSign->name = $request->name;
        $vitalSign->value = $request->value;
        $vitalSign->desc = $request->desc;
        $vitalSign->color = $request->color;
        $vitalSign->last_check_up_date = $request->last_check_up_date;
        $vitalSign->icon = $request->icon;
        $vitalSign->units_id = $request->units_id;
        $vitalSign->status_id = $request->status_id;
        $vitalSign->ref_range_value = $request->ref_range_value;
        $vitalSign->remarks = $request->remarks;
        $vitalSign->nurse_id = $request->nurse_id;
        $vitalSign->update();

        return response()->json([
            'status' => 200,
            'message' => 'VitalSign Updated Successfully',
            'vitalSign' => $vitalSign
        ]);
    }


    ////////////mobile api for vital signs ///////  get vital signs by patient id
    public function getAllVitalSigns($id)
    {


        $patients_info = DB::table('mhp_patients_vital_signs')->leftJoin('mhp_patients', 'mhp_patients.id', '=', 'mhp_patients_vital_signs.patient_id')->where('mhp_patients_vital_signs.patient_id', $id)->orderBy('mhp_patients_vital_signs.id', 'desc')->select('mhp_patients.*')->distinct('mhp_patients_vital_signs.patient_id')->get();


        $Patients_Vitalsigns_Info = DB::table('mhp_patients_vital_signs')->leftJoin('mhp_patients', 'mhp_patients.id', '=', 'mhp_patients_vital_signs.patient_id')->where('mhp_patients_vital_signs.patient_id', $id)->orderBy('mhp_patients_vital_signs.id', 'desc')->select('mhp_patients_vital_signs.*')->get();



        return response()->json([
            'status' => 200,
            'patients_info' => $patients_info,
            'Patients_Vitalsigns_Info' => $Patients_Vitalsigns_Info

        ]);
    }
}
