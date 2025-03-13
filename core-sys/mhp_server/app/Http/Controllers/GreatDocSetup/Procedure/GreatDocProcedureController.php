<?php

namespace App\Http\Controllers\GreatDocSetup\Procedure;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpGreatDocProcedure;
use DB;
use Validator;
class GreatDocProcedureController extends Controller
{
    
        public function active($id)
        {

                $all_procedures = MhpGreatDocProcedure::where('patient_id',$id)->where('delete_status',0)->get();

                return response()->json(
                        ['status' => 200, 'all_procedures' => $all_procedures]
                );
        }


        public function store(Request $request)
        {
        
                $procedure = new MhpGreatDocProcedure();
                $procedure->procedure_name = $request->procedure_name;
                $procedure->procedure_for_name  = $request->procedure_for_name ;
                $procedure->procedure_further_details = $request->procedure_further_details;
                $procedure->procedure_action_name = $request->procedure_action_name;
                $procedure->patient_id = $request->patient_id;
                $procedure->save();

                return response()->json(['status'=>200,'message'=>'Procedure Added Successfully']);
        }

        public function update(Request $request,$id)
        {

                $all_diagnosis = MhpGreatDocProcedure::find($id);
                $all_diagnosis->created_at = $request->date ;
                $all_diagnosis->update();

                return response()->json(
                        ['status' => 200, 'message' => 'Procedure update sucessfully']
                );
        }
        public function delete($id)
        {

                $all_diagnosis = MhpGreatDocProcedure::find($id);
                $all_diagnosis->delete_status = 1 ;
                $all_diagnosis->save();

                return response()->json(
                        ['status' => 200, 'message' => 'Procedure delete sucessfully']
                );
        }
}
