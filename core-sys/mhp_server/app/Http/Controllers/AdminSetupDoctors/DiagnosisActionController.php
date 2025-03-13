<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use App\Models\MhpDiagnosisAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DiagnosisActionController extends Controller
{

    public function index()
    {

        $diagnosisAction = MhpDiagnosisAction::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'diagnosisAction' => $diagnosisAction,
        ]);

    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'diagnosis_action_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $diagnosisAction = new MhpDiagnosisAction();
            $diagnosisAction->diagnosis_action_name = $request->input('diagnosis_action_name');
            $diagnosisAction->save();

            return response()->json([
                'status' => 200,
                'message' => 'Diagnosis Action Added Successfully',
            ]);

        }
    }

    public function edit($id)
    {
        $diagnosisAction = MhpDiagnosisAction::find($id);
        if ($diagnosisAction) {
            return response()->json([
                'status' => 200,
                'diagnosisAction' => $diagnosisAction,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Diagnosis Action Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'diagnosis_action_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_error' => $validator->messages(),
            ]);
        } else {
            $diagnosisAction = MhpDiagnosisAction::find($id);
            if ($diagnosisAction) {
                $diagnosisAction->diagnosis_action_name = $request->input('diagnosis_action_name');
                $diagnosisAction->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Diagnosis Action Update Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Diagnosis Action Id Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {

        $occupational_hazards = MhpDiagnosisAction::find($id);
        if ($occupational_hazards)
        {
            if ($occupational_hazards['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $occupational_hazards->delete_status = $delete_status;
            $occupational_hazards->save();
            return response()->json([
                'status' => 200,
                'message' => 'Diagnosis Action deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Diagnosis Action Found',
            ]);
        }
    }

}
