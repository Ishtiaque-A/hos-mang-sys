<?php

namespace App\Http\Controllers;

use App\Models\MhpGenitoUrinary;
use App\Models\MhpGenitoUrinaryHistory;
use Illuminate\Http\Request;

class MhpGenitoUrinaryController extends Controller
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
        $genito = new MhpGenitoUrinary();
        $genito->patient_id = $request->patient_id;
        $genito->Genito_History =implode(",",$request->Genito_History); 
        $genito->renalMass = $request->renalMass;
        $genito->tenderness = $request->tenderness;
        $genito->renalBruit = $request->renalBruit;
        $genito->aboveMargin = $request->aboveMargin;
        $genito->noUpperBorder = $request->noUpperBorder;
        $genito->translucent = $request->translucent;
        $genito->separation = $request->separation;
   
        $genito->rectalExaminationPostion = $request->rectalExaminationPostion;
        $genito->rectalExamination = $request->rectalExamination;
        
        $genito->hydrocele = $request->hydrocele;
        $genito->testicularSwelling = $request->testicularSwelling;
        $genito->testicularMass = $request->testicularMass;
        $genito->testicularTenderness = $request->testicularTenderness;
        $genito->retractedTestis = $request->retractedTestis;
        $genito->undescendedTestis = $request->undescendedTestis;
        $genito->penialWart = $request->penialWart;
        $genito->pearly = $request->pearly;
        $genito->inguinal = $request->inguinal;
        $genito->phimosis = $request->phimosis;
        $genito->paraphimosis = $request->paraphimosis;
        $genito->scrotal = $request->scrotal;
        $genito->leucocytes = $request->leucocytes;
        $genito->nitrites = $request->nitrites;
        $genito->bilirubin = $request->bilirubin;
        $genito->ketones = $request->ketones;
        $genito->urobiliongen = $request->urobiliongen;
        $genito->glucose = $request->glucose;
        $genito->specificGravity = $request->specificGravity;
        $genito->ph = $request->ph;
        $genito->color = $request->color;
        $genito->urineAnalysisAllNormal = $request->urineAnalysisAllNormal;
        $genito->scrotalTenderness = $request->scrotalTenderness;

        $genito->save();
        return response()->json([
            'status' => 200,
            'message' => 'genito Inserted Successfully',
            'genito' => $genito
        ]);
        // return $request->all();
    }

    public function save_genito_history(Request $request)
    {
        // $Others = $request->all();
        
        $history = new MhpGenitoUrinaryHistory();
        $history->patient_id = $request->patient_id;
        $history->genito_urinary_id = $request->genito_urinary_id;
        $history->history_id = $request->history_id;
        $history->value = $request->value;
        $history->save();

        return response()->json([
            'status' => 200,
            'message' => 'history Inserted Successfully',
            'history' => $history
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MhpGenitoUrinary  $mhpGenitoUrinary
     * @return \Illuminate\Http\Response
     */
    public function show(MhpGenitoUrinary $mhpGenitoUrinary)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpGenitoUrinary  $mhpGenitoUrinary
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpGenitoUrinary $mhpGenitoUrinary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpGenitoUrinary  $mhpGenitoUrinary
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpGenitoUrinary $mhpGenitoUrinary)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpGenitoUrinary  $mhpGenitoUrinary
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpGenitoUrinary $mhpGenitoUrinary)
    {
        //
    }
}
