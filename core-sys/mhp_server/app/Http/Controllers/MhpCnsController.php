<?php

namespace App\Http\Controllers;

use App\Models\MhpCns;
use App\Models\MhpCnsCn1;
use App\Models\MhpCnsCn2;
use App\Models\MhpCnsCn3;
use App\Models\MhpCnsCn4;
use App\Models\MhpCnsCn5;
use App\Models\MhpCnsCn6;
use App\Models\MhpCnsCn7;
use App\Models\MhpCnsCn8;
use App\Models\MhpCnsPart1;
use App\Models\MhpCnsPart2;
use App\Models\MhpCnsUpperLimb;
use App\Models\MhpCnsVisualField;
use Illuminate\Http\Request;

class MhpCnsController extends Controller
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
        $cnsPart1 = new MhpCnsPart1();
        $cnsPart1->patient_id = $request->patient_id;
        $cnsPart1->CN_1 = $request->CN_1;
        $cnsPart1->CN_2 = $request->CN_2;
        $cnsPart1->CN_3 = $request->CN_3;
        $cnsPart1->CN_4 = $request->CN_4;
        $cnsPart1->CN_5 = $request->CN_5;
        $cnsPart1->CN_6 = $request->CN_6;
        $cnsPart1->CN_7 = $request->CN_7;
        $cnsPart1->CN_8 = $request->CN_8;
        $cnsPart1->CN_9 = $request->CN_9;
        $cnsPart1->olfactory = $request->olfactory;
        $cnsPart1->visualAcuity = $request->visualAcuity;
        $cnsPart1->visualAcuityDetail = $request->visualAcuityDetail;

        $cnsPart1->fundoscopy = $request->fundoscopy;
        $cnsPart1->fundoscopyDetail = $request->fundoscopyDetail;

        $cnsPart1->visualField = $request->visualField;
        $cnsPart1->papillary = $request->papillary;
        $cnsPart1->pupil = $request->pupil;
        $cnsPart1->light = $request->light;
        $cnsPart1->eyeMovement = $request->eyeMovement;
        $cnsPart1->sensory = $request->sensory;
        $cnsPart1->motor = $request->motor;
        $cnsPart1->force_to_shut_open_mouth = $request->force_to_shut_open_mouth;
        $cnsPart1->jaw = $request->jaw;
        $cnsPart1->drooping_corner_of_mouth = $request->drooping_corner_of_mouth;
        $cnsPart1->lookingUp = $request->lookingUp;
        $cnsPart1->on_shutting_eye = $request->on_shutting_eye;
        $cnsPart1->shrug_the_shoulder_trapezius = $request->shrug_the_shoulder_trapezius;
        $cnsPart1->neckMovement = $request->neckMovement;
        $cnsPart1->whisper_test = $request->whisper_test;
        $cnsPart1->wever_test = $request->wever_test;
        $cnsPart1->rinner_test = $request->rinner_test;
        $cnsPart1->hallpike_manoeuvre = $request->hallpike_manoeuvre;
        $cnsPart1->uvula = $request->uvula;
        $cnsPart1->posterior_third_of_tongue_sensation = $request->posterior_third_of_tongue_sensation;
        $cnsPart1->tongue = $request->tongue;
        $cnsPart1->diviation = $request->diviation;
        
        $cnsPart1->rashHerpesZoster = $request->rashHerpesZoster;
        $cnsPart1->firstNerve = $request->firstNerve;
        $cnsPart1->secondNerve = $request->secondNerve;
        $cnsPart1->thirdNerve = $request -> thirdNerve;
        $cnsPart1->fifthNerve = $request -> fifthNerve;
        $cnsPart1->seventhNerve = $request -> seventhNerve;
        $cnsPart1->eleventhNerve = $request -> eleventhNerve;
        $cnsPart1->eightNerve = $request -> eightNerve;
        $cnsPart1->ninthNerve = $request -> ninthNerve;
        $cnsPart1->twelfthNerve = $request -> twelfthNerve;
        $cnsPart1->gagReflex = $request -> gagReflex;
        $cnsPart1->save();

        return response()->json([
            'status' => 200,
            'message' => 'cns_part1 Inserted Successfully',
            'cns_part1' => $cnsPart1
        ]);

        // return $request->all();


        // $cnsPart2 = new MhpCnsPart2();
        // $cnsPart2->biceps_jesk = $request->biceps_jesk;
        // $cnsPart2->triceps_jesk = $request->triceps_jesk;
        // $cnsPart2->brachioradialis_jesk = $request->brachioradialis_jesk;
        // $cnsPart2->finger = $request->finger;
        // $cnsPart2->finger_nose_test = $request->finger_nose_test;
        // $cnsPart2->dysdiadochokinesis = $request->dysdiadochokinesis;
        // $cnsPart2->temparature = $request->temparature;
        // $cnsPart2->vibration = $request->vibration;
        // $cnsPart2->proprioception = $request->proprioception;
        // $cnsPart2->Pin_Prick_Testing = $request->Pin_Prick_Testing;
        // $cnsPart2->Light_Touch_Testing = $request->Light_Touch_Testing;
        // $cnsPart2->Picture_upper_limb_dermatomes = $request->Picture_upper_limb_dermatomes;
        // $cnsPart2->Picture_upper_limb_dermatomes_details = $request->Picture_upper_limb_dermatomes_details;
        // $cnsPart2->The_Radial_Nerve = $request->The_Radial_Nerve;
        // $cnsPart2->The_Ulnar_Nerve = $request->The_Ulnar_Nerve;
        // $cnsPart2->The_Median_Nerve = $request->The_Median_Nerve;

        // $cnsPart2->shoulder_left1 = $request->shoulder_left1;
        // $cnsPart2->shoulder_left2 = $request->shoulder_left2;
        // $cnsPart2->elbow_left1 = $request->elbow_left1;
        // $cnsPart2->elbow_left2 = $request->elbow_left2;
        // $cnsPart2->wrist_left1 = $request->wrist_left1;
        // $cnsPart2->wrist_left2 = $request->wrist_left2;

        // $cnsPart2->fingerFlexion_left = $request->fingerFlexion_left;
        // $cnsPart2->fingerExtension_left = $request->fingerExtension_left;
        // $cnsPart2->fingerAbduction_left = $request->fingerAbduction_left;
        // $cnsPart2->fingerAdduction_left = $request->fingerAdduction_left;

        // $cnsPart2->shoulder_right1 = $request->shoulder_right1;
        // $cnsPart2->shoulder_right2 = $request->shoulder_right2;
        // $cnsPart2->elbow_right1 = $request->elbow_right1;
        // $cnsPart2->elbow_right2 = $request->elbow_right2;
        // $cnsPart2->wrist_right1 = $request->wrist_right1;
        // $cnsPart2->wrist_right2 = $request->wrist_right2;

        // $cnsPart2->fingerFlexion_right = $request->fingerFlexion_right;
        // $cnsPart2->fingerExtension_right = $request->fingerExtension_right;
        // $cnsPart2->fingerAbduction_right = $request->fingerAbduction_right;
        // $cnsPart2->fingerAdduction_right = $request->fingerAdduction_right;

        // $cnsPart2->shoulder_reflexes1 = $request->shoulder_reflexes1;
        // $cnsPart2->shoulder_reflexes2 = $request->shoulder_reflexes2;
        // $cnsPart2->elbow_reflexes1 = $request->elbow_reflexes1;
        // $cnsPart2->elbow_reflexes2 = $request->elbow_reflexes2;
        // $cnsPart2->wrist_reflexes1 = $request->wrist_reflexes1;
        // $cnsPart2->wrist_reflexes2 = $request->wrist_reflexes2;

        // $cnsPart2->fingerFlexion_reflexes = $request->fingerFlexion_reflexes;
        // $cnsPart2->fingerExtension_reflexes = $request->fingerExtension_reflexes;
        // $cnsPart2->fingerAbduction_reflexes = $request->fingerAbduction_reflexes;
        // $cnsPart2->fingerAdduction_reflexes = $request->fingerAdduction_reflexes;

        // $cnsPart2->save();

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'cnsPart2 Inserted Successfully',
        //     'cnsPart2' => $cnsPart2
        // ]);
    }

    public function store_part2(Request $request)
    {

        $cnsPart2 = new MhpCnsPart2();
        $cnsPart2->biceps_jesk = $request->biceps_jesk;
        $cnsPart2->triceps_jesk = $request->triceps_jesk;
        $cnsPart2->brachioradialis_jesk = $request->brachioradialis_jesk;
        $cnsPart2->finger = $request->finger;
        $cnsPart2->finger_nose_test = $request->finger_nose_test;
        $cnsPart2->dysdiadochokinesis = $request->dysdiadochokinesis;
        $cnsPart2->temparature = $request->temparature;
        $cnsPart2->vibration = $request->vibration;
        $cnsPart2->proprioception = $request->proprioception;
        $cnsPart2->Pin_Prick_Testing = $request->Pin_Prick_Testing;
        $cnsPart2->Light_Touch_Testing = $request->Light_Touch_Testing;
        $cnsPart2->Picture_upper_limb_dermatomes = $request->Picture_upper_limb_dermatomes;
        $cnsPart2->Picture_upper_limb_dermatomes_details = $request->Picture_upper_limb_dermatomes_details;
        $cnsPart2->The_Radial_Nerve = $request->The_Radial_Nerve;
        $cnsPart2->The_Ulnar_Nerve = $request->The_Ulnar_Nerve;
        $cnsPart2->The_Median_Nerve = $request->The_Median_Nerve;

        $cnsPart2->shoulder_left1 = $request->shoulder_left1;
        $cnsPart2->shoulder_left2 = $request->shoulder_left2;
        $cnsPart2->elbow_left1 = $request->elbow_left1;
        $cnsPart2->elbow_left2 = $request->elbow_left2;
        $cnsPart2->wrist_left1 = $request->wrist_left1;
        $cnsPart2->wrist_left2 = $request->wrist_left2;

        $cnsPart2->fingerFlexion_left = $request->fingerFlexion_left;
        $cnsPart2->fingerExtension_left = $request->fingerExtension_left;
        $cnsPart2->fingerAbduction_left = $request->fingerAbduction_left;
        $cnsPart2->fingerAdduction_left = $request->fingerAdduction_left;

        $cnsPart2->shoulder_right1 = $request->shoulder_right1;
        $cnsPart2->shoulder_right2 = $request->shoulder_right2;
        $cnsPart2->elbow_right1 = $request->elbow_right1;
        $cnsPart2->elbow_right2 = $request->elbow_right2;
        $cnsPart2->wrist_right1 = $request->wrist_right1;
        $cnsPart2->wrist_right2 = $request->wrist_right2;

        $cnsPart2->fingerFlexion_right = $request->fingerFlexion_right;
        $cnsPart2->fingerExtension_right = $request->fingerExtension_right;
        $cnsPart2->fingerAbduction_right = $request->fingerAbduction_right;
        $cnsPart2->fingerAdduction_right = $request->fingerAdduction_right;

        $cnsPart2->shoulder_reflexes1 = $request->shoulder_reflexes1;
        $cnsPart2->shoulder_reflexes2 = $request->shoulder_reflexes2;
        $cnsPart2->elbow_reflexes1 = $request->elbow_reflexes1;
        $cnsPart2->elbow_reflexes2 = $request->elbow_reflexes2;
        $cnsPart2->wrist_reflexes1 = $request->wrist_reflexes1;
        $cnsPart2->wrist_reflexes2 = $request->wrist_reflexes2;

        $cnsPart2->fingerFlexion_reflexes = $request->fingerFlexion_reflexes;
        $cnsPart2->fingerExtension_reflexes = $request->fingerExtension_reflexes;
        $cnsPart2->fingerAbduction_reflexes = $request->fingerAbduction_reflexes;
        $cnsPart2->fingerAdduction_reflexes = $request->fingerAdduction_reflexes;

        $cnsPart2->save();

        return response()->json([
            'status' => 200,
            'message' => 'cnsPart2 Inserted Successfully',
            'cnsPart2' => $cnsPart2
        ]);
    }

    public function save_cns_upper_limb(Request $request)
    {
        $upperLimb = new MhpCnsUpperLimb();
        $upperLimb->patient_id = $request->patient_id;
        $upperLimb->cns_part2_id = $request->cns_part2_id;
        $upperLimb->upperlimb_id = $request->upperlimb_id;
        $upperLimb->value = $request->value;
        $upperLimb->save();

        return response()->json([
            'status' => 200,
            'message' => 'UpperLimb Inserted Successfully',
            'UpperLimb' => $upperLimb
        ]);
    }



    public function save_cns_cn1(Request $request)
    {
        $cn1 = new MhpCnsCn1();
        $cn1->patient_id = $request->patient_id;
        $cn1->cns_part1_id = $request->cns_part1_id;
        $cn1->cn1_id = $request->cn1_id;
        $cn1->value = $request->value;
        $cn1->save();

        return response()->json([
            'status' => 200,
            'message' => 'cn Inserted Successfully',
            'cn' => $cn1
        ]);
    }

    public function save_cns_cn2(Request $request)
    {
        $cn2 = new MhpCnsCn2();
        $cn2->patient_id = $request->patient_id;
        $cn2->cns_part1_id = $request->cns_part1_id;
        $cn2->cn2_id = $request->cn2_id;
        $cn2->value = $request->value;
        $cn2->save();

        return response()->json([
            'status' => 200,
            'message' => 'cn Inserted Successfully',
            'cn' => $cn2
        ]);
    }

    public function save_cns_cn3(Request $request)
    {
        $cn3 = new MhpCnsCn3();
        $cn3->patient_id = $request->patient_id;
        $cn3->cns_part1_id = $request->cns_part1_id;
        $cn3->cn3_id = $request->cn3_id;
        $cn3->value = $request->value;
        $cn3->save();

        return response()->json([
            'status' => 200,
            'message' => 'cn Inserted Successfully',
            'cn' => $cn3
        ]);
    }

    public function save_cns_cn4(Request $request)
    {
        $cn4 = new MhpCnsCn4();
        $cn4->patient_id = $request->patient_id;
        $cn4->cns_part1_id = $request->cns_part1_id;
        $cn4->cn4_id = $request->cn4_id;
        $cn4->value = $request->value;
        $cn4->save();

        return response()->json([
            'status' => 200,
            'message' => 'cn Inserted Successfully',
            'cn' => $cn4
        ]);
    }

    public function save_cns_cn5(Request $request)
    {
        $cn5 = new MhpCnsCn5();
        $cn5->patient_id = $request->patient_id;
        $cn5->cns_part1_id = $request->cns_part1_id;
        $cn5->cn5_id = $request->cn5_id;
        $cn5->value = $request->value;
        $cn5->save();

        return response()->json([
            'status' => 200,
            'message' => 'cn Inserted Successfully',
            'cn' => $cn5
        ]);
    }

    public function save_cns_cn6(Request $request)
    {
        $cn6 = new MhpCnsCn6();
        $cn6->patient_id = $request->patient_id;
        $cn6->cns_part1_id = $request->cns_part1_id;
        $cn6->cn6_id = $request->cn6_id;
        $cn6->value = $request->value;
        $cn6->save();

        return response()->json([
            'status' => 200,
            'message' => 'cn Inserted Successfully',
            'cn' => $cn6
        ]);
    }

    public function save_cns_cn7(Request $request)
    {
        $cn7 = new MhpCnsCn7();
        $cn7->patient_id = $request->patient_id;
        $cn7->cns_part1_id = $request->cns_part1_id;
        $cn7->cn7_id = $request->cn7_id;
        $cn7->value = $request->value;
        $cn7->save();

        return response()->json([
            'status' => 200,
            'message' => 'cn Inserted Successfully',
            'cn' => $cn7
        ]);
    }

    public function save_cns_cn8(Request $request)
    {
        $cn8 = new MhpCnsCn8();
        $cn8->patient_id = $request->patient_id;
        $cn8->cns_part1_id = $request->cns_part1_id;
        $cn8->cn8_id = $request->cn8_id;
        $cn8->value = $request->value;
        $cn8->save();

        return response()->json([
            'status' => 200,
            'message' => 'cn Inserted Successfully',
            'cn' => $cn8
        ]);
    }

    public function save_cns_visual_fields(Request $request)
    {
        $visualField = new MhpCnsVisualField();
        $visualField->patient_id = $request->patient_id;
        $visualField->cns_part1_id = $request->cns_part1_id;
        $visualField->visualField_id = $request->visualField_id;
        $visualField->value = $request->value;
        $visualField->save();

        return response()->json([
            'status' => 200,
            'message' => 'VisualField Inserted Successfully',
            'cn' => $visualField
        ]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpCns  $mhpCns
     * @return \Illuminate\Http\Response
     */
    public function show(MhpCns $mhpCns)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpCns  $mhpCns
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpCns $mhpCns)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpCns  $mhpCns
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpCns $mhpCns)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpCns  $mhpCns
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpCns $mhpCns)
    {
        //
    }
}
