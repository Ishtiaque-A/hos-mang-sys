<?php

namespace App\Http\Controllers;

use App\Models\MhpMSAnkelAndFoot;
use App\Models\MhpMSCarvicalSpine;
use App\Models\MhpMSElbow;
use App\Models\MhpMSHandAndWrist;
use App\Models\MhpMSKnee;
use App\Models\MhpMSThoracoLumberSpine;
use App\Models\MhpMusculoSketalCarvicalSpineHistory;
use App\Models\MhpMusculoSketalCarvicalSpineMomement1;
use App\Models\MhpMusculoSketalCarvicalSpineMovement2nd;
use App\Models\MhpMusculoSketalCarvicalSpineTendernesOverFactJoin;
use App\Models\MhpMusculoSketalCarvicalSpineTendernesOverSpinus;
use App\Models\MhpMusculoSketalHipAndPelvis;
use App\Models\MhpMusculoSketalHipAndPelvisTest;
use App\Models\MhpMusculoSketalShoulder;
use App\Models\MhpMusculoSketalShoulderAnteriorView;
use App\Models\MhpMusculoSketalShoulderResistedMovement;
use App\Models\MhpMusculoSketalShoulderShapCounter;
use App\Models\MhpMusculoSketalThoracoLumberSpine;
use App\Models\MhpMusculoSketalThoracoLumberSpineTenderNessOver;
use App\Models\MhpMusculoSketalThoracoLumberSpineTenderNessOverL1;
use App\Models\MhpMusculoSketalThoracoLumberSpineTenderOver;
use App\Models\MhpMusculoSketalThoracoLumberSpineTenderOverL1ToL6;
use App\Models\MusculoSketalCarvicalSpine;
use Illuminate\Http\Request;

class MhpMusculoSketalExamiController extends Controller
{
    public function store(Request $request)
    {
        $mse = new MhpMSCarvicalSpine();
        $mse->patient_id = $request->patient_id;
        $mse->posture = $request->posture;
        $mse->compareTo = $request->compareTo;

        $mse->historyValue = implode(",", $request->historyValue);
        $mse->tender = implode(",", $request->tender);
        $mse->tenerness = implode(",", $request->tenerness);

        $mse->forwardFlexion45 = $request->forwardFlexion45;
        $mse->backwardExtension45 = $request->backwardExtension45;
        $mse->lateralBending45 = $request->lateralBending45;
        $mse->lateralBendingLeft45 = $request->lateralBendingLeft45;
        $mse->rotationOver75 = $request->rotationOver75;
        $mse->rotationOverLeft75 = $request->rotationOverLeft75;

        $mse->carvicalHistoryValue = implode(",", $request->carvicalHistoryValue);

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }

    public function history_store(Request $request)
    {
        $mse = new MhpMusculoSketalCarvicalSpineHistory();

        $mse->patient_id = $request->patient_id;
        $mse->carvical_spine_id = $request->carvical_spine_id;
        $mse->history_id = $request->history_id;
        $mse->value = $request->value;

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }

    public function movement_1st_store(Request $request)
    {
        $mse = new MhpMusculoSketalCarvicalSpineMomement1();

        $mse->patient_id = $request->patient_id;
        $mse->carvical_spine_id = $request->carvical_spine_id;
        $mse->momement1s_id = $request->momement1s_id;
        $mse->value = $request->value;

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }

    public function movement_2nd_store(Request $request)
    {
        $mse = new MhpMusculoSketalCarvicalSpineMovement2nd();

        $mse->patient_id = $request->patient_id;
        $mse->carvical_spine_id = $request->carvical_spine_id;
        $mse->momement_id = $request->momement_id;
        $mse->value = $request->value;

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }

    public function tedernes_over_spinus_store(Request $request)
    {
        $mse = new MhpMusculoSketalCarvicalSpineTendernesOverSpinus();

        $mse->patient_id = $request->patient_id;
        $mse->carvical_spine_id = $request->carvical_spine_id;
        $mse->tendernes_over_spinuses_id = $request->tendernes_over_spinuses_id;
        $mse->value = $request->value;

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }


    public function tedernes_over_fact_store(Request $request)
    {
        $mse = new MhpMusculoSketalCarvicalSpineTendernesOverFactJoin();

        $mse->patient_id = $request->patient_id;
        $mse->carvical_spine_id = $request->carvical_spine_id;
        $mse->side = $request->side;
        $mse->tendernes_over_fact_joins_id = $request->tendernes_over_fact_joins_id;
        $mse->value = $request->value;

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }


    public function thoracal_lumber_spine_store(Request $request)
    {
        // return $request->all();
        $mse = new MhpMSThoracoLumberSpine();
        $mse->patient_id = $request->patient_id;

        $mse->tenderOver = implode(",", $request->tenderOver);
        $mse->tenderOverL1ToL6 = implode(",", $request->tenderOverL1ToL6);
        $mse->tendernessOver = implode(",", $request->tendernessOver);


        $mse->inspection_look_value = $request->inspection_look_value;
        $mse->sudden_anaesthesia_value = $request->sudden_anaesthesia_value;
        $mse->thoracic_kyphosis_value = $request->thoracic_kyphosis_value;
        $mse->lumber_lordosis_value = $request->lumber_lordosis_value;
        $mse->spine_value = $request->spine_value;
        $mse->pain_along_value = $request->pain_along_value;
        $mse->pain_over_value = $request->pain_over_value;
        $mse->slum_test_ternary = $request->slum_test_ternary;
        $mse->pain_into_knee_value = $request->pain_into_knee_value;
        $mse->walk_on_value = $request->walk_on_value;
        $mse->tenderness_over_thoraco_side = $request->tenderness_over_thoraco_side;
        $mse->lateral_flexion_side = $request->lateral_flexion_side;
        $mse->forward_ternsry = $request->forward_ternsry;
        $mse->extension_ternary = $request->extension_ternary;
        $mse->slJoint_side = $request->slJoint_side;
        $mse->hip_joint_line_side = $request->hip_joint_line_side;
        $mse->valsalva_PN_ternary = $request->valsalva_PN_ternary;
        $mse->straight_leg_raising_ternary = $request->straight_leg_raising_ternary;
        $mse->femoral_stretch_PN_ternary = $request->femoral_stretch_PN_ternary;
        $mse->hoover_test_PN_ternary = $request->hoover_test_PN_ternary;
        $mse->gaenslens_sign_PN_ternary = $request->gaenslens_sign_PN_ternary;
        $mse->patrick_bucket_PN_ternary = $request->patrick_bucket_PN_ternary;
        $mse->quadrant_PN_ternary = $request->quadrant_PN_ternary;
        $mse->trendelenburg_PN_ternary = $request->trendelenburg_PN_ternary;
        $mse->spondylosis_PN_ternary = $request->spondylosis_PN_ternary;
        $mse->hip_flexion_value = $request->hip_flexion_value;
        $mse->resisted_value = $request->resisted_value;
        $mse->dorsiflexion_value = $request->dorsiflexion_value;
        $mse->extend_value = $request->extend_value;
        $mse->l1_value = $request->l1_value;
        $mse->l3Area_value = $request->l3Area_value;
        $mse->l4Area_value = $request->l4Area_value;
        $mse->l5Area_value = $request->l5Area_value;
        $mse->planter_flexion_value = $request->planter_flexion_value;
        $mse->s1_area_value = $request->s1_area_value;
        $mse->s4_supply_value = $request->s4_supply_value;
        $mse->Shober_test = $request->Shober_test;

        $mse->thoracoHistoryValue = implode(",", $request->thoracoHistoryValue);

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }

    public function thoracal_lumber_spine_tender_over_store(Request $request)
    {
        $mse = new MhpMusculoSketalThoracoLumberSpineTenderOver();
        $mse->patient_id = $request->patient_id;
        $mse->thoraco_lumber_spine_id = $request->thoraco_lumber_spine_id;
        $mse->tender_over_id = $request->tender_over_id;
        $mse->value = $request->value;

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }

    public function thoracal_lumber_spine_tender_over_L1_L6_store(Request $request)
    {
        $mse = new MhpMusculoSketalThoracoLumberSpineTenderOverL1ToL6();
        $mse->patient_id = $request->patient_id;
        $mse->thoraco_lumber_spine_id = $request->thoraco_lumber_spine_id;
        $mse->tender_over_l1_to_l6_id = $request->tender_over_l1_to_l6_id;
        $mse->value = $request->value;
        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }


    public function thoracal_lumber_spine_tender_ness_over_store(Request $request)
    {
        $mse = new MhpMusculoSketalThoracoLumberSpineTenderNessOver();
        $mse->patient_id = $request->patient_id;
        $mse->thoraco_lumber_spine_id = $request->thoraco_lumber_spine_id;
        $mse->tenderness_over_side = $request->tenderness_over_side;
        $mse->tenderness_over_id = $request->tenderness_over_id;
        $mse->value = $request->value;

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }

    public function thoracal_lumber_spine_tender_ness_over_L1_L6_store(Request $request)
    {
        $mse = new MhpMusculoSketalThoracoLumberSpineTenderNessOverL1();
        $mse->patient_id = $request->patient_id;
        $mse->thoraco_lumber_spine_id = $request->thoraco_lumber_spine_id;
        $mse->tenderness_over_l1_id = $request->tenderness_over_l1_id;
        $mse->value = $request->value;
        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }


    public function hipAndPelvis_store(Request $request)
    {
        $mse = new MhpMusculoSketalHipAndPelvis();
        $mse->patient_id = $request->patient_id;
        $mse->hip_ternary = $request->hip_ternary;
        $mse->sacroIliac_PN_ternary = $request->sacroIliac_PN_ternary;
        $mse->ortolani_PN_ternary = $request->ortolani_PN_ternary;
        $mse->inspection_look_value = $request->inspection_look_value;
        $mse->thomas_test_PN_ternary = $request->thomas_test_PN_ternary;
        $mse->hipJoint_compression_PN_ternary = $request->hipJoint_compression_PN_ternary;
        $mse->ober_test_PN_ternary = $request->ober_test_PN_ternary;
        $mse->gait_value = $request->gait_value;
        $mse->patrick_PN_ternary = $request->patrick_PN_ternary;
        $mse->piriformis_PN_ternary = $request->piriformis_PN_ternary;
        $mse->ely_test_PN_ternary = $request->ely_test_PN_ternary;
        $mse->hip_jointtenderness_PA_ternary = $request->hip_jointtenderness_PA_ternary;
        $mse->greater_trochanter_LR_ternary = $request->greater_trochanter_LR_ternary;
        $mse->gluteus_medius_PA_ternary = $request->gluteus_medius_PA_ternary;
        $mse->trochanteric_bursi_PA_ternary = $request->trochanteric_bursi_PA_ternary;
        $mse->flexion135 = $request->flexion135;
        $mse->abduction50 = $request->abduction50;
        $mse->InternalRotation45 = $request->InternalRotation45;
        $mse->Extension20 = $request->Extension20;
        $mse->Adduction45 = $request->Adduction45;
        $mse->alRotation45 = $request->alRotation45;
        $mse->trueLegLengthLeft = $request->trueLegLengthLeft;
        $mse->trueLegLengthRight = $request->trueLegLengthRight;
        $mse->ApparentLegLengthLeft = $request->ApparentLegLengthLeft;
        $mse->ApparentLegLengthRight = $request->ApparentLegLengthRight;

        $mse->hipHistoryValue = implode(",", $request->hipHistoryValue);


        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }


    public function hipAndPelvis_test_store(Request $request)
    {
        $mse = new MhpMusculoSketalHipAndPelvisTest();
        $mse->patient_id = $request->patient_id;
        $mse->hip_and_pelvis_id = $request->hip_and_pelvis_id;
        $mse->test_id = $request->test_id;
        $mse->value = $request->value;
        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }


    public function shoulder_store(Request $request)
    {
        // $mse = MhpMusculoSketalShoulder::create($request->all());

        $mse = new MhpMusculoSketalShoulder();
        $mse->patient_id = $request->patient_id;

        $mse->shapCounter = implode(",", $request->shapCounter);
        $mse->anteriorView = implode(",", $request->anteriorView);
        $mse->resistedMovement = implode(",", $request->resistedMovement);

        $mse->shoulder_LR_ternary = $request->shoulder_LR_ternary;
        $mse->level_of_spine_value = $request->level_of_spine_value;
        $mse->winged_scapula_value = $request->winged_scapula_value;
        $mse->sternum_ternary_value = $request->sternum_ternary_value;
        $mse->coracoid_process_ternary_value = $request->coracoid_process_ternary_value;
        $mse->scapula_ternary_value = $request->scapula_ternary_value;
        $mse->axillary_ternary_value = $request->axillary_ternary_value;
        $mse->ac_joint_ternary_value = $request->ac_joint_ternary_value;
        $mse->joint_margin_ternary_value = $request->joint_margin_ternary_value;
        $mse->infraspinatus_ternary_value = $request->infraspinatus_ternary_value;
        $mse->subacromial_ternary_value = $request->subacromial_ternary_value;
        $mse->spineof_scapula_ternary_value = $request->spineof_scapula_ternary_value;
        $mse->supra_spinatus_ternary_value = $request->supra_spinatus_ternary_value;
        $mse->painful_arc_value = $request->painful_arc_value;
        $mse->resistedMovementside = $request->resistedMovementside;
        $mse->acromioclavicular_PN_ternary = $request->acromioclavicular_PN_ternary;
        $mse->scapular_assistance_PN_ternary = $request->scapular_assistance_PN_ternary;
        $mse->lateral_slide_PN_ternary = $request->lateral_slide_PN_ternary;
        $mse->impigement_neer_PN_ternary = $request->impigement_neer_PN_ternary;
        $mse->impigement_hawkinskennedy_PN_ternary = $request->impigement_hawkinskennedy_PN_ternary;
        $mse->instability_load_shift_PN_ternary = $request->instability_load_shift_PN_ternary;
        $mse->instability_apprehension_PN_ternary = $request->instability_apprehension_PN_ternary;
        $mse->inferior_sulcus_sign_PN_ternary = $request->inferior_sulcus_sign_PN_ternary;
        $mse->superiorLabralAnterior = $request->superiorLabralAnterior;
        $mse->SLAPLeison_obriens_PN_ternary = $request->SLAPLeison_obriens_PN_ternary;
        $mse->specific_palpation_PN_ternary = $request->specific_palpation_PN_ternary;
        $mse->upper_limb_euro_dynamic_PN_ternary = $request->upper_limb_euro_dynamic_PN_ternary;
        $mse->abduction50 = $request->abduction50;
        $mse->abduction170 = $request->abduction170;
        $mse->Flexion160 = $request->Flexion160;
        $mse->Extension50 = $request->Extension50;
        $mse->LateralRotation80 = $request->LateralRotation80;
        $mse->MedialRotation = $request->MedialRotation;

        $mse->shoulderHistoryValue = implode(",", $request->shoulderHistoryValue);


        $mse->save();

        return response()->json([
            'status' => 200,
            'User-Agent'=>$request->header('User-Agent'),
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }



    public function knee_store(Request $request)
    {
        $mse = new MhpMSKnee();
        $mse->patient_id = $request->patient_id;

        $mse->kneeJoint_ternary = $request->kneeJoint_ternary;

        $mse->knee_anterior_view_object_value = implode(",", $request->knee_anterior_view_object_value);
        $mse->lateral_view_object_value = implode(",", $request->lateral_view_object_value);
        $mse->knee_posterior_view_object_value = implode(",", $request->knee_posterior_view_object_value);
        $mse->stance_object_value = implode(",", $request->stance_object_value);

        $mse->brush_or_wipe_test_PN_ternary = $request->brush_or_wipe_test_PN_ternary;
        $mse->patellar_tap_test_PN_ternary = $request->patellar_tap_test_PN_ternary;
        $mse->zohler_test_PN_ternary = $request->zohler_test_PN_ternary;
        $mse->knee_condyle_value = $request->knee_condyle_value;
        $mse->tibial_tubercle_value = $request->tibial_tubercle_value;
        $mse->above_knee_measurement_side_ternary = $request->above_knee_measurement_side_ternary;

        $mse->above_knee_measurement = $request->above_knee_measurement;
        $mse->above_knee_measurement_1 = $request->above_knee_measurement_1;

        $mse->bellow_knee_measurement_side_ternary = $request->bellow_knee_measurement_side_ternary;
        $mse->bellow_knee_measurement = $request->bellow_knee_measurement;

        $mse->medial_meniscus_PN_ternary = $request->medial_meniscus_PN_ternary;
        $mse->lateral_meniscus_PN_ternary = $request->lateral_meniscus_PN_ternary;
        $mse->knee_flexion_PN_ternary = $request->knee_flexion_PN_ternary;
        $mse->knee_kxtention_PN_ternary = $request->knee_kxtention_PN_ternary;


   
        $mse->kneeLigamentInjury= $request->kneeLigamentInjury;
        $mse->kneeMeniscusInjusy= $request->kneeMeniscusInjusy;


        $mse->kneeMedialLigament= $request->kneeMedialLigament;
        $mse->kneeAnteriorCruciate= $request->kneeAnteriorCruciate;
        $mse->kneeSagSign= $request->kneeSagSign;
        $mse->kneeLateralLigament= $request->kneeLateralLigament;
        $mse->kneePostCruciateLigament= $request->kneePostCruciateLigament;
        $mse->kneeWilsonTest= $request->kneeWilsonTest;
        $mse->kneeNobleCompression= $request->kneeNobleCompression;

            $mse->medialMeniscusSide= $request->medialMeniscusSide;
            $mse->lateralMeniscusSide= $request->lateralMeniscusSide;
            $mse->kneeLigamentInjurySide= $request->kneeLigamentInjurySide;
            $mse->kneeMeniscusInjusySide= $request->kneeMeniscusInjusySide;
            $mse->kneeMedialRotationLigament= $request->kneeMedialRotationLigament;
            $mse->kneeMedialRotationMeniscus= $request->kneeMedialRotationMeniscus;
            $mse->kneeMedialLigamentSide= $request->kneeMedialLigamentSide;
            $mse->kneeAnteriorCruciateSide= $request->kneeAnteriorCruciateSide;
            $mse->kneeLateralLigamentSide= $request->kneeLateralLigamentSide;
            $mse->kneeSagSignSide= $request->kneeSagSignSide;
            $mse->kneePostCruciateLigamentSide= $request->kneePostCruciateLigamentSide;
            $mse->kneeWilsonTestSide= $request->kneeWilsonTestSide;
            $mse->kneePatellaApprehensionSide= $request->kneePatellaApprehensionSide;
            $mse->kneeNobleCompressionSide= $request->kneeNobleCompressionSide;

            $mse->kneeHistoryValue = implode(",", $request->kneeHistoryValue);
        

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }
    public function ankel_foot_store(Request $request)
    {
        $mse = new MhpMSAnkelAndFoot();
        $mse->patient_id = $request->patient_id;
        $mse->footInspectio = $request->footInspectio;
        $mse->MTPJointNumber = implode(",", $request->MTPJointNumber);
        $mse->MTPJointSymptom = implode(",", $request->MTPJointSymptom);
        $mse->PIPJointNumber = implode(",", $request->PIPJointNumber);
        $mse->PIPJointSymptom = implode(",", $request->PIPJointSymptom);

        $mse->DIPJointNumber = implode(",", $request->DIPJointNumber);
        $mse->DIPJointSymptom = implode(",", $request->DIPJointSymptom);

        $mse->toesSymptomNumber = implode(",", $request->toesSymptomNumber);
        $mse->toesSymptomRight = implode(",", $request->toesSymptomRight);

        $mse->dorsumSymptom = implode(",", $request->dorsumSymptom);
        $mse->planterSymptom = implode(",", $request->planterSymptom);

        $mse->nailNumber = implode(",", $request->nailNumber);
        $mse->nailSymptom = implode(",", $request->nailSymptom);

        $mse->feelPalpation = $request->feelPalpation;
        $mse->feelPalpationToesLeft = implode(",", $request->feelPalpationToesLeft);

        $mse->feelPalpationMTPJointSide = $request->feelPalpationMTPJointSide;
        $mse->feelPalpationMTPJoint = implode(",", $request->feelPalpationMTPJoint);
        $mse->feelPalpationPIPJoint =  implode(",", $request->feelPalpationPIPJoint);
        $mse->feelPalpationDIPJoint =  implode(",", $request->feelPalpationDIPJoint);

        //true false
        $mse->feelPalpationMedialMalleolus = $request->feelPalpationMedialMalleolus;
        $mse->feelPalpationLateralMalleolus = $request->feelPalpationLateralMalleolus;
        //
        $mse->feelPalpationTenderOver = implode(",", $request->feelPalpationTenderOver);
        $mse->feelPalpationSwollenOver = implode(",", $request->feelPalpationSwollenOver);
        $mse->arteriaDorsalisPedisPluse = $request->arteriaDorsalisPedisPluse;

        $mse->planterAspectOfFoot = implode(",", $request->planterAspectOfFoot);

        $mse->feelPalpationNailSide = implode(",", $request->feelPalpationNailSide);
        $mse->feelPalpationNailNumber = implode(",", $request->feelPalpationNailNumber);
        $mse->feelPalpationNailSymptom = implode(",", $request->feelPalpationNailSymptom);

        //true
        $mse->feelPalpationTender = $request->feelPalpationTender;
        $mse->feelPalpationWarm = $request->feelPalpationWarm;
        $mse->feelPalpationPittingOedema = $request->feelPalpationPittingOedema;

        $mse->dorsiFlexionMove = implode(",", $request->dorsiFlexionMove);
        $mse->planterFlexionMove = implode(",", $request->planterFlexionMove);
        $mse->achilleTendonType = implode(",", $request->achilleTendonType);
        $mse->achilleTendon = implode(",", $request->achilleTendon);

        $mse->planterReflex = $request->planterReflex;
        $mse->ankleJerk = $request->ankleJerk;
        $mse->ankleS1 = $request->ankleS1;
        $mse->ankleL4 = $request->ankleL4;
        $mse->ankleL5 = $request->ankleL5;

        $mse->ankleHistoryValue = implode(",", $request->ankleHistoryValue);

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }
    public function hand_wrist_store(Request $request)
    {
        // return $request->all();

        $mse = new MhpMSHandAndWrist();
        $mse->patient_id = $request->patient_id;
        $mse->hand_wrist_ternary = $request->hand_wrist_ternary;
        $mse->wrist_Arr = implode(",", $request->wrist_Arr);
        $mse->distal_side_value = $request->distal_side_value;
        $mse->distal_number_value = $request->distal_number_value;
        $mse->distal_Arr = implode(",", $request->distal_Arr);
        $mse->metacarpophalangeal_side_value = $request->metacarpophalangeal_side_value;
        $mse->metacarpophalangeal_number_value = $request->metacarpophalangeal_number_value;
        $mse->metacarpophalangeal_Arr = implode(",", $request->metacarpophalangeal_Arr);
        $mse->nails_side_value = $request->nails_side_value;
        $mse->nails_number_value = $request->nails_number_value;
        $mse->nails_Arr = implode(",", $request->nails_Arr);
        $mse->proximal_side_value = $request->proximal_side_value;
        $mse->proximal_number_value = $request->proximal_number_value;
        $mse->proximal_Arr = implode(",", $request->proximal_Arr);
        $mse->dorsum_of_hand_value = $request->dorsum_of_hand_value;
        $mse->fingers_side_value = $request->fingers_side_value;
        $mse->fingers_number_value = $request->fingers_number_value;
        $mse->fingers_hand_Arr = implode(",", $request->fingers_hand_Arr);
        $mse->palpation_interphalangeal_side_value = $request->palpation_interphalangeal_side_value;
        $mse->palpation_interphalangeal_number_value = $request->palpation_interphalangeal_number_value;
        $mse->palpation_interphalangeal_Arr = implode(",", $request->palpation_interphalangeal_Arr);

        $mse->palpation_tenders_Arr = implode(",", $request->palpation_tenders_Arr);
        $mse->palpation_wrist_Arr = implode(",", $request->palpation_wrist_Arr);
        $mse->flexon_tendons_side_value = $request->flexon_tendons_side_value;
        $mse->flexon_tendons_number_value = $request->flexon_tendons_number_value;
        $mse->flexon_tendons_Arr = implode(",", $request->flexon_tendons_Arr);
        $mse->palpation_metacarpophalangeal_side_value = $request->palpation_metacarpophalangeal_side_value;
        $mse->palpation_metacarpophalangeal_number_value = $request->palpation_metacarpophalangeal_number_value;
        $mse->palpation_metacarpophalangeal_Arr = implode(",", $request->palpation_metacarpophalangeal_Arr);
        $mse->hand_movement_wrist_NR_ternary = $request->hand_movement_wrist_NR_ternary;
        $mse->hand_movement_finger = $request->hand_movement_finger;
        $mse->hand_movement_flexion_NR_ternary = $request->hand_movement_flexion_NR_ternary;
        $mse->hand_movement_extension_NR_ternary = $request->hand_movement_extension_NR_ternary;
        $mse->hand_movement_supination_NR_ternary = $request->hand_movement_supination_NR_ternary;
        $mse->hand_movement_pronation_NR_ternary = $request->hand_movement_pronation_NR_ternary;

        $mse->hand_movement_passive_flexion = $request->hand_movement_passive_flexion;
        $mse->hand_movement_Passive_Extension = $request->hand_movement_Passive_Extension;

        $mse->finkelstein_test_ternary = $request->finkelstein_test_ternary;
        $mse->wrish_flexion_test_PN_ternary = $request->wrish_flexion_test_PN_ternary;
        $mse->hand_murphy_sign_PN_ternary = $request->hand_murphy_sign_PN_ternary;
        $mse->handTinel_sign_PN_ternary = $request->handTinel_sign_PN_ternary;
        $mse->watson_test_PN_ternary = $request->watson_test_PN_ternary;
        $mse->sweater_finger_sign_PN_ternary = $request->sweater_finger_sign_PN_ternary;
        $mse->flexor_digitorum_profundus_test_value = $request->flexor_digitorum_profundus_test_value;
        $mse->flexor_digitorum_superficialis_test_value = $request->flexor_digitorum_superficialis_test_value;
        $mse->quervain_tenosynovitis_ternary = $request->quervain_tenosynovitis_ternary;

        $mse->handHistoryValue = implode(",", $request->handHistoryValue);

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }
    public function elbow_store(Request $request)
    {
        //  return $request->all();

        $mse = new MhpMSElbow();
        $mse->patient_id = $request->patient_id;
         $mse->elbow_joint_ternary = $request->elbow_joint_ternary;
        $mse->elbow_history_Arr = implode(",",$request->elbow_history_Arr) ;
        $mse->elbow_female_value = $request->elbow_female_value;
        $mse->elbow_male_value = $request->elbow_male_value;
        $mse->contractual_deformity_ternary = $request->contractual_deformity_ternary;
        $mse->soft_tissue_control_normal_ternary = $request->soft_tissue_control_normal_ternary;
        $mse->elbow_scars_ternary = $request->elbow_scars_ternary;
        $mse->swellings_ternary = $request->swellings_ternary;
        $mse->elbow_tenderness_ternary = $request->elbow_tenderness_ternary;
        $mse->elbow_crepitus_ternary = $request->elbow_crepitus_ternary;
        $mse->elbow_deformity_ternary = $request->elbow_deformity_ternary;

        $mse->elbow_muscle_wasting_ternary = $request->elbow_muscle_wasting_ternary;
        $mse->elbow_effussion_ternary = $request->elbow_effussion_ternary;
        $mse->at_flexion_Arr = implode(",",$request->at_flexion_Arr);
        $mse->at_full_flexion_Arr =implode(",",$request->at_full_flexion_Arr);
        $mse->elbow_exam_flextion_value = $request->elbow_exam_flextion_value;
        $mse->elbow_exam_flextion_number_value = $request->elbow_exam_flextion_number_value;
        $mse->elbow_exam_extention_value = $request->elbow_exam_extention_value;
        $mse->elbow_exam_extention_number_value = $request->elbow_exam_extention_number_value;
        $mse->elbow_exam_supination_value = $request->elbow_exam_supination_value;
        $mse->elbow_exam_supination_number_value = $request->elbow_exam_supination_number_value;
        $mse->elbow_exam_pronation_value = $request->elbow_exam_pronation_value;
        $mse->elbow_exam_pronation_number_value = $request->elbow_exam_pronation_number_value;

        $mse->elbowHistoryVal =implode(",",$request->elbowHistoryVal);

        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }


    public function shap_counter_store(Request $request)
    {
        $mse = new MhpMusculoSketalShoulderShapCounter();
        $mse->patient_id = $request->patient_id;
        $mse->shoulder_id = $request->shoulder_id;
        $mse->shap_counter_id = $request->shap_counter_id;
        $mse->value = $request->value;
        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }

    public function anterior_store(Request $request)
    {
        $mse = new MhpMusculoSketalShoulderAnteriorView();
        $mse->patient_id = $request->patient_id;
        $mse->shoulder_id = $request->shoulder_id;
        $mse->anterior_view_id = $request->anterior_view_id;
        $mse->value = $request->value;
        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }


    public function resisted_movement_store(Request $request)
    {
        $mse = new MhpMusculoSketalShoulderResistedMovement();
        $mse->patient_id = $request->patient_id;
        $mse->shoulder_id = $request->shoulder_id;
        $mse->resisted_movement_id = $request->resisted_movement_id;
        $mse->value = $request->value;
        $mse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'mse' => $mse
        ]);
    }
}
