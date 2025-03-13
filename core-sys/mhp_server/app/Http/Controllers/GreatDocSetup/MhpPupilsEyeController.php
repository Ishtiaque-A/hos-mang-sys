<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPupilsEye;
use Illuminate\Support\Facades\Validator;

class MhpPupilsEyeController extends Controller
{
    //
    public function index()
    {
        $PupilsEye = MhpPupilsEye::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'PupilsEye'=>$PupilsEye]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'PupilsEye_name' => 'required|max:100',
       
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
           
            $PupilsEye = new MhpPupilsEye();
            $PupilsEye->PupilsEye_name = $request->PupilsEye_name;

         $PupilsEye->save();

            return response()->json(['status'=>200,'message'=>'Pupils Added Successfully']);
        }
    }


    public function edit($id)
    {
        $PupilsEye=MhpPupilsEye::find($id);
        return response()->json(['status'=>200,'PupilsEye'=>$PupilsEye]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'PupilsEye_name' => 'required|max:100',
         

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
           
            $update_PupilsEye=MhpPupilsEye::find($id);
            $update_PupilsEye->PupilsEye_name=$request->PupilsEye_name;
            $update_PupilsEye->update();

            return response()->json(['status'=>200,'message'=>'Pupils Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_PupilsEye = MhpPupilsEye::find($id);
        if ($del_PupilsEye)
        {
            if ($del_PupilsEye['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_PupilsEye->delete_status = $delete_status;
            $del_PupilsEye->save();
            return response()->json([
                'status' => 200,
                'message' => 'Pupils deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Pupils Found',
            ]);
        }

    }
}



