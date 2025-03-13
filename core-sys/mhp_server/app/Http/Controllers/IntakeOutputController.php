<?php

namespace App\Http\Controllers;

use App\Models\IntakeOutput;
use App\Models\IntakeOutputDetails;
use Illuminate\Http\Request;
use Carbon\Carbon;

class IntakeOutputController extends Controller
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
        $date = $request->date;
        $formattedDate = Carbon::parse($date)->toDateString();
        $exist = IntakeOutput::where('admission_id', $request->admission_id)
            ->whereDate('date', $formattedDate)
            ->first();
        if (!$exist) {
            $data = new IntakeOutput();
            $data->patient_id = $request->patient_id;
            $data->doctor_id = $request->doctor_id;
            $data->appointment_id = $request->appointment_id;
            $data->admission_id = $request->admission_id;
            $data->date = $request->date;
            $data->save();
        }
        $detail = new IntakeOutputDetails();
        $detail->intake_output_id = $exist ? $exist->id : $data->id;
        $detail->date = $request->date;
        $detail->time = $request->inputTime;
        $detail->oral = $request->oral;
        $detail->ivFluid = $request->ivFluid;
        $detail->injection = $request->injection;
        $detail->totalIntake = $request->totalIntake;
        $detail->outputTime = $request->outputTime;
        $detail->urine = $request->urine;
        $detail->drain = $request->drain;
        $detail->drain_two = $request->drain_two;
        $detail->drain_three = $request->drain_three;
        $detail->drain_four = $request->drain_four;
        $detail->vomit = $request->vomit;
        $detail->others = $request->others;
        $detail->totalOutput = $request->totalOutput;
        $detail->balance = $request->balance;
        $detail->save();
        return response()->json([
            'message' => 'Intake output saved successfully',
            'status' => 200
        ]);
    }

    public function getIntakeOutput(Request $request)
    {
        $date = $request->date;
        $formattedDate = Carbon::parse($date)->toDateString();

        $data = IntakeOutput::with('details')
            ->where('admission_id', $request->admission_id)
            ->whereDate('date', $formattedDate)
            ->first();

        if (!$data) {
            return response()->json([
                'message' => 'No data found',
                'status' => 404,
            ]);
        }

        // Sum input and output columns
        $input = $data->details->sum(
            fn($item) => ($item['injection'] ?? 0) + ($item['ivFluid'] ?? 0) + ($item['oral'] ?? 0)
        );

        $output = $data->details->sum(
            fn($item) => ($item['urine'] ?? 0) + ($item['drain'] ?? 0) + ($item['drain_two'] ?? 0) + ($item['drain_three'] ?? 0) + ($item['drain_four'] ?? 0) + ($item['vomit'] ?? 0) + ($item['others'] ?? 0)
        );

        $balance =   $input - $output;

        return response()->json([
            'data' => $data,
            'input' => $input,
            'output' => $output,
            'balance' => $balance,
            'status' => 200,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IntakeOutput  $intakeOutput
     * @return \Illuminate\Http\Response
     */
    public function show(IntakeOutput $intakeOutput)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\IntakeOutput  $intakeOutput
     * @return \Illuminate\Http\Response
     */
    public function edit(IntakeOutput $intakeOutput)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\IntakeOutput  $intakeOutput
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, IntakeOutput $intakeOutput)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IntakeOutput  $intakeOutput
     * @return \Illuminate\Http\Response
     */
    public function destroy(IntakeOutput $intakeOutput)
    {
        //
    }
}
