<?php

namespace App\Http\Controllers\GreatDoc\CareSuggestion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpGreatDocCareSuggestion;
use App\Models\MhpPastObservation;

class GreatDocCareSuggesionController extends Controller
{
    public function store(Request $request)
    {


        $care_suggestion = new MhpGreatDocCareSuggestion();
        $care_suggestion->patient_id = $request->patient_id;
        $care_suggestion->care_suggestion_id = implode(',', $request->care_suggestion_id);
        $care_suggestion->care_details_id = implode(',', $request->care_details_id);
        $care_suggestion->save();

        return response()->json(['status' => 200, 'message' => 'Care Suggestion Added Successfully']);
    }
    public function show($id)
    {
        $care_suggestion = MhpGreatDocCareSuggestion::where('patient_id', $id)->get();

        return response()->json(['status' => 200, 'message' => 'All Care Suggestion', 'data'=>$care_suggestion]);
    }
    public function destroy($id)
    {
        $care_suggestion = MhpGreatDocCareSuggestion::find($id);
        $care_suggestion->delete();

        return response()->json(['status' => 200, 'message' => 'Care Suggestion Deleted Successfully', 'data'=>$care_suggestion]);
    }
    public function saveObserbation(Request $request)
    {
        $past_O = new MhpPastObservation();
        $past_O->patient_id = $request->patient_id;
        $past_O->date = $request->date;
        $past_O->pulse = $request->pulse;
        $past_O->route = $request->route;
        $past_O->bp_sitting_left = $request->bp_sitting_left;
        $past_O->bp_sitting_right = $request->bp_sitting_right;
        $past_O->bp_standing_left = $request->bp_standing_left;
        $past_O->bp_standing_right = $request->bp_standing_right;
        $past_O->bp_lying_left = $request->bp_lying_left;
        $past_O->bp_lying_right = $request->bp_lying_right;
        $past_O->res_rate = $request->res_rate;
        $past_O->sat = $request->sat;
        $past_O->temp = $request->temp;
        $past_O->type = $request->type;
        $past_O->weight = $request->weight;
        $past_O->height = $request->height;
        $past_O->waist = $request->waist;
        $past_O->hip = $request->hip;
        $past_O->chest_insp = $request->chest_insp;
        $past_O->chest_exp = $request->chest_exp;
        $past_O->bsl = $request->bsl;
        $past_O->bsl_right_select = $request->bsl_right_select;
        $past_O->save();

        return response()->json(['status' => 200, 'message' => 'Past Observation Added Successfully']);
    }
}
