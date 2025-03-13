<?php

namespace App\Http\Controllers;

use App\Models\entExamination;
use App\Models\MhpEntExamination;
use App\Models\MhpEntExaminEarLesion;
use App\Models\MhpEntExaminEntOthers;
use Illuminate\Http\Request;

class EntExaminationController extends Controller
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
        $ent = new MhpEntExamination();

        $ent->patient_id = $request->patient_id;
        $ent->Ear_Lesion =implode(",",$request->Ear_Lesion) ;
        $ent->Ent_Others =implode(",",$request->Ent_Others);
        $ent->ear_his_side = $request->ear_his_side;
        $ent->earDischarge_his_value = $request->earDischarge_his_value;
        $ent->deafness_his_value = $request->deafness_his_value;
        $ent->tinnitus_his_side = $request->tinnitus_his_side;
        $ent->face_his_side = $request->face_his_side;
        $ent->earLesion = $request->earLesion;
        $ent->earLesionPart = $request->earLesionPart;
        $ent->earlessionleftMMX = $request->earlessionleftMMX;
        $ent->earlessionRightMMX = $request->earlessionRightMMX;
        $ent->earCanal_value = $request->earCanal_value;
        $ent->earCanal_side = $request->earCanal_side;
        $ent->discharge_side = $request->discharge_side;
        $ent->body_side = $request->body_side;
        $ent->lymph_value = $request->lymph_value;
        $ent->wax_side = $request->wax_side;
        $ent->glueEar_side = $request->glueEar_side;
        $ent->glueEar_value = $request->glueEar_value;
        $ent->mastoid_value = $request->mastoid_value;
        $ent->tympanic_side = $request->tympanic_side;
        $ent->tympanic_value = $request->tympanic_value;
        $ent->renne_value = $request->renne_value;
        $ent->weber_value = $request->weber_value;
        $ent->louderDeafer_side = $request->louderDeafer_side;
        $ent->sensorinural_side = $request->sensorinural_side;
        $ent->conduct_side = $request->conduct_side;
        $ent->louder_side = $request->louder_side;
        $ent->inflamed_ternary = $request->inflamed_ternary;
        $ent->uvula_ternary = $request->uvula_ternary;
        $ent->tonsil_side = $request->tonsil_side;
        $ent->tonsilValue = implode(",",$request->tonsilValue);
        $ent->ulser_value = $request->ulser_value;
        $ent->tongue_value = $request->tongue_value;
        $ent->tongueLesion_value = $request->tongueLesion_value;
        $ent->nose_side = $request->nose_side;
        $ent->nose_value = $request->nose_value;
        $ent->nasalSeptal_ternary = $request->nasalSeptal_ternary;
        $ent->mucosa_ternary = $request->mucosa_ternary;
        $ent->turbinates_ternary = $request->turbinates_ternary;
        $ent->polip_ternary = $request->polip_ternary;
        $ent->polipAnterior_ternary = $request->polipAnterior_ternary;
        $ent->clearDischarge_ternary = $request->clearDischarge_ternary;
        $ent->bleedingAnterior_ternary = $request->bleedingAnterior_ternary;
        $ent->bleedingPosterior_ternary = $request->bleedingPosterior_ternary;
        $ent->foreign_ternary = $request->foreign_ternary;

        $ent->save();

        return response()->json([
            'status' => 200,
            'message' => 'Ent Inserted Successfully',
            'ent' => $ent
        ]);
    }

    public function store_ear_lesson(Request $request)
    {
        $data = new MhpEntExaminEarLesion();
        $data->patient_id = $request->patient_id;
        $data->mhp_ent_examin_id = $request->mhp_ent_examin_id;
        $data->ear_lesions_id = $request->ear_lesions_id;
        $data->value = $request->value;
        $data->save();

        return response()->json([
            'status' => 200,
            'message' => 'data Inserted Successfully',
            'data' => $data
        ]);
    }

    public function store_ent_other(Request $request)
    {
        $data = new MhpEntExaminEntOthers();
        $data->patient_id = $request->patient_id;
        $data->mhp_ent_examin_id = $request->mhp_ent_examin_id;
        $data->ent_others_id = $request->ent_others_id;
        $data->value = $request->value;
        $data->save();

        return response()->json([
            'status' => 200,
            'message' => 'data Inserted Successfully',
            'data' => $data
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\entExamination  $entExamination
     * @return \Illuminate\Http\Response
     */
    public function show($entExamination)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\entExamination  $entExamination
     * @return \Illuminate\Http\Response
     */
    public function edit($entExamination)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\entExamination  $entExamination
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $entExamination)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\entExamination  $entExamination
     * @return \Illuminate\Http\Response
     */
    public function destroy($entExamination)
    {
        //
    }
}
