<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDiagnosisProcedureFor;
use Illuminate\Support\Facades\Validator;

class MhpDiagnosisProcedureForController extends Controller
{
    //
    public function index()
    {
        $DiagnosisProcedureFor = MhpDiagnosisProcedureFor::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'DiagnosisProcedureFor'=>$DiagnosisProcedureFor]);
    }

    public function dia_pro_reason_for($type)
    {
        $data = MhpDiagnosisProcedureFor::where('DiagnosisProcedureFor_type','like','%'.$type.'%')->where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'data'=>$data]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'DiagnosisProcedureFor_type' => 'required|max:100',
            'DiagnosisProcedureFor_name' => 'required|max:100',
       
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
           
            $DiagnosisProcedureFor = new MhpDiagnosisProcedureFor();
            $DiagnosisProcedureFor->DiagnosisProcedureFor_type = $request->DiagnosisProcedureFor_type;
            $DiagnosisProcedureFor->DiagnosisProcedureFor_name = $request->DiagnosisProcedureFor_name;

         $DiagnosisProcedureFor->save();

            return response()->json(['status'=>200,'message'=>'Diagnosis Procedure For Added Successfully']);
        }
    }


    public function edit($id)
    {
        $DiagnosisProcedureFor=MhpDiagnosisProcedureFor::find($id);
        return response()->json(['status'=>200,'DiagnosisProcedureFor'=>$DiagnosisProcedureFor]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'DiagnosisProcedureFor_type' => 'required|max:100',
            'DiagnosisProcedureFor_name' => 'required|max:100',
         

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
           
            $update_DiagnosisProcedureFor=MhpDiagnosisProcedureFor::find($id);
            $update_DiagnosisProcedureFor->DiagnosisProcedureFor_type=$request->DiagnosisProcedureFor_type;
            $update_DiagnosisProcedureFor->DiagnosisProcedureFor_name=$request->DiagnosisProcedureFor_name;
            $update_DiagnosisProcedureFor->update();

            return response()->json(['status'=>200,'message'=>'Diagnosis Procedure For Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_DiagnosisProcedureFor = MhpDiagnosisProcedureFor::find($id);
        if ($del_DiagnosisProcedureFor)
        {
            if ($del_DiagnosisProcedureFor['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_DiagnosisProcedureFor->delete_status = $delete_status;
            $del_DiagnosisProcedureFor->save();
            return response()->json([
                'status' => 200,
                'message' => 'Diagnosis Procedure For deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Diagnosis Procedure For Found',
            ]);
        }

    }
}


