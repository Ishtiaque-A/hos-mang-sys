<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpAntenatalVisits;
use App\Models\MhpAntenatalVisitsBMITarget;
use Illuminate\Http\Request;

class MhpAntenatalVisitsController extends Controller
{
    //
    public function store(Request $request)
    {
        $antenatalVisits = new MhpAntenatalVisits();
        $antenatalVisits->patient_id = $request->patient_id;
        $antenatalVisits->doctor_id = $request->doctor_id;
        $antenatalVisits->image = $request->image;
        $antenatalVisits->systolic_value = $request->systolic_value;
        $antenatalVisits->diastolic_ternary = $request->diastolic_ternary;
        $antenatalVisits->height_ternary = $request->height_ternary;
        $antenatalVisits->weight_ternary = $request->weight_ternary;
        $antenatalVisits->bMI_ternary = $request->bMI_ternary;
        $antenatalVisits->bmi_terget = $request->bmi_terget;
        $antenatalVisits->prePregnancyBMI_ternary = $request->prePregnancyBMI_ternary;
        $antenatalVisits->gestation_ternary = $request->gestation_ternary;
        $antenatalVisits->protine_ternary = $request->protine_ternary;
        $antenatalVisits->glucose_ternary = $request->glucose_ternary;
        $antenatalVisits->others_ternary = $request->others_ternary;
        $antenatalVisits->fundalHeight_ternary = $request->fundalHeight_ternary;
        $antenatalVisits->size_ternary = $request->size_ternary;
        $antenatalVisits->clinical_ternary = $request->clinical_ternary;
        $antenatalVisits->foetalMovement_ternary = $request->foetalMovement_ternary;
        $antenatalVisits->presentation_ternary = $request->presentation_ternary;
        $antenatalVisits->position_ternary = $request->position_ternary;
        $antenatalVisits->foetalHeartSound_ternary = $request->foetalHeartSound_ternary;
        $antenatalVisits->dTpa_ternary = $request->dTpa_ternary;
        $antenatalVisits->influenza_ternary = $request->influenza_ternary;
        $antenatalVisits->antiD_ternary = $request->antiD_ternary;
        $antenatalVisits->i8Weeks_ternary = $request->i8Weeks_ternary;
        $antenatalVisits->i36Weeks_ternary = $request->i36Weeks_ternary;
        $antenatalVisits->antenatal_visits_date = $request->antenatal_visits_date;
        $antenatalVisits->text_value = $request->text_value;
        $antenatalVisits->next_date = $request->next_date;
        $antenatalVisits->save();

        return response()->json([
            'status' => 200,
            'message' => 'Antenatal Visit data Inserted Successfully',
            'antenatalVisits' => $antenatalVisits
        ]);
    }
    public function index($id)
    {
        $antenatalVisits = MhpAntenatalVisits::with('doctor')->where('patient_id', $id)->get();

        return response()->json([
            'status' => 200,
            'message' => 'Antenatal Visit data',
            'antenatalVisits' => $antenatalVisits
        ]);
    }
    public function destroy($id)
    {
        $antenatalVisits = MhpAntenatalVisits::find($id);
        $antenatalVisits->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Data delete sucessfully'
        ]);
    }



    public function save__antenatal__visits__bmi__target(Request $request)
    {
        // return $request->all();
        $bMITarget = new MhpAntenatalVisitsBMITarget();
        $bMITarget->patient_id = $request->patient_id;
        $bMITarget->antenatal_visits_id = $request->antenatal_visits_id;
        $bMITarget->bMITarget_id = $request->bMITarget_id;
        $bMITarget->value = $request->value;

        $bMITarget->save();

        return response()->json([
            'status' => 200,
            'message' => 'Aerobic Exercise Inserted Successfully',
            'bMITarget' => $bMITarget
        ]);
    }
}
