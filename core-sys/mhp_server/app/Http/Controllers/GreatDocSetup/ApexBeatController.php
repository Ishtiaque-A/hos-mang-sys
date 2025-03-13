<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpApexBeat;
use App\Models\MhpSelectionCriteria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApexBeatController extends Controller
{
    //

    public function index()
    {
        $apex_beat = MhpApexBeat::with('selection_criteria')->where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'apex_beat' => $apex_beat,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'selection_criteria' => 'required',
            'apex_beat_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $apex_beat = new MhpApexBeat();
            $apex_beat->selection_criteria = $request->selection_criteria;
            $apex_beat->apex_beat_name = $request->apex_beat_name;
            $apex_beat->save();

            return response()->json([
                'status' => 200,
                'message' => 'Apex Beat Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $apex_beat = MhpApexBeat::find($id);
        if ($apex_beat) {
            return response()->json([
                'status' => 200,
                'apex_beat' => $apex_beat,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Apex Beat Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'selection_criteria' => 'required',
            'apex_beat_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $apex_beat = MhpApexBeat::find($id);
            $apex_beat->selection_criteria = $request->selection_criteria;
            $apex_beat->apex_beat_name = $request->apex_beat_name;
            $apex_beat->update();

            return response()->json([
                'status' => 200,
                'message' => 'Apex Beat Updated Successfully',
            ]);

        }

    }

    public function destroy($id)
    {
        $apex_beat = MhpApexBeat::find($id);
        if ($apex_beat)
        {
            if ($apex_beat['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $apex_beat->delete_status = $delete_status;
            $apex_beat->save();
            return response()->json([
                'status' => 200,
                'message' => 'Apex Beat deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Apex Beat Found',
            ]);
        }
    }

    public function selection_criteria_dropdown()
    {
        $selection_criteria = MhpSelectionCriteria::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'selection_criteria' => $selection_criteria,
        ]);
    }

}
