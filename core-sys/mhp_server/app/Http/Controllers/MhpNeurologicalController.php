<?php

namespace App\Http\Controllers;

use App\Models\MhpCnsPart2;
use App\Models\MhpNeurological;
use App\Models\MhpNeurologicalFrontalLobe;
use App\Models\MhpNeurologicalHistoriy;
use App\Models\MhpNeurologicalOccipitalLobe;
use App\Models\MhpNeurologicalParietalLobe;
use App\Models\MhpNeurologicalSpeech;
use App\Models\MhpNeurologicalTemporalLobe;
use App\Models\NeurologyLowerLimb;
use App\Models\NeurologyLowerLimb2nd;

use Illuminate\Http\Request;

class MhpNeurologicalController extends Controller
{
    public function store(Request $request)
    {
        $nurological = new MhpNeurological();
        $nurological->patient_id = $request->patient_id;
        $nurological->intermittent = $request->intermittent;
        $nurological->continuous = $request->continuous;

        $nurological->historyValue = $request->historyValue;
        $nurological->speechValue = $request->speechValue;
        $nurological->parietal = $request->parietal;
        $nurological->occipital = $request->occipital;
        $nurological->frontal = $request->frontal;
        $nurological->temporal = $request->temporal;
        $nurological->save();


        $upperLimp = new MhpCnsPart2();
        $upperLimp->biceps_jesk = $request->biceps_jesk;
        $upperLimp->triceps_jesk = $request->triceps_jesk;
        $upperLimp->brachioradialis_jesk = $request->brachioradialis_jesk;
        $upperLimp->finger = $request->finger;
        $upperLimp->finger_nose_test = $request->finger_nose_test;
        $upperLimp->dysdiadochokinesis = $request->dysdiadochokinesis;
        $upperLimp->temparature = $request->temparature;
        $upperLimp->vibration = $request->vibration;
        $upperLimp->proprioception = $request->proprioception;
        $upperLimp->Pin_Prick_Testing = $request->Pin_Prick_Testing;
        $upperLimp->Light_Touch_Testing = $request->Light_Touch_Testing;
        $upperLimp->Picture_upper_limb_dermatomes = $request->Picture_upper_limb_dermatomes;
        $upperLimp->Picture_upper_limb_dermatomes_details = $request->Picture_upper_limb_dermatomes_details;
        $upperLimp->The_Radial_Nerve = $request->The_Radial_Nerve;
        $upperLimp->The_Ulnar_Nerve = $request->The_Ulnar_Nerve;
        $upperLimp->The_Median_Nerve = $request->The_Median_Nerve;

        $upperLimp->shoulder_left1 = $request->shoulder_left1;
        $upperLimp->shoulder_left2 = $request->shoulder_left2;
        $upperLimp->elbow_left1 = $request->elbow_left1;
        $upperLimp->elbow_left2 = $request->elbow_left2;
        $upperLimp->wrist_left1 = $request->wrist_left1;
        $upperLimp->wrist_left2 = $request->wrist_left2;


        $upperLimp->fingerSide = $request->fingerSide;
        $upperLimp->fingerNth = $request->fingerNth;
        $upperLimp->fingerSide1 = $request->fingerSide1;
        $upperLimp->fingerNth1 = $request->fingerNth1;
        $upperLimp->fingerSide2 = $request->fingerSide2;
        $upperLimp->fingerNth2 = $request->fingerNth2;

        $upperLimp->fingerFlexion_left = $request->fingerFlexion_left;
        $upperLimp->fingerExtension_left = $request->fingerExtension_left;
        $upperLimp->fingerAbduction_left = $request->fingerAbduction_left;
        $upperLimp->fingerAdduction_left = $request->fingerAdduction_left;

        $upperLimp->shoulder_right1 = $request->shoulder_right1;
        $upperLimp->shoulder_right2 = $request->shoulder_right2;
        $upperLimp->elbow_right1 = $request->elbow_right1;
        $upperLimp->elbow_right2 = $request->elbow_right2;
        $upperLimp->wrist_right1 = $request->wrist_right1;
        $upperLimp->wrist_right2 = $request->wrist_right2;

        $upperLimp->fingerFlexion_right = $request->fingerFlexion_right;
        $upperLimp->fingerExtension_right = $request->fingerExtension_right;
        $upperLimp->fingerAbduction_right = $request->fingerAbduction_right;
        $upperLimp->fingerAdduction_right = $request->fingerAdduction_right;

        $upperLimp->shoulder_reflexes1 = $request->shoulder_reflexes1;
        $upperLimp->shoulder_reflexes2 = $request->shoulder_reflexes2;
        $upperLimp->elbow_reflexes1 = $request->elbow_reflexes1;
        $upperLimp->elbow_reflexes2 = $request->elbow_reflexes2;
        $upperLimp->wrist_reflexes1 = $request->wrist_reflexes1;
        $upperLimp->wrist_reflexes2 = $request->wrist_reflexes2;

        $upperLimp->fingerFlexion_reflexes = $request->fingerFlexion_reflexes;
        $upperLimp->fingerExtension_reflexes = $request->fingerExtension_reflexes;
        $upperLimp->fingerAbduction_reflexes = $request->fingerAbduction_reflexes;
        $upperLimp->fingerAdduction_reflexes = $request->fingerAdduction_reflexes;


        $upperLimp->upperLimbValue = $request->upperLimbValue;
        $upperLimp->power = $request->power;
        $upperLimp->pictureUperLimbValue = $request->pictureUperLimbValue;
        $upperLimp->bicepsRight = $request->bicepsRight;
        $upperLimp->tricepsRight = $request->tricepsRight;
        $upperLimp->jeskRight = $request->jeskRight;
        $upperLimp->fingerRight = $request->fingerRight;

        $upperLimp->lesion = $request->lesion;

        $upperLimp->save();

        $lowerLimp = new NeurologyLowerLimb();
        $lowerLimp->patient_id = $request->patient_id;
        $lowerLimp->lowerlimbTemp = $request->lowerlimbTemp;
        $lowerLimp->hip1 = $request->hip1;
        $lowerLimp->hip2 = $request->hip2;
        $lowerLimp->knee1 = $request->knee1;
        $lowerLimp->knee2 = $request->knee2;
        $lowerLimp->ankle1 = $request->ankle1;
        $lowerLimp->ankle2 = $request->ankle2;
        $lowerLimp->fingerFlexionLower = $request->fingerFlexionLower;
        $lowerLimp->fingerExtensionLower = $request->fingerExtensionLower;
        $lowerLimp->fingerAbductionLower = $request->fingerAbductionLower;
        $lowerLimp->fingerAdductionLower = $request->fingerAdductionLower;
        $lowerLimp->fingerNthLower = $request->fingerNthLower;
        $lowerLimp->fingerSideLower = $request->fingerSideLower;
        $lowerLimp->hipRight1 = $request->hipRight1;
        $lowerLimp->hipRight2 = $request->hipRight2;
        $lowerLimp->kneeRight1 = $request->kneeRight1;
        $lowerLimp->kneeRight2 = $request->kneeRight2;
        $lowerLimp->ankleRight1 = $request->ankleRight1;
        $lowerLimp->ankleRight2 = $request->ankleRight2;
        $lowerLimp->fingerFlexionLowerRight = $request->fingerFlexionLowerRight;
        $lowerLimp->fingerExtensionLowerRight = $request->fingerExtensionLowerRight;
        $lowerLimp->fingerAbductionLowerRight = $request->fingerAbductionLowerRight;
        $lowerLimp->fingerAdductionLowerRight = $request->fingerAdductionLowerRight;
        $lowerLimp->fingerNthLowerRight = $request->fingerNthLowerRight;
        $lowerLimp->fingerSideLowerRight = $request->fingerSideLowerRight;
        $lowerLimp->hipReflexes1 = $request->hipReflexes1;
        $lowerLimp->hipReflexes2 = $request->hipReflexes2;
        $lowerLimp->kneeReflexes1 = $request->kneeReflexes1;
        $lowerLimp->kneeReflexes2 = $request->kneeReflexes2;
        $lowerLimp->ankleReflexes1 = $request->ankleReflexes1;
        $lowerLimp->ankleReflexes2 = $request->ankleReflexes2;
        $lowerLimp->fingerFlexionLowerReflexes = $request->fingerFlexionLowerReflexes;
        $lowerLimp->fingerExtensionLowerReflexes = $request->fingerExtensionLowerReflexes;
        $lowerLimp->fingerAbductionLowerReflexes = $request->fingerAbductionLowerReflexes;
        $lowerLimp->fingerAdductionLowerReflexes = $request->fingerAdductionLowerReflexes;
        $lowerLimp->fingerNthLowerReflexes = $request->fingerNthLowerReflexes;
        $lowerLimp->fingerSideLowerReflexes = $request->fingerSideLowerReflexes;
        $lowerLimp->vibrationLowerLimb = $request->vibrationLowerLimb;
        $lowerLimp->proprioceptionLowerLimb = $request->proprioceptionLowerLimb;
        $lowerLimp->pinLowerLimb = $request->pinLowerLimb;
        $lowerLimp->lightLowerLimb = $request->lightLowerLimb;
        $lowerLimp->peripheralLowerLimb = $request->peripheralLowerLimb;
        $lowerLimp->peripheralLowerLimbValuve = $request->peripheralLowerLimbValuve;
        $lowerLimp->redialLowerLimb = $request->redialLowerLimb;
        $lowerLimp->ulnarLowerLimb = $request->ulnarLowerLimb;
        $lowerLimp->medianLowerLimb = $request->medianLowerLimb;
        $lowerLimp->lesionLowerLimb = $request->lesionLowerLimb;

        $lowerLimp->lowerLimbValue = $request->lowerLimbValue;
        $lowerLimp->pictureLowerLimbValue = $request->pictureLowerLimbValue;
        $lowerLimp->lowerLimbpower = $request->lowerLimbpower;

        $lowerLimp->save();

        $lowerlimb2nd = new NeurologyLowerLimb2nd();
        $lowerlimb2nd->lowerKneeJerk = $request->lowerKneeJerk;
        $lowerlimb2nd->lowerKneeJerkRight = $request->lowerKneeJerkRight;
        $lowerlimb2nd->lowerAnkleJerk = $request->lowerAnkleJerk;
        $lowerlimb2nd->lowerAnkleJerkRight = $request->lowerAnkleJerkRight;
        $lowerlimb2nd->lowerPlanterReflex = $request->lowerPlanterReflex;
        $lowerlimb2nd->lowerPlanterReflexRight = $request->lowerPlanterReflexRight;
        $lowerlimb2nd->lowerHeelShin = $request->lowerHeelShin;
        $lowerlimb2nd->lowerToeFinger = $request->lowerToeFinger;
        $lowerlimb2nd->lowerFootTapping = $request->lowerFootTapping;
        $lowerlimb2nd->lowerFemoralNerve = $request->lowerFemoralNerve;
        $lowerlimb2nd->lowerSciaticNerve = $request->lowerSciaticNerve;
        $lowerlimb2nd->lowerCommonNerve = $request->lowerCommonNerve;
        $lowerlimb2nd->lowerRombergTest = $request->lowerRombergTest;
        $lowerlimb2nd->lowerHeelToeWaking = $request->lowerHeelToeWaking;
        $lowerlimb2nd->save();

        return response()->json([
            'status' => 200,
            'message' => 'nurological Inserted Successfully',
            'nurological' => $nurological,
            'upperLimp' => $upperLimp,
            'lowerLimp' => $lowerLimp,
            'lowerlimb2nd' => $lowerlimb2nd
        ]);
    }
}
