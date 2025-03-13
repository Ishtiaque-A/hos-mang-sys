<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDiagnosisProcedureActions;
use Illuminate\Support\Facades\Validator;

class MhpDiagnosisProcedureActionsController extends Controller
{
    //
    public function index()
    {
        $DiagnosisProcedureActions = MhpDiagnosisProcedureActions::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'DiagnosisProcedureActions'=>$DiagnosisProcedureActions]);
    }

    public function dia_pro_reason_action($type)
    {
        $data = MhpDiagnosisProcedureActions::where('DiagnosisProcedureActions_type','like','%'.$type.'%')->where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'data'=>$data]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'DiagnosisProcedureActions_type' => 'required|max:100',
            'DiagnosisProcedureActions_name' => 'required|max:100',
       
        ],
        // ['status_id.required' => 'Status field is required!'] 
    );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        } 
        else{
           
            $DiagnosisProcedureActions = new MhpDiagnosisProcedureActions();
            $DiagnosisProcedureActions->DiagnosisProcedureActions_type = $request->DiagnosisProcedureActions_type;
            $DiagnosisProcedureActions->DiagnosisProcedureActions_name = $request->DiagnosisProcedureActions_name;

         $DiagnosisProcedureActions->save();

            return response()->json(['status'=>200,'message'=>'Diagnosis Procedure Actions Added Successfully']);
        }
    }


    public function edit($id)
    {
        $DiagnosisProcedureActions=MhpDiagnosisProcedureActions::find($id);
        return response()->json(['status'=>200,'DiagnosisProcedureActions'=>$DiagnosisProcedureActions]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'DiagnosisProcedureActions_type' => 'required|max:100',
            'DiagnosisProcedureActions_name' => 'required|max:100',
         

        ],
            // ['status_id.required'=>'Status field is required']
        );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }
         else{
           
            $update_DiagnosisProcedureActions=MhpDiagnosisProcedureActions::find($id);
            $update_DiagnosisProcedureActions->DiagnosisProcedureActions_type=$request->DiagnosisProcedureActions_type;
            $update_DiagnosisProcedureActions->DiagnosisProcedureActions_name=$request->DiagnosisProcedureActions_name;
            $update_DiagnosisProcedureActions->update();

            return response()->json(['status'=>200,'message'=>'Diagnosis Procedure Actions Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_DiagnosisProcedureActions = MhpDiagnosisProcedureActions::find($id);
        if ($del_DiagnosisProcedureActions)
        {
            if ($del_DiagnosisProcedureActions['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_DiagnosisProcedureActions->delete_status = $delete_status;
            $del_DiagnosisProcedureActions->save();
            return response()->json([
                'status' => 200,
                'message' => 'Diagnosis Procedure Actions deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Diagnosis Procedure Actions Found',
            ]);
        }

    }
}


