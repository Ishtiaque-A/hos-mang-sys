<?php

namespace App\Http\Controllers;

use App\Models\EyeGlassPrescription;
use App\Models\MhpEyeExamiPart1;
use App\Models\MhpEyeExamiPart2;
use App\Models\MhpEyePart1ExternalObservation;
use App\Models\MhpEyePart1PhoriaOne;
use App\Models\MhpEyePart1PhoriaTwo;
use App\Models\MhpEyePart1Pursuit;
use App\Models\MhpEyePart1Worth4Dot;
use Illuminate\Http\Request;

class MhpEyeExaminationController extends Controller
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
        $eye_part1 = new MhpEyeExamiPart1();
        $eye_part1->patient_id = $request->Part1['patient_id'];
        $eye_part1->Eye_External_Observation = implode(",", $request->Part1['Eye_External_Observation']);
        $eye_part1->Eye_Phoria = implode(",", $request->Part1['Eye_Phoria']);
        $eye_part1->Eye_Eso_Phoria = implode(",", $request->Part1['Eye_Eso_Phoria']);
        $eye_part1->Eye_Pursuits = implode(",", $request->Part1['Eye_Pursuits']);
        $eye_part1->distance = $request->Part1['distance'];
        $eye_part1->near = $request->Part1['near'];
        $eye_part1->flashes = $request->Part1['flashes'];
        $eye_part1->floaters = $request->Part1['floaters'];
        $eye_part1->red = $request->Part1['red'];
        $eye_part1->sore = $request->Part1['sore'];
        $eye_part1->itchy = $request->Part1['itchy'];
        $eye_part1->watery = $request->Part1['watery'];
        $eye_part1->discharge = $request->Part1['discharge'];
        $eye_part1->headache = $request->Part1['headache'];
        $eye_part1->normal = $request->Part1['normal'];
        $eye_part1->murcusGunn = $request->Part1['murcusGunn'];
        $eye_part1->rapd = $request->Part1['rapd'];
        $eye_part1->neuroOpthal = $request->Part1['neuroOpthal'];
        $eye_part1->doubleVision = $request->Part1['doubleVision'];
        $eye_part1->flare = $request->Part1['flare'];
        $eye_part1->ghosting = $request->Part1['ghosting'];
        $eye_part1->haloes = $request->Part1['haloes'];
        $eye_part1->caruncle = $request->Part1['caruncle'];
        $eye_part1->convergence = $request->Part1['convergence'];
        $eye_part1->visualAcuityDistance_left = $request->Part1['visualAcuityDistance_left'];
        $eye_part1->visualAcuityDistance_right = $request->Part1['visualAcuityDistance_right'];
        $eye_part1->visualAcuityNear_left = $request->Part1['visualAcuityNear_left'];
        $eye_part1->visualAcuityNear_right = $request->Part1['visualAcuityNear_right'];
        $eye_part1->sizeRight = $request->Part1['sizeRight'];
        $eye_part1->sizeLeft = $request->Part1['sizeLeft'];
        $eye_part1->shape = $request->Part1['shape'];
        $eye_part1->lesion1 = $request->Part1['lesion1'];
        $eye_part1->lesion2 = $request->Part1['lesion2'];
        $eye_part1->lesion3 = $request->Part1['lesion3'];
        $eye_part1->anteriorChamber = $request->Part1['anteriorChamber'];
        $eye_part1->swollenEyeLid = $request->Part1['swollenEyeLid'];
        $eye_part1->save();



        $eye_part2 = new MhpEyeExamiPart2();
        $eye_part2->patient_id = $request->Part2['patient_id'];
        $eye_part2->Eye_Worth = implode(",", $request->Part2['Eye_Worth']);;
        $eye_part2->enteranceTest = $request->Part2['enteranceTest'];
        $eye_part2->visualAcuity = $request->Part2['visualAcuity'];
        $eye_part2->coverTest = $request->Part2['coverTest'];
        $eye_part2->convergence = $request->Part2['convergence'];
        $eye_part2->Pupils = $request->Part2['Pupils'];
        $eye_part2->accomodation = $request->Part2['accomodation'];
        $eye_part2->dryRetinoscopy = $request->Part2['dryRetinoscopy'];
        $eye_part2->maddox_wing_fcc = $request->Part2['maddox_wing_fcc'];
        $eye_part2->maddox_wing_bPlus = $request->Part2['maddox_wing_bPlus'];
        $eye_part2->worth_4_Dot_midline = $request->Part2['worth_4_Dot_midline'];
        $eye_part2->worth_4_Dot_side = $request->Part2['worth_4_Dot_side'];
        $eye_part2->penGrip = $request->Part2['penGrip'];
        $eye_part2->penGripSide = $request->Part2['penGripSide'];
        $eye_part2->colorVision = $request->Part2['colorVision'];
        $eye_part2->stereopsis = $request->Part2['stereopsis'];
        $eye_part2->suppression = $request->Part2['suppression'];
        $eye_part2->neuroOpthal2 = $request->Part2['neuroOpthal2'];
        $eye_part2->dem1 = $request->Part2['dem1'];
        $eye_part2->dem2 = $request->Part2['dem2'];
        $eye_part2->dem3 = $request->Part2['dem3'];
        $eye_part2->perla = $request->Part2['perla'];
        $eye_part2->rapd2 = $request->Part2['rapd2'];
        $eye_part2->save();

        return response()->json([
            "status" => 200,
            'message' => "Eye data save sucessfully",
            "eyePart1" => $eye_part1,
            "eyePart2" => $eye_part2,
        ]);
        // return $request->all();
    }

    public function save_eye_part1_externalObservation(Request $request)
    {
        // return $request->all();
        $externalObsevation = new MhpEyePart1ExternalObservation();
        $externalObsevation->patient_id = $request->patient_id;
        $externalObsevation->eye_exmi_part1_id = $request->eye_exmi_part1_id;
        $externalObsevation->externalObservation_id = $request->externalObservation_id;
        $externalObsevation->value = $request->value;
        $externalObsevation->save();

        return response()->json([
            "status" => 200,
            "externalObsevation" => $externalObsevation,
        ]);
    }

    public function save_eye_part1_phoria_one(Request $request)
    {
        // return $request->all();
        $externalObsevation = new MhpEyePart1PhoriaOne();
        $externalObsevation->patient_id = $request->patient_id;
        $externalObsevation->eye_exmi_part1_id = $request->eye_exmi_part1_id;
        $externalObsevation->phoria_one_id = $request->phoria_one_id;
        $externalObsevation->value = $request->value;
        $externalObsevation->save();

        return response()->json([
            "status" => 200,
            "PhoriaOne" => $externalObsevation,
        ]);
    }

    public function save_eye_part1_phoria_two(Request $request)
    {
        // return $request->all();
        $externalObsevation = new MhpEyePart1PhoriaTwo();
        $externalObsevation->patient_id = $request->patient_id;
        $externalObsevation->eye_exmi_part1_id = $request->eye_exmi_part1_id;
        $externalObsevation->phoria_two_id = $request->phoria_two_id;
        $externalObsevation->value = $request->value;
        $externalObsevation->save();

        return response()->json([
            "status" => 200,
            "PhoriaTwo" => $externalObsevation,
        ]);
    }

    public function save_eye_part1_pursuits(Request $request)
    {
        // return $request->all();
        $externalObsevation = new MhpEyePart1Pursuit();
        $externalObsevation->patient_id = $request->patient_id;
        $externalObsevation->eye_exmi_part1_id = $request->eye_exmi_part1_id;
        $externalObsevation->pursuits_id = $request->pursuits_id;
        $externalObsevation->value = $request->value;
        $externalObsevation->save();

        return response()->json([
            "status" => 200,
            "pursuits" => $externalObsevation,
        ]);
    }

    public function save_eye_part1_Worth4Dot(Request $request)
    {
        // return $request->all();
        $externalObsevation = new MhpEyePart1Worth4Dot();
        $externalObsevation->patient_id = $request->patient_id;
        $externalObsevation->eye_exmi_part1_id = $request->eye_exmi_part1_id;
        $externalObsevation->worth4_dots_id = $request->worth4_dots_id;
        $externalObsevation->value = $request->value;
        $externalObsevation->save();

        return response()->json([
            "status" => 200,
            "worth4_dots" => $externalObsevation,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function saveEyeInvoice(Request $request)
    {
        $data = new EyeGlassPrescription();
        $data->prescription_no = EyeGlassPrescription::max('prescription_no') > 1 ? EyeGlassPrescription::max('prescription_no') + 1 : 1001;
        $data->patient_id = $request->patient_id;
        $data->doctor_id = $request->doctor_id;
        $data->appointment_id = $request->appointment_id;
        $data->lens = $request->lens;
        $data->multifocal = $request->multifocal;
        $data->instruction = $request->instruction;
        $data->dist_left = $request->dist_left;
        $data->dist_right = $request->dist_right;
        $data->near_left = $request->near_left;
        $data->near_right = $request->near_right;
        $data->near_pd_left = $request->near_pd_left;
        $data->near_pd_right = $request->near_pd_right;
        $data->dist_pd_right = $request->dist_pd_right;
        $data->dist_pd_left = $request->dist_pd_left;
        $data->save();
        return response()->json([
            "status" => 200,
            "message" => "Saved successfully",
            "test" => $data
        ]);
    }
    public function eyeGlassPrescription($id)
    {
        $data =  EyeGlassPrescription::with('doctor', 'patient')->where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "Saved successfully",
            "prescription" => $data
        ]);
    }
}
