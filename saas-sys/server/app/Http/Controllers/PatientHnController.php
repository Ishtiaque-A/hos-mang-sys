<?php

namespace App\Http\Controllers;

use App\Models\PatientHn;
use Illuminate\Http\Request;

class PatientHnController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     $hn = PatientHn::max('hn');
    //     if ($hn) {
    //         $generate = $hn + 1;
    //     } else {
    //         $generate = 1000000001;
    //     }
    //     $patient_hn_generate = "HN-{$generate}";
    //     PatientHn::create([
    //         'hn' => $patient_hn_generate
    //     ]);
    //     return response()->json([
    //         'status' => 200,
    //         'hn_number' => $patient_hn_generate,
    //     ]);
    // }
    public function index()
    {
        $hn = PatientHn::max('hn');

        if ($hn) {
            // Extract the numeric part by removing the "HN-" prefix and increment it
            $numericPart = (int)str_replace('HN-', '', $hn);
            $generate = $numericPart + 1;
        } else {
            $generate = 1000000001;
        }

        $patient_hn_generate = "HN-" . str_pad($generate, 10, '0', STR_PAD_LEFT);

        PatientHn::create([
            'hn' => $patient_hn_generate
        ]);

        return response()->json([
            'status' => 200,
            'hn_number' => $patient_hn_generate,
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
        PatientHn::create([
            'hn' => $request->hn
        ]);
        return response()->json([
            'status' => 200,
            'message' => 'Patient HN created successfully'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PatientHn  $patientHn
     * @return \Illuminate\Http\Response
     */
    public function show(PatientHn $patientHn)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PatientHn  $patientHn
     * @return \Illuminate\Http\Response
     */
    public function edit(PatientHn $patientHn)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PatientHn  $patientHn
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PatientHn $patientHn)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PatientHn  $patientHn
     * @return \Illuminate\Http\Response
     */
    public function destroy(PatientHn $patientHn)
    {
        //
    }
}
