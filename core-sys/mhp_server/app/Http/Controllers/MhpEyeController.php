<?php

namespace App\Http\Controllers;

use App\Models\MhpEye;
use App\Models\MhpEye2nd;
use App\Models\MhpGeneral;
use Illuminate\Http\Request;
use DB;

class MhpEyeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $history = DB::table("mhp_eyes")
            ->join('mhp_eye2nds', 'mhp_eyes.patient_id', '=', 'mhp_eye2nds.patient_id')
            ->where('mhp_eyes.patient_id', $id)
            ->get();
        return response()->json([
            "status" => 200,
            "message" => "Eye data",
            "data" =>  $history
        ]);
    }
    public function eyeDataPrescription($id, $app_id)
    {
        $eyeData = DB::table("mhp_eyes")
            ->join('mhp_eye2nds', 'mhp_eyes.patient_id', '=', 'mhp_eye2nds.patient_id')
            ->where(['mhp_eyes.patient_id' => $id, 'mhp_eyes.appointment_id' => $app_id])
            ->orderBy('mhp_eyes.id', 'desc')
            ->first();
        $generalData = MhpGeneral::where(['patient_id' => $id, 'appointment_id' => $app_id])->orderBy('id', 'desc')->first();
        return response()->json([
            "status" => 200,
            "message" => "Eye data",
            "eye" =>  $eyeData,
            "general" =>  $generalData,
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
        $data = new MhpEye();
        $data->patient_id = $request->patient_id;
        $data->appointment_id = $request->appointment_id;
        $data->eye_History = $request->eye_History; //arr
        $data->externalObservation = $request->externalObservation; //obj
        $data->trailFramed = $request->trailFramed;

        $data->contractLens = $request->contractLens; // obj
        $data->contractLensInfoRight = $request->contractLensInfoRight; // obj
        $data->contractLensInfoLeft = $request->contractLensInfoLeft; // obj
        $data->ancillaryTestInfo = $request->ancillaryTestInfo; // obj
        $data->ancillaryTestImportExport = $request->ancillaryTestImportExport; // arr
        $data->posteriorEye = $request->posteriorEye; // arr
        $data->posteriorEyeCheckbox = $request->posteriorEyeCheckbox; // arr
        $data->posteriorEyeShapeRight = $request->posteriorEyeShapeRight; // obj
        $data->posteriorEyeShapeLeft = $request->posteriorEyeShapeLeft; // obj
        $data->posteriorEyeStartTime = $request->posteriorEyeStartTime;
        $data->posteriorEyeEndTime = $request->posteriorEyeEndTime;
        $data->posteriorEyeComment = $request->posteriorEyeComment;
        $data->kRight1 = $request->kRight1;
        $data->kRightD1 = $request->kRightD1;
        $data->kRightD3 = $request->kRightD3;
        $data->kRightD2 = $request->kRightD2;
        $data->kRightAt1 = $request->kRightAt1;
        $data->kRightAt2 = $request->kRightAt2;
        $data->kRightCly = $request->kRightCly;
        $data->kRightClyAt = $request->kRightClyAt;
        $data->kLeft1 = $request->kLeft1;
        $data->kLeft2 = $request->kLeft2;
        $data->kLeft3 = $request->kLeft3;
        $data->kLeftD1 = $request->kLeftD1;
        $data->kLeftD3 = $request->kLeftD3;
        $data->kLeftD2 = $request->kLeftD2;
        $data->kLeftAt1 = $request->kLeftAt1;
        $data->kLeftAt2 = $request->kLeftAt2;
        $data->kLeftCly = $request->kLeftCly;
        $data->kLeftClyAt = $request->kLeftClyAt;
        $data->previousSpectaclesValue1 = $request->previousSpectaclesValue1; //obj
        $data->previousSpectaclesValue2 = $request->previousSpectaclesValue2; //obj
        $data->previousSpectaclesValue3 = $request->previousSpectaclesValue3; //obj
        $data->UCVARightDistance = $request->UCVARightDistance;
        $data->UCVARightNear = $request->UCVARightNear;
        $data->UCVALeftNear = $request->UCVALeftNear;
        $data->UCVALeftDistance = $request->UCVALeftDistance;
        $data->UCVAOUDistance = $request->UCVAOUDistance;
        $data->UCVAOUNear = $request->UCVAOUNear;
        $data->pinholeRightDistance = $request->pinholeRightDistance;
        $data->pinholeRightNear = $request->pinholeRightNear;
        $data->pinholeOUNear = $request->pinholeOUNear;
        $data->pinholeOUDistance = $request->pinholeOUDistance;
        $data->pinholeLeftDistance = $request->pinholeLeftDistance;
        $data->pinholeLeftNear = $request->pinholeLeftNear;

        $data->coverDistancePhoria = $request->coverDistancePhoria;
        $data->coverDistanceTropia = $request->coverDistanceTropia;
        $data->coverDistanceTropiaSide = $request->coverDistanceTropiaSide;
        $data->coverDistanceTropiaType = $request->coverDistanceTropiaType;
        $data->coverNearPhoria = $request->coverNearPhoria;
        $data->coverNearTropia = $request->coverNearTropia;
        $data->coverNearTropiaSide = $request->coverNearTropiaSide;
        $data->coverNearTropiaType = $request->coverNearTropiaType;
        $data->eomType =  $request->eomType; //arr
        $data->isSaccades = $request->isSaccades;
        $data->saccades = $request->saccades; //arr
        $data->eomValue = $request->eomValue; //arr

        $data->intraOcularPressure = $request->intraOcularPressure; //arr
        $data->intraOcularPressureCheckbox = $request->intraOcularPressureCheckbox; //arr
        $data->intraOcularPressureLeftPre = $request->intraOcularPressureLeftPre;
        $data->intraOcularPressureLeftPost = $request->intraOcularPressureLeftPost;
        $data->intraOcularPressureRightPre = $request->intraOcularPressureRightPre;
        $data->intraOcularPressureRightPost = $request->intraOcularPressureRightPost;
        $data->intraOcularPressureStartTime = $request->intraOcularPressureStartTime;
        $data->intraOcularPressureEndTime = $request->intraOcularPressureEndTime;
        $data->pachymetryLeft = $request->pachymetryLeft;
        $data->pachymetryRight = $request->pachymetryRight;
        $data->eyeImage = $request->eyeImage; //  arr image
        $data->eyeRx = $request->eyeRx; // big obj
        $data->save();

        $info = new MhpEye2nd();
        $info->patient_id = $request->patient_id;
        $info->appointment_id = $request->appointment_id;
        $info->spectaclesFirstValue = $request->spectaclesFirstValue; //obj
        $info->spectaclesFirstRightValue = $request->spectaclesFirstRightValue; //obj
        $info->spectaclesSecondValue = $request->spectaclesSecondValue; //obj
        $info->spectaclesSecondRightValue = $request->spectaclesSecondRightValue; //obj
        $info->spectaclesThirdValue = $request->spectaclesThirdValue; //obj
        $info->spectaclesThirdRightValue = $request->spectaclesThirdRightValue; //obj
        $info->spectaclesFourthValue = $request->spectaclesFourthValue; //obj
        $info->spectaclesFourthRightValue = $request->spectaclesFourthRightValue; //obj
        $info->spectaclesFifthValue = $request->spectaclesFifthValue; //obj
        $info->spectaclesFifthRightValue = $request->spectaclesFifthRightValue; //obj
        $info->spectaclesSixthValue = $request->spectaclesSixthValue; //obj
        $info->spectaclesSixthRightValue = $request->spectaclesSixthRightValue; //obj
        $info->spectaclesSeventhValue = $request->spectaclesSeventhValue; //obj
        $info->spectaclesSeventhRightValue = $request->spectaclesSeventhRightValue; //obj

        $info->pupilsRight = $request->pupilsRight;
        $info->pupilsLeft = $request->pupilsLeft;
        $info->pupilsTypeRight = $request->pupilsTypeRight; //arr
        $info->pupilsTypeLeft = $request->pupilsTypeLeft; //arr
        $info->pupilsLeftValue = $request->pupilsLeftValue;
        $info->pupilsRightValue = $request->pupilsRightValue;
        $info->pupilsRightShape = $request->pupilsRightShape; //obj
        $info->pupilsLeftShape = $request->pupilsLeftShape; //obj
        $info->imageSitLamp = $request->imageSitLamp; //image big        
        $info->sitLamp = $request->sitLamp;
        $info->gonioscopy = $request->gonioscopy;
        $info->gonioscopyVanHarrik = $request->gonioscopyVanHarrik;

        $info->imageGonioscopy = $request->imageGonioscopy; // Image big        
        $info->gonioscopyShapeRightS = $request->gonioscopyShapeRightS; //arr
        $info->gonioscopyShapeRightN = $request->gonioscopyShapeRightN; //arr
        $info->gonioscopyShapeRightI = $request->gonioscopyShapeRightI; //arr
        $info->gonioscopyShapeRightC = $request->gonioscopyShapeRightC; //arr
        $info->gonioscopyShapeRightT = $request->gonioscopyShapeRightT; //arr
        $info->gonioscopyShapeLeftS = $request->gonioscopyShapeLeftS; //arr
        $info->gonioscopyShapeLeftN = $request->gonioscopyShapeLeftN; //arr
        $info->gonioscopyShapeLeftT = $request->gonioscopyShapeLeftT; //arr
        $info->gonioscopyShapeLeftI = $request->gonioscopyShapeLeftI; //arr
        $info->gonioscopyShapeLeftC = $request->gonioscopyShapeLeftC; //arr

        $info->save();
        return response()->json([
            "status" => 200,
            "message" => "Eye data added Successfully",
            "data1st" => $data,
            "data2nd" => $info
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpEye  $mhpEye
     * @return \Illuminate\Http\Response
     */
    public function show(MhpEye $mhpEye)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpEye  $mhpEye
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpEye $mhpEye)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpEye  $mhpEye
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpEye $mhpEye)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpEye  $mhpEye
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpEye $mhpEye)
    {
        //
    }
}
