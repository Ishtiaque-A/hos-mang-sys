<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPosture;
use Illuminate\Support\Facades\Validator;

class MhpPostureController extends Controller
{
    //
    public function index()
    {
        $Posture = MhpPosture::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Posture'=>$Posture]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Posture_name' => 'required|max:100',
       
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
           
            $Posture = new MhpPosture();
            $Posture->Posture_name = $request->Posture_name;

         $Posture->save();

            return response()->json(['status'=>200,'message'=>'Posture Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Posture=MhpPosture::find($id);
        return response()->json(['status'=>200,'Posture'=>$Posture]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Posture_name' => 'required|max:100',
         

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
           
            $update_Posture=MhpPosture::find($id);
            $update_Posture->Posture_name=$request->Posture_name;
            $update_Posture->update();

            return response()->json(['status'=>200,'message'=>'Posture Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Posture = MhpPosture::find($id);
        if ($del_Posture)
        {
            if ($del_Posture['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Posture->delete_status = $delete_status;
            $del_Posture->save();
            return response()->json([
                'status' => 200,
                'message' => 'Posture deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Posture Found',
            ]);
        }

    }
}



