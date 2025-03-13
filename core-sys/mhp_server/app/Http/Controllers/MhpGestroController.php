<?php

namespace App\Http\Controllers;

use App\Models\MhpGestro;
use App\Models\MhpGestroAbdomen;
use App\Models\MhpGestroHistory;
use Illuminate\Http\Request;

class MhpGestroController extends Controller
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
        
        $gestro = new MhpGestro();
        $gestro->patient_id = $request->patient_id;
        $gestro->Gestro_History = $request->Gestro_History;
        $gestro->Gestro_Abdomen = $request->Gestro_Abdomen;
        $gestro->skin = $request->skin;
        $gestro->hand_finger = $request->hand_finger;
        $gestro->tongue_mouth = $request->tongue_mouth;
        $gestro->gynaecomastia = $request->gynaecomastia;
        $gestro->Parotid_Glands_Enlarged = $request->Parotid_Glands_Enlarged;
        $gestro->Left_superclavicular_node = $request->Left_superclavicular_node;
        $gestro->site = $request->site;
        $gestro->radiation = $request->radiation;
        $gestro->pattern = $request->pattern;
        $gestro->duration = $request->duration;
        $gestro->frequency = $request->frequency;
        $gestro->score = $request->score;
        $gestro->vomiting = $request->vomiting;
        $gestro->dysphagia = $request->dysphagia;
        $gestro->diarrhoea = $request->diarrhoea;
        $gestro->constipation = $request->constipation;
        $gestro->habits = $request->habits;
        $gestro->stoolType = $request->stoolType;
        $gestro->PRBleed = $request->PRBleed;
        $gestro->bruit = $request->bruit;
        $gestro->murphy = $request->murphy;
        $gestro->noneTender = $request->noneTender;
        $gestro->noMasses = $request->noMasses;
       
        $gestro->tenderness = $request->tenderness;
        $gestro->mass = $request->mass;
        $gestro->umbillical = $request->umbillical;
     
        $gestro->incisional = $request->incisional;
        $gestro->inguinal = $request->inguinal;
        $gestro->femoral = $request->femoral;
        $gestro->perRectal = $request->perRectal;
        $gestro->sigmoidoscopy = $request->sigmoidoscopy;
        $gestro->guaiac = $request->guaiac;

        $gestro->save();

        return response()->json([
            'status' => 200,
            'message' => 'gestro Inserted Successfully',
            'gestro' => $gestro
        ]);
    }

    public function save_gestro_history(Request $request)
    {
         $history = new MhpGestroHistory();
         $history->patient_id = $request->patient_id;
         $history->gestro_id = $request->gestro_id;
         $history->history_id = $request->history_id;
         $history->value = $request->value;
        $history->save();

        return response()->json([
            'status' => 200,
            'message' => 'history Inserted Successfully',
            'history' => $history
        ]);
     
    }

    public function save_gestro_abdomen(Request $request)
    {
       //  return $request->all();

         $history = new MhpGestroAbdomen();
         $history->patient_id = $request->patient_id;
         $history->gestro_id = $request->gestro_id;
         $history->abdomen_id = $request->abdomen_id;
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
     * @param  \App\Models\MhpGestro  $mhpGestro
     * @return \Illuminate\Http\Response
     */
    public function show(MhpGestro $mhpGestro)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MhpGestro  $mhpGestro
     * @return \Illuminate\Http\Response
     */
    public function edit(MhpGestro $mhpGestro)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MhpGestro  $mhpGestro
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MhpGestro $mhpGestro)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MhpGestro  $mhpGestro
     * @return \Illuminate\Http\Response
     */
    public function destroy(MhpGestro $mhpGestro)
    {
        //
    }
}
