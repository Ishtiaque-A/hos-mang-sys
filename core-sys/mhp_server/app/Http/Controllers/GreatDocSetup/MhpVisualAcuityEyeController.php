<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpVisualAcuityEye;
use Illuminate\Support\Facades\Validator;

class MhpVisualAcuityEyeController extends Controller
{
    //
    public function index()
    {
        $VisualAcuityEye = MhpVisualAcuityEye::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'VisualAcuityEye'=>$VisualAcuityEye]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'VisualAcuityEye_name' => 'required|max:100',
       
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
           
            $VisualAcuityEye = new MhpVisualAcuityEye();
            $VisualAcuityEye->VisualAcuityEye_name = $request->VisualAcuityEye_name;

         $VisualAcuityEye->save();

            return response()->json(['status'=>200,'message'=>'Visual Acuity Added Successfully']);
        }
    }


    public function edit($id)
    {
        $VisualAcuityEye=MhpVisualAcuityEye::find($id);
        return response()->json(['status'=>200,'VisualAcuityEye'=>$VisualAcuityEye]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'VisualAcuityEye_name' => 'required|max:100',
         

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
           
            $update_VisualAcuityEye=MhpVisualAcuityEye::find($id);
            $update_VisualAcuityEye->VisualAcuityEye_name=$request->VisualAcuityEye_name;
            $update_VisualAcuityEye->update();

            return response()->json(['status'=>200,'message'=>'Visual Acuity Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_VisualAcuityEye = MhpVisualAcuityEye::find($id);
        if ($del_VisualAcuityEye)
        {
            if ($del_VisualAcuityEye['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_VisualAcuityEye->delete_status = $delete_status;
            $del_VisualAcuityEye->save();
            return response()->json([
                'status' => 200,
                'message' => 'Visual Acuity deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Visual Acuity Found',
            ]);
        }

    }
}