<?php

namespace App\Http\Controllers;

use App\Models\DischargeMedication;
use App\Models\DischargeSummary;
use App\Models\MhpAppointmentScheduler;
use App\Models\PatientAdmission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class DischargeSummaryController extends Controller
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
        $summary = new DischargeSummary();
        $summary->patient_id = $request->patient_id;
        $summary->doctor_id = $request->doctor_id;
        $summary->general_practitioner = $request->gpPractitioner;
        $summary->admission_date = $request->admissionDate;
        $summary->admitting_doctor = $request->admittingDoctor;
        $summary->admitting_doctor_phone = $request->admittingDoctorPhone;
        $summary->discharge_date = $request->dischargeDate;
        $summary->discharge_to = $request->dischargedTo;
        $summary->chief_complaint = $request->chiefCompliant;
        $summary->history = $request->history;
        $summary->diagnosis = $request->diagnosis;
        $summary->investigation = $request->investigation;
        $summary->operation_note = $request->operationNote;
        $summary->pain_relief = $request->painRelief;
        $summary->hygiene = $request->hygiene;
        $summary->exercise = $request->exercise;
        $summary->dressing = $request->dressing;
        $summary->wound_care = $request->woundCare;
        $summary->diet = $request->diet;
        $summary->recommendation = $request->recommendation;
        $summary->follow_up = $request->followUp;
        $summary->save();


        $rx = $request->rx;
        foreach ($rx as $key => $value) {
            $medication = new DischargeMedication();
            $medication->discharge_id = $summary->id;
            $medication->drug_name = $value['brand_name'];
            $medication->drug_id = $value['drug_id'];
            $medication->drug_description = $value['drug_name'];
            $medication->dose = $value['dose'];
            $medication->frequency = $value['frequency'];
            $medication->instruction = $value['extra_instruction'];
            $medication->prn = $value['prn'];
            $medication->qty = $value['quantity'];
            $medication->repeat = $value['repeats'];
            $medication->save();
        }
        $data = PatientAdmission::with('patient', 'specialist', 'department', 'doctor')->where('patient_id', $request->patient_id)->first();
        if ($data) {
            $data->status = 2;
            $data->save();
        }
        $appointment = MhpAppointmentScheduler::where(['patient_id' => $request->patient_id, 'status_name' => 'Arrived', 'app_type' => 'IPD'])->first();
        if ($appointment) {
            $appointment->status_name = 'Discharged';
            $appointment->save();
        }
        Config::set('database.connections.mysql.database', 'mhpdemocom');
        app('db')->purge();
        $user = User::where(['user_id' => $request->patient_id, 'organization_id' => $request->organization_id, 'user_type' => 'Patient'])->first();
        if ($user) {
            $user->discharge_date = $request->dischargeDate;
            $user->save();
        }
        return response(['message' => 'Discharge Summary created successfully', 'data' => $summary, 'extraData' => $data], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DischargeSummary  $dischargeSummary
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $summary = DischargeSummary::with('medication', 'patient', 'doctor', 'procedure')->where('patient_id', $id)->get();
        return response(['summary' => $summary], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DischargeSummary  $dischargeSummary
     * @return \Illuminate\Http\Response
     */
    public function edit(DischargeSummary $dischargeSummary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DischargeSummary  $dischargeSummary
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DischargeSummary $dischargeSummary)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DischargeSummary  $dischargeSummary
     * @return \Illuminate\Http\Response
     */
    public function destroy(DischargeSummary $dischargeSummary)
    {
        //
    }
}
