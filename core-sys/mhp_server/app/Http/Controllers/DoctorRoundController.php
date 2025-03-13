<?php

namespace App\Http\Controllers;

use App\Models\Anaemic;
use App\Models\CVS;
use App\Models\Cyanosis;
use App\Models\DoctorRound;
use App\Models\DoctorRoundAbdomen;
use App\Models\DoctorRoundChest;
use App\Models\DoctorRoundCns;
use App\Models\DoctorRoundSkin;
use App\Models\Jaundiced;
use App\Models\Mucositis;
use App\Models\RadiologyResultParameter;
use App\Models\RoundDiabeticChart;
use App\Models\RoundDiabeticChartDetails;
use App\Models\RoundUrineResult;
use App\Models\SkinTurgor;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DoctorRoundController extends Controller
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
    // public function store(Request $request)
    // {
    //     $date = $request->date;
    //     $formattedDate = Carbon::parse($date)->toDateString();
    //     $exist = DoctorRound::where(['patient_id' => $request->patient_id, 'admission_id' => $request->admission_id])
    //         ->whereDate('date', $formattedDate)
    //         ->first();
    //     if (!$exist) {
    //         $data = new DoctorRound();
    //         $data->doctorId = $request->doctorId;
    //         $data->patient_id = $request->patient_id;
    //         $data->appointment_id = $request->appointment_id;
    //         $data->admission_id = $request->admission_id;
    //         $data->consultant_id = $request->consultant_id;
    //         $data->residentId = $request->residentId;
    //         $data->protocolId = $request->protocolId;
    //         $data->freshComplaint = $request->freshComplaint;
    //         $data->day = $request->day;
    //         $data->cycle = $request->cycle;
    //         $data->date = $request->date;

    //         // General
    //         $data->anaemic = $request->Anaemic;
    //         $data->jaundiced = $request->Jaundiced;
    //         $data->cyanosis = $request->Cyanosis;
    //         $data->skin_turgor = $request->Skin;
    //         $data->capillary_refill = $request->capillary_refill;
    //         $data->nail_sign = $request->nail_sign;
    //         $data->dehydration = $request->dehydration;
    //         $data->radio_femoral_delay = $request->radio_femoral_delay;
    //         $data->mucositis = $request->mucositis;
    //         $data->ecog_scale = $request->ecog_scale;
    //         $data->kps_scale = $request->kps_scale;
    //         $data->pathology_result = $request->pathology_result;
    //         $data->temperature = $request->temp;
    //         $data->o2_saturation = $request->o2saturation;
    //         $data->blood_sugar = $request->bloodSugar;
    //         $data->blood_sugar_type = $request->bloodSugarType;
    //         $data->pulse = $request->pulse;
    //         $data->respiratory_rate = $request->respiratoryRate;

    //         // Blood Pressure
    //         $data->bp_sitting_systolic = $request->sitting_left;
    //         $data->bp_sitting_diastolic = $request->sitting_right;
    //         $data->bp_standing_systolic = $request->standing_left;
    //         $data->bp_standing_diastolic = $request->standing_right;
    //         $data->bp_lying_systolic = $request->lying_left;
    //         $data->bp_lying_diastolic = $request->lying_right;

    //         // Measurements
    //         $data->weight = $request->weight;
    //         $data->height = $request->height;
    //         $data->body_surface_area = $request->body_surface_area;
    //         $data->bmi = $request->BMI;
    //         $data->waist_measurement = $request->waist_measurement;
    //         $data->hip_measurement = $request->hip_measurement;
    //         $data->whr = $request->WHR;
    //         $data->abdomen = $request->abdomen;
    //         $data->abdominal_guard = $request->abdominal_guard;
    //         $data->skin = $request->skin;
    //         $data->chest = $request->chest;
    //         $data->cns = $request->cns;
    //         $data->cvs = $request->cvs;
    //         $data->consultants_advice = $request->cns;

    //         $data->save();
    //     }
    //     else {

    //         $exist->doctorId = $request->doctorId;
    //         $exist->patient_id = $request->patient_id;
    //         $exist->appointment_id = $request->appointment_id;
    //         $exist->admission_id = $request->admission_id;
    //         $exist->consultant_id = $request->consultant_id;
    //         $exist->residentId = $request->residentId;
    //         $exist->protocolId = $request->protocolId;
    //         $exist->freshComplaint = $request->freshComplaint;
    //         $exist->day = $request->day;
    //         $exist->cycle = $request->cycle;
    //         $exist->date = $request->date;

    //         // General
    //         $exist->anaemic = $request->Anaemic;
    //         $exist->jaundiced = $request->Jaundiced;
    //         $exist->cyanosis = $request->Cyanosis;
    //         $exist->skin_turgor = $request->Skin;
    //         $exist->capillary_refill = $request->capillary_refill;
    //         $exist->nail_sign = $request->nail_sign;
    //         $exist->dehydration = $request->dehydration;
    //         $exist->radio_femoral_delay = $request->radio_femoral_delay;
    //         $exist->mucositis = $request->mucositis;
    //         $exist->ecog_scale = $request->ecog_scale;
    //         $exist->kps_scale = $request->kps_scale;
    //         $exist->pathology_result = $request->pathology_result;
    //         $exist->temperature = $request->temp;
    //         $exist->o2_saturation = $request->o2saturation;
    //         $exist->blood_sugar = $request->bloodSugar;
    //         $exist->blood_sugar_type = $request->bloodSugarType;
    //         $exist->pulse = $request->pulse;
    //         $exist->respiratory_rate = $request->respiratoryRate;

    //         // Blood Pressure
    //         $exist->bp_sitting_systolic = $request->sitting_left;
    //         $exist->bp_sitting_diastolic = $request->sitting_right;
    //         $exist->bp_standing_systolic = $request->standing_left;
    //         $exist->bp_standing_diastolic = $request->standing_right;
    //         $exist->bp_lying_systolic = $request->lying_left;
    //         $exist->bp_lying_diastolic = $request->lying_right;

    //         // Measurements
    //         $exist->weight = $request->weight;
    //         $exist->height = $request->height;
    //         $exist->body_surface_area = $request->body_surface_area;
    //         $exist->bmi = $request->BMI;
    //         $exist->waist_measurement = $request->waist_measurement;
    //         $exist->hip_measurement = $request->hip_measurement;
    //         $exist->whr = $request->WHR;
    //         $exist->abdomen = $request->abdomen;
    //         $exist->abdominal_guard = $request->abdominal_guard;
    //         $exist->skin = $request->skin;
    //         $exist->chest = $request->chest;
    //         $exist->cns = $request->cns;
    //         $exist->cvs = $request->cvs;
    //         $exist->consultants_advice = $request->cns;

    //         $exist->save();
    //     }

    //     return response()->json([
    //         'message' => 'Data saved successfully',
    //         'status' => 200,
    //     ]);
    // }
    public function store(Request $request)
    {
        // return $request->residentId;
        $fieldMapping = [
            'doctorId' => 'doctorId',
            'patient_id' => 'patient_id',
            'appointment_id' => 'appointment_id',
            'admission_id' => 'admission_id',
            'consultant_id' => 'consultant_id',
            'residentId' => 'residentId',
            'protocolId' => 'protocolId',
            'freshComplaint' => 'freshComplaint',
            'day' => 'day',
            'cycle' => 'cycle',
            'date' => 'date',
            // General
            'Anaemic' => 'anaemic',
            'Jaundiced' => 'jaundiced',
            'Cyanosis' => 'cyanosis',
            'Skin' => 'skin_turgor',
            'capillary_refill' => 'capillary_refill',
            'nail_sign' => 'nail_sign',
            'dehydration' => 'dehydration',
            'radio_femoral_delay' => 'radio_femoral_delay',
            'mucositis' => 'mucositis',
            'ecog_scale' => 'ecog_scale',
            'kps_scale' => 'kps_scale',
            'pathology_result' => 'pathology_result',
            'temp' => 'temperature',
            'o2saturation' => 'o2_saturation',
            'bloodSugar' => 'blood_sugar',
            'bloodSugarType' => 'blood_sugar_type',
            'pulse' => 'pulse',
            'respiratoryRate' => 'respiratory_rate',
            // Blood Pressure
            'sitting_left' => 'bp_sitting_systolic',
            'sitting_right' => 'bp_sitting_diastolic',
            'standing_left' => 'bp_standing_systolic',
            'standing_right' => 'bp_standing_diastolic',
            'lying_left' => 'bp_lying_systolic',
            'lying_right' => 'bp_lying_diastolic',
            // Measurements
            'weight' => 'weight',
            'height' => 'height',
            'body_surface_area' => 'body_surface_area',
            'BMI' => 'bmi',
            'waist_measurement' => 'waist_measurement',
            'hip_measurement' => 'hip_measurement',
            'WHR' => 'whr',
            'abdomen' => 'abdomen',
            'abdominal_guard' => 'abdominal_guard',
            'skin' => 'skin',
            'chest' => 'chest',
            'cns' => 'cns',
            'cvs' => 'cvs',
            'consultants_advice' => 'consultants_advice'
        ];

        // Create a new record
        $data = new DoctorRound();
        foreach ($fieldMapping as $requestField => $dbField) {
            if ($request->has($requestField) && $request->$requestField) {
                $data->$dbField = $request->$requestField;
            }
        }

        $data->save();
        return response()->json([
            'message' => 'Data saved successfully',
            'status' => 200,
        ]);
    }

    public function todaysRound(Request $request)
    {
        $date = $request->date;
        $formattedDate = Carbon::parse($date)->toDateString();

        // Check if record exists
        $data = DoctorRound::where([
            'patient_id' => $request->patient_id,
            'admission_id' => $request->admission_id
        ])->whereDate('date', $formattedDate)->first();

        return response()->json([
            'data' => $data,
            'status' => 200
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DoctorRound  $doctorRound
     * @return \Illuminate\Http\Response
     */
    public function getPatientsAllRound($id)
    {
        $data = DoctorRound::with('doctor', 'protocol', 'resident', 'patient', 'admission', 'drugSince', 'intakeOutput', 'urineResult')->where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json([
            'data' => $data,
            'status' => 200
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DoctorRound  $doctorRound
     * @return \Illuminate\Http\Response
     */
    public function edit(DoctorRound $doctorRound)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DoctorRound  $doctorRound
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DoctorRound $doctorRound)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DoctorRound  $doctorRound
     * @return \Illuminate\Http\Response
     */
    public function destroy(DoctorRound $doctorRound)
    {
        //
    }


    // All setup 

    public function setup()
    {
        $anaemic = Anaemic::latest()->get();
        $jaundiced = Jaundiced::latest()->get();
        $cyanosis = Cyanosis::latest()->get();
        $skinTurgor = SkinTurgor::latest()->get();
        $mucositis = Mucositis::latest()->get();
        $cvs  = CVS::latest()->get();
        $skin = DoctorRoundSkin::latest()->get();
        $abdomen = DoctorRoundAbdomen::latest()->get();
        $chest = DoctorRoundChest::latest()->get();
        $cns = DoctorRoundCns::latest()->get();
        $radiology = RadiologyResultParameter::latest()->get();

        return response()->json([
            'message' => 'All setup successfully',
            'anaemic' => $anaemic,
            'jaundiced' => $jaundiced,
            'cyanosis' => $cyanosis,
            'skinTurgor' => $skinTurgor,
            'mucositis' => $mucositis,
            'cvs' => $cvs,
            'skin' => $skin,
            'abdomen' => $abdomen,
            'chest' => $chest,
            'cns' => $cns,
            'radiology' => $radiology,
        ]);
    }
    public function urineResultSave(Request $request)
    {
        $data = new RoundUrineResult();
        $data->patient_id = $request->patient_id;
        $data->doctor_id = $request->doctor_id;
        $data->appointment_id = $request->appointment_id;
        $data->admission_id = $request->admission_id;
        $data->leucocyte = $request->leucocyte;
        $data->ketones = $request->ketones;
        $data->specific_gravity = $request->specific_gravity;
        $data->nitrites = $request->nitrites;
        $data->urobilinogen = $request->urobilinogen;
        $data->ph = $request->ph;
        $data->bilirubin = $request->bilirubin;
        $data->glucose = $request->glucose;
        $data->color = $request->color;
        $data->protein = $request->protein;
        $data->date = $request->date;
        $data->save();
        return response()->json([
            'message' => 'Urine result saved successfully',
            'status' => 200

        ]);
    }
    public function diabeticChartSave(Request $request)
    {
        $data = new RoundDiabeticChart();
        $data->patient_id = $request->patient_id;
        $data->doctor_id = $request->doctor_id;
        $data->appointment_id = $request->appointment_id;
        $data->admission_id = $request->admission_id;
        $data->date = $request->date;
        $data->save();
        $arr = $request->details;
        foreach ($arr as $key => $value) {
            $details = new RoundDiabeticChartDetails();
            $details->admission_id = $request->admission_id;
            $details->patient_id = $request->patient_id;
            $details->appointment_id = $request->appointment_id;
            $details->date = $request->date;
            $details->chart_id = $data->id;
            $details->time = $value['time'];
            $details->name = $value['name'];
            $details->result = $value['result'];
            $details->insulin_type = $value['insulin_type'];
            $details->insulin_unit = $value['insulin_unit'];
            $details->food = $value['food'];
            $details->signature = $value['signature'];
            $details->parameter_id = $value['id'];
            $details->save();
        }
        return response()->json([
            'message' => 'Diabetic chart saved successfully',
            'status' => 200
        ]);
    }

    public function diabeticChartShow($patient_id)
    {
        // Fetch the main diabetic chart by ID
        // $chart = RoundDiabeticChart::find($patient_id);
        $charts = RoundDiabeticChart::with(['doctor', 'details'])->where('patient_id', $patient_id)->get();

        // Fetch the details related to this chart
        // $details = RoundDiabeticChartDetails::where('chart_id', $patient_id)->get();

        // Combine the chart and details in a response
        return response()->json([
            'message' => 'Diabetic chart retrieved successfully',
            'status' => 200,
            'data' => [
                'charts' => $charts,

            ]
        ]);
    }

    public function UrineResulttShow($patient_id)
    {
        // Fetch the main diabetic chart by ID
        // $chart = RoundDiabeticChart::find($patient_id);
        $results = RoundUrineResult::with(['doctor'])->where('patient_id', $patient_id)->get();

        // Fetch the details related to this chart
        // $details = RoundDiabeticChartDetails::where('chart_id', $patient_id)->get();

        // Combine the chart and details in a response
        return response()->json([
            'message' => 'Diabetic chart retrieved successfully',
            'status' => 200,
            'data' => [
                'results' => $results,
            ]
        ]);
    }
}
