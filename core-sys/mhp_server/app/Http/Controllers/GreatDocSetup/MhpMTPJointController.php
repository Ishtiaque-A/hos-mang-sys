<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMTPJoint;
use Illuminate\Support\Facades\Validator;

class MhpMTPJointController extends Controller
{
    //
    public function index()
    {
        $mTPJoint = MhpMTPJoint::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'mTPJoint'=>$mTPJoint]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
       
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
           
            $mTPJoint = new MhpMTPJoint();
            $mTPJoint->name = $request->name;

         $mTPJoint->save();

            return response()->json(['status'=>200,'message'=>'MTP Joint Added Successfully']);
        }
    }


    public function edit($id)
    {
        $mTPJoint=MhpMTPJoint::find($id);
        return response()->json(['status'=>200,'mTPJoint'=>$mTPJoint]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
         
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
           
            $update_mTPJoint=MhpMTPJoint::find($id);
            $update_mTPJoint->name=$request->name;
            $update_mTPJoint->update();

            return response()->json(['status'=>200,'message'=>'MTP Joint Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_mTPJoint = MhpMTPJoint::find($id);
        if ($del_mTPJoint)
        {
            if ($del_mTPJoint['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_mTPJoint->delete_status = $delete_status;
            $del_mTPJoint->save();
            return response()->json([
                'status' => 200,
                'message' => 'MTP Joint deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No MTP Joint Found',
            ]);
        }

    }
}


