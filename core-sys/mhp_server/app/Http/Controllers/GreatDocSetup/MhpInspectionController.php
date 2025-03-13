<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpInspection;
use Illuminate\Support\Facades\Validator;

class MhpInspectionController extends Controller
{
    //
    public function index()
    {
        $Inspection = MhpInspection::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Inspection'=>$Inspection]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Inspection_name' => 'required|max:100',
       
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
           
            $Inspection = new MhpInspection();
            $Inspection->Inspection_name = $request->Inspection_name;

         $Inspection->save();

            return response()->json(['status'=>200,'message'=>'Inspection Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Inspection=MhpInspection::find($id);
        return response()->json(['status'=>200,'Inspection'=>$Inspection]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Inspection_name' => 'required|max:100',
         

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
           
            $update_Inspection=MhpInspection::find($id);
            $update_Inspection->Inspection_name=$request->Inspection_name;
            $update_Inspection->update();

            return response()->json(['status'=>200,'message'=>'Inspection Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Inspection = MhpInspection::find($id);
        if ($del_Inspection)
        {
            if ($del_Inspection['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Inspection->delete_status = $delete_status;
            $del_Inspection->save();
            return response()->json([
                'status' => 200,
                'message' => 'Inspection deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Inspection Found',
            ]);
        }

    }
}


