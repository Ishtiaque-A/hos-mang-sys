<?php

namespace App\Http\Controllers;

use App\Models\MhpRespiratory;
use App\Models\MhpRespiratoryExaminationList;
use App\Models\MhpRespiratoryHistory;
use App\Models\MhpRespiratoryQuestionnaire;
use Illuminate\Http\Request;

class MhpRespiratoryController extends Controller
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
        $respiratory = new MhpRespiratory();
        $respiratory->patient_id = $request->patient_id;
        $respiratory->Respiratory_History = $request->Respiratory_History;
        $respiratory->Respiratory_Examination_List = $request->Respiratory_Examination_List;
        $respiratory->Respiratory_Questionnaire = $request->Respiratory_Questionnaire;
        $respiratory->cough = $request->cough;
        $respiratory->dyspneaName = $request->dyspneaName;
        $respiratory->dyspneaClass = $request->dyspneaClass;
        $respiratory->symptoms = $request->symptoms;
        $respiratory->medicalHistory = $request->medicalHistory;
        $respiratory->abnormalBreathing = $request->abnormalBreathing;
        $respiratory->vocal = $request->vocal;
        $respiratory->breathSound = $request->breathSound;
        $respiratory->chestExpansion = $request->chestExpansion;
        $respiratory->criptationLeft = $request->criptationLeft;
        $respiratory->criptationRight = $request->criptationRight;
        $respiratory->criptationBoth = $request->criptationBoth;
        $respiratory->criptationCondition = $request->criptationCondition;
        $respiratory->wheezingLeft = $request->wheezingLeft;
        $respiratory->wheezingRight = $request->wheezingRight;
        $respiratory->wheezingBoth = $request->wheezingBoth;
        $respiratory->wheezingCondition = $request->wheezingCondition;
        $respiratory->vocalResonance = $request->vocalResonance;
    
        $respiratory->Pembortons_sign = $request->Pembortons_sign;
        $respiratory->Sleep_Apnoea_Risk = $request->Sleep_Apnoea_Risk;

        $respiratory->Date = $request->Date;
        $respiratory->Age = $request->Age;
        $respiratory->Height = $request->Height;
        $respiratory->Sex = $request->Sex;

        $respiratory->PFR_1st = $request->PFR_1st;
        $respiratory->FEV1_1st = $request->FEV1_1st;
        $respiratory->FVC_1st = $request->FVC_1st;
        $respiratory->Predicted_1st_1 = $request->Predicted_1st_1;
        $respiratory->Predicted_1st_2 = $request->Predicted_1st_2;
        $respiratory->Predicted_1st_3 = $request->Predicted_1st_3;
        $respiratory->Percentage_Predicted_1st_1 = $request->Percentage_Predicted_1st_1;
        $respiratory->Percentage_Predicted_1st_2 = $request->Percentage_Predicted_1st_2;
        $respiratory->Percentage_Predicted_1st_3 = $request->Percentage_Predicted_1st_3;
        $respiratory->Percentage_FEV1orFVC_1st = $request->Percentage_FEV1orFVC_1st;

        $respiratory->percussion = $request->percussion;
        $respiratory->chestShape = $request->chestShape;


        $respiratory->PFR_2st = $request->PFR_2st;
        $respiratory->FEV1_2st = $request->FEV1_2st;
        $respiratory->FVC_2st = $request->FVC_2st;
        $respiratory->Predicted_2st_1 = $request->Predicted_2st_1;
        $respiratory->Predicted_2st_2 = $request->Predicted_2st_2;
        $respiratory->Predicted_2st_3 = $request->Predicted_2st_3;
        $respiratory->Percentage_Predicted_2st_1 = $request->Percentage_Predicted_2st_1;
        $respiratory->Percentage_Predicted_2st_2 = $request->Percentage_Predicted_2st_2;
        $respiratory->Percentage_Predicted_2st_3 = $request->Percentage_Predicted_2st_3;
        $respiratory->Percentage_FEV1orFVC_2st = $request->Percentage_FEV1orFVC_2st;

        $respiratory->Res_Rate = $request->Res_Rate;
        $respiratory->Peak_Flow = $request->Peak_Flow;
        $respiratory->Insipiration = $request->Insipiration;
        $respiratory->Expiration = $request->Expiration;
        $respiratory->Stop_Bang_Questionaria = $request->Stop_Bang_Questionaria;

        $respiratory->SnoringScore = $request->SnoringScore;
        $respiratory->TiredScore = $request->TiredScore;
        $respiratory->ObservedScore = $request->ObservedScore;
        $respiratory->PressureScore = $request->PressureScore;
        $respiratory->BodyMassIndexScore = $request->BodyMassIndexScore;
        $respiratory->AgeScore = $request->AgeScore;
        $respiratory->NeckScore = $request->NeckScore;
        $respiratory->GenderScore = $request->GenderScore;
        $respiratory->total_score = $request->total_score;
        $respiratory->save();
        

        return response()->json([
            'status' => 200,
            'message' => 'Respiratory Inserted Successfully',
            'respiratory' => $respiratory,
            // 'browserInfo'=>$request->header('User_Agent'),
            // 'ip'=>$request->ip(),
            // 'all_info'=>$request->ipinfo->all
        ]);
    }

    public function save_respiratory_history(Request $request)
    {
       //  return $request->all();

         $history = new MhpRespiratoryHistory();
         $history->patient_id = $request->patient_id;
         $history->respiratory_id = $request->respiratory_id;
         $history->history_id = $request->history_id;
         $history->value = $request->value;
        $history->save();

        return response()->json([
            'status' => 200,
            'message' => 'history Inserted Successfully',
            'history' => $history
        ]);
     
    }

    public function save_respiratory_examination(Request $request)
    {
        // $Others = $request->all();

        $examination = new MhpRespiratoryExaminationList();
        $examination->patient_id = $request->patient_id;
        $examination->respiratory_id = $request->respiratory_id;
        $examination->examination_list_id = $request->examination_list_id;
        $examination->value = $request->value;
        $examination->save();

        return response()->json([
            'status' => 200,
            'message' => 'Examination data Inserted Successfully',
            'examination' => $examination
        ]);
     
    }


    public function save_respiratory_questionnaire(Request $request)
    {
        // $Others = $request->all();

        $examination = new MhpRespiratoryQuestionnaire();
        $examination->patient_id = $request->patient_id;
        $examination->respiratory_id = $request->respiratory_id;
        $examination->questionnaire_id = $request->questionnaire_id;
        $examination->value = $request->value;
        $examination->save();

        return response()->json([
            'status' => 200,
            'message' => 'Examination data Inserted Successfully',
            'examination' => $examination
        ]);
     
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpRespiratory  $mhpRespiratory
     * @return \Illuminate\Http\Response
     */
    public function show(MhpRespiratory $mhpRespiratory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpRespiratory  $mhpRespiratory
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpRespiratory $mhpRespiratory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpRespiratory  $mhpRespiratory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpRespiratory $mhpRespiratory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpRespiratory  $mhpRespiratory
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpRespiratory $mhpRespiratory)
    {
        //
    }
}
