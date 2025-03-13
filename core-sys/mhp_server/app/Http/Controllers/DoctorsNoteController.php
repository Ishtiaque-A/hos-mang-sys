<?php

namespace App\Http\Controllers;

use App\Models\DoctorsNote;
use App\Models\MHPAdvise;
use App\Models\MhpAppointmentScheduler;
use App\Models\MhpGreatDocReson;
use App\Models\MhpPastHistory;
use App\Models\MhpPatientSymptomAnatomy;
use App\Models\MhpRx;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DoctorsNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $doctorsNotes = DoctorsNote::orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'note' => $doctorsNotes,
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
        $exist = DoctorsNote::where('appointment_id', $request->appointment_id)->first();
        if ($exist) {
            $exist->note = $exist->note . ' ' . $request->note;
            $exist->update();
            return response()->json([
                'status' => 200,
                'message' => 'Note Added Successfully',
            ]);
        }

        $doctorsNote = new DoctorsNote();
        $doctorsNote->note = $request->note;
        $doctorsNote->appointment_id = $request->appointment_id;
        $doctorsNote->doctor_id = $request->doctor_id;
        $doctorsNote->patient_id = $request->patient_id;
        $doctorsNote->save();
        return response()->json([
            'status' => 200,
            'message' => 'Note Added Successfully',
        ]);
    }
    public function saveNoteFromNurse(Request $request)
    {
        $checkNow = date("Y-m-d");
        $appointment = MhpAppointmentScheduler::where('StartTime', 'LIKE', '%' . $checkNow . '%')
            ->where('patient_id', $request->patient_id)
            ->where('delete_status', 0)->get();
        if (count($appointment) > 0) {
            foreach ($appointment as $key => $value) {
                $doctorsNote = new DoctorsNote();
                $doctorsNote->note = $request->note;
                $doctorsNote->appointment_id = $value->id;
                $doctorsNote->doctor_id = $value->doctors_id;
                $doctorsNote->patient_id = $request->patient_id;
                $doctorsNote->save();
            }
        }
        return response()->json([
            'status' => 200,
            'message' => 'Note Added Successfully',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DoctorsNote  $doctorsNote
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $appointment = MhpAppointmentScheduler::find($id);
        $doctorsNotes = DoctorsNote::where('appointment_id', $id)
            ->select('id', 'note', 'appointment_id', 'created_at')
            ->first();
        $diagonosis =  MhpPastHistory::where('appointment_id', $id)
            ->pluck('condition')->toArray();
        $reason = MhpGreatDocReson::where('appointment_id', $id)
            ->pluck('reson_name')->toArray();
        $symptom = $appointment->media == 'App' ? json_decode($appointment->notes) : MhpPatientSymptomAnatomy::where('patient_id', $appointment->patient_id)
            ->whereDate('created_at', Carbon::today())
            ->pluck('symptoms')->toArray();

        $drugs = MhpRx::where('appointment_id', $id)
            ->select('repeats', 'quantity', 'prn', 'frequency', 'dose', 'drug_name', 'brand_name', 'appointment_id', 'Complex_instruction')
            ->get();
        $advice = MHPAdvise::where(['doctor_id' => $appointment->doctors_id, 'check' => 1])
            ->pluck('advise_name')->toArray();
        return response()->json([
            'status' => 200,
            'note' => $doctorsNotes,
            'diagonosis' => implode(', ', $diagonosis),
            'reason' => implode(', ', $reason),
            'symptom' =>  is_array($symptom) ? implode(', ', $symptom) : $symptom,
            'medicine' => count($drugs) > 0 ? $drugs : false,
            'advice' => implode(', <br> ', $advice),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DoctorsNote  $doctorsNote
     * @return \Illuminate\Http\Response
     */
    public function edit(DoctorsNote $doctorsNote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DoctorsNote  $doctorsNote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $exist = DoctorsNote::where('appointment_id', $id)->first();
        if ($exist) {
            $exist->note = $request->note;
            $exist->update();
            return response()->json([
                'status' => 200,
                'message' => 'Note Added Successfully',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DoctorsNote  $doctorsNote
     * @return \Illuminate\Http\Response
     */
    public function destroy(DoctorsNote $doctorsNote)
    {
        //
    }
}
