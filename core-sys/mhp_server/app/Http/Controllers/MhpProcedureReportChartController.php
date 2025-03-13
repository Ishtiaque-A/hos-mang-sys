<?php

namespace App\Http\Controllers;

use App\Models\MhpProcedureReportChart;
use App\Models\User;
use Illuminate\Http\Request;

class MhpProcedureReportChartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $procedureReport = MhpProcedureReportChart::with('doctor', 'patient')->where('patient_id', $id)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'report' => $procedureReport
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
        // return $request ->all();
        $procedureChartName = new MhpProcedureReportChart();
        $procedureChartName->post_operative = $request->post_operative;
        $procedureChartName->incision = $request->incision;
        $procedureChartName->drain = $request->drain;
        $procedureChartName->blood_loss = $request->blood_loss;
        $procedureChartName->observation = $request->observation;
        $procedureChartName->diet = $request->diet;
        $procedureChartName->analgesia = $request->analgesia;
        $procedureChartName->dvt_prop = $request->dvt_prop;
        $procedureChartName->antibiotics_two = $request->antibiotics_two;
        $procedureChartName->item_number = $request->item_numbers;
        $procedureChartName->indication = $request->indicateee;
        $procedureChartName->procedure = $request->proceduree;
        $procedureChartName->findings = $request->findings;
        $procedureChartName->process = $request->processs;
        $procedureChartName->antibiotics = $request->antibiotics;
        $procedureChartName->pathology = $request->pathology;
        $procedureChartName->discharge = $request->discharge;
        $procedureChartName->followUp = $request->followup;

        $procedureChartName->process_details = $request->processDetails;
        $procedureChartName->patient_position = $request->patientPosition;
        $procedureChartName->ward = $request->ward;
        $procedureChartName->bed = $request->bed;
        $procedureChartName->anesthetist = $request->anesthetist;
        $procedureChartName->signed_by = $request->signedBy;
        $procedureChartName->surgeon = $request->surgeon;
        $procedureChartName->department = $request->department;
        $procedureChartName->doctor_id = $request->doctor_id;
        $procedureChartName->patient_id = $request->patient_id;
        $procedureChartName->assistant_surgeon = $request->assistantSurgeon;
        $procedureChartName->anesthesia = $request->anesthesia;
        $procedureChartName->procedure_date = $request->procedureDate;

        $procedureChartName->save();

        return response()->json([
            'status' => 200,
            'message' => 'Procedure Chart Name Inserted Successfully',
            'procedureChartName' => $procedureChartName,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpProcedureReportChart  $mhpProcedureReportChart
     * @return \Illuminate\Http\Response
     */
    public function show(MhpProcedureReportChart $mhpProcedureReportChart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpProcedureReportChart  $mhpProcedureReportChart
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpProcedureReportChart $mhpProcedureReportChart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpProcedureReportChart  $mhpProcedureReportChart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpProcedureReportChart $mhpProcedureReportChart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpProcedureReportChart  $mhpProcedureReportChart
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpProcedureReportChart $mhpProcedureReportChart)
    {
        //
    }
}
