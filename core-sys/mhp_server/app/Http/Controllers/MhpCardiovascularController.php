<?php

namespace App\Http\Controllers;

use App\Models\mhp_cardiovascular;
use App\Models\MhpCardiovascularHistory;
use App\Models\MhpCardiovascularOther;
use Illuminate\Http\Request;

class MhpCardiovascularController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function cardivascular_data($id)
    {
        $history = mhp_cardiovascular::where('patient_id', $id)
            ->orderBy('created_at', 'DESC')->first();

        return response()->json([
            'status' => 200,
            'message' => 'Data get Successfully',
            'history' => $history
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
        // return $request->all();
        $cardiovascular = new mhp_cardiovascular();
        $cardiovascular->patient_id = $request->patient_id;

        $cardiovascular->cardiovascular_history = $request->cardiovascular_history;
        $cardiovascular->dyspnea = $request->dyspnea;
        $cardiovascular->riskfector = $request->riskfector;

        $cardiovascular->Ankle_oedema_Right = $request->Ankle_oedema_Right;
        $cardiovascular->Ankle_oedema_left = $request->Ankle_oedema_left;

        $cardiovascular->brachial_Right = $request->brachial_Right;
        $cardiovascular->brachial_left = $request->brachial_left;
        $cardiovascular->dorsalis_pedis_Right = $request->dorsalis_pedis_Right;
        $cardiovascular->dorsalis_pedis_left = $request->dorsalis_pedis_left;
        $cardiovascular->femoral_Right = $request->femoral_Right;
        $cardiovascular->femoral_left = $request->femoral_left;
        $cardiovascular->is_ajr = $request->is_ajr;
        $cardiovascular->is_calf_tenderness = $request->is_calf_tenderness;
        $cardiovascular->is_pacemaker_box = $request->is_pacemaker_box;
        $cardiovascular->is_radio_factory_delay = $request->is_radio_factory_delay;
        $cardiovascular->is_trendelenburg_test = $request->is_trendelenburg_test;
        $cardiovascular->is_varicose_veins = $request->is_varicose_veins;
        $cardiovascular->jvp = $request->jvp;
        $cardiovascular->notes = $request->notes;
        $cardiovascular->popliteal_Right = $request->popliteal_Right;
        $cardiovascular->popliteal_left = $request->popliteal_left;
        $cardiovascular->posterior_tibialis_Right = $request->posterior_tibialis_Right;
        $cardiovascular->posterior_tibialis_left = $request->posterior_tibialis_left;
        $cardiovascular->radial_Right = $request->radial_Right;
        $cardiovascular->radial_left = $request->radial_left;
        $cardiovascular->carotid_bruit = $request->carotid_bruit;
        $cardiovascular->apex_beat = $request->apex_beat;
        $cardiovascular->intercostal_space = $request->intercostal_space;
        $cardiovascular->heart_sound = $request->heart_sound;
        $cardiovascular->murmur = $request->murmur;
        $cardiovascular->volume = $request->volume;
        $cardiovascular->radiations = $request->radiations;

        $cardiovascular->save();

        return response()->json([
            'status' => 200,
            'message' => 'Cardiovascular Inserted Successfully',
            'cardiovascular' => $cardiovascular
        ]);
    }

    public function save_cardivascular_other(Request $request)
    {
        // $Others = $request->all();

        $Others = new MhpCardiovascularOther();
        $Others->patient_id = $request->patient_id;
        $Others->cardiovascular_id = $request->cardiovascular_id;
        $Others->other_id = $request->other_id;
        $Others->value = $request->value;
        $Others->save();

        return response()->json([
            'status' => 200,
            'message' => 'Others Inserted Successfully',
            'Others' => $Others
        ]);
    }


    public function save_cardivascular_history(Request $request)
    {
        // $Others = $request->all();

        $history = new MhpCardiovascularHistory();
        $history->patient_id = $request->patient_id;
        $history->cardiovascular_id = $request->cardiovascular_id;
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
     * @param  \App\Models\mhp_cardiovascular  $mhp_cardiovascular
     * @return \Illuminate\Http\Response
     */
    public function show(mhp_cardiovascular $mhp_cardiovascular)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\mhp_cardiovascular  $mhp_cardiovascular
     * @return \Illuminate\Http\Response
     */
    public function edit(mhp_cardiovascular $mhp_cardiovascular)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\mhp_cardiovascular  $mhp_cardiovascular
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, mhp_cardiovascular $mhp_cardiovascular)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\mhp_cardiovascular  $mhp_cardiovascular
     * @return \Illuminate\Http\Response
     */
    public function destroy(mhp_cardiovascular $mhp_cardiovascular)
    {
        //
    }
}
