<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSwollenEyeLid;
use Illuminate\Support\Facades\Validator;

class MhpSwollenEyeLidController extends Controller
{
    //
    public function index()
    {
        $SwollenEyeLid = MhpSwollenEyeLid::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'SwollenEyeLid'=>$SwollenEyeLid]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'SwollenEyeLid_name' => 'required|max:100',
       
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
           
            $SwollenEyeLid = new MhpSwollenEyeLid();
            $SwollenEyeLid->SwollenEyeLid_name = $request->SwollenEyeLid_name;

         $SwollenEyeLid->save();

            return response()->json(['status'=>200,'message'=>'Swollen Eye Lid Added Successfully']);
        }
    }


    public function edit($id)
    {
        $SwollenEyeLid=MhpSwollenEyeLid::find($id);
        return response()->json(['status'=>200,'SwollenEyeLid'=>$SwollenEyeLid]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'SwollenEyeLid_name' => 'required|max:100',
         

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
           
            $update_SwollenEyeLid=MhpSwollenEyeLid::find($id);
            $update_SwollenEyeLid->SwollenEyeLid_name=$request->SwollenEyeLid_name;
            $update_SwollenEyeLid->update();

            return response()->json(['status'=>200,'message'=>'Swollen Eye Lid Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_SwollenEyeLid = MhpSwollenEyeLid::find($id);
        if ($del_SwollenEyeLid)
        {
            if ($del_SwollenEyeLid['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_SwollenEyeLid->delete_status = $delete_status;
            $del_SwollenEyeLid->save();
            return response()->json([
                'status' => 200,
                'message' => 'Swollen Eye Lid deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Swollen Eye Lid Found',
            ]);
        }

    }
}

