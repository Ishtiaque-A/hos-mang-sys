<?php

namespace App\Http\Controllers\GreatDocSetup\Diagnosis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpGreatDocDiagnosis;
use DB;
use Validator;

class GreatDocDiagnosisController extends Controller
{


        public function active($id)
        {

                $all_diagnosis = MhpGreatDocDiagnosis::where('patient_id',$id)->where('delete_status',0)->get();

                return response()->json(
                        ['status' => 200, 'all_diagnosis' => $all_diagnosis]
                );
        }


        public function store(Request $request)
        {
                //         $validator = Validator::make($request->all(),[
                //         'diagnosis_id' => 'required|max:100',
                //         'diagnosis_for_id' => 'required|max:100',
                //         'diagnosis_action_id' => 'required|max:100',

                //     ],
                // );

                //     if ($validator->fails())
                //     {
                //         return response()->json([
                //             'status' => 400,
                //             'errors' => $validator->messages(),
                //         ]);

                //     } 
                //     else{

                $diagnosis = new MhpGreatDocDiagnosis();
                $diagnosis->diagnosis_name = $request->diagnosis_name;
                $diagnosis->diagnosis_for_name  = $request->diagnosis_for_name;
                $diagnosis->diagnosis_further_details = $request->diagnosis_further_details;
                $diagnosis->diagnosis_action_name = $request->diagnosis_action_name;
                $diagnosis->code = $request->code;
                $diagnosis->diagnosis_provitional_status = $request->diagnosis_provitional_status;
                $diagnosis->patient_id = $request->patient_id;
                $diagnosis->save();

                return response()->json(['status' => 200, 'message' => 'Dianosis Added Successfully']);

                // }
        }


        public function delete($id)
        {

                $all_diagnosis = MhpGreatDocDiagnosis::find($id);
                $all_diagnosis->delete_status = 1 ;
                $all_diagnosis->save();

                return response()->json(
                        ['status' => 200, 'message' => 'Diagnosis delete sucessfully']
                );
        }
}
