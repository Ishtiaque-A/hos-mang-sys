<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDIPJoint;
use Illuminate\Support\Facades\Validator;

class MhpDIPJointController extends Controller
{
    //
    public function index()
    {
        $dIPJoint = MhpDIPJoint::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'dIPJoint'=>$dIPJoint]);
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
           
            $dIPJoint = new MhpDIPJoint();
            $dIPJoint->name = $request->name;

         $dIPJoint->save();

            return response()->json(['status'=>200,'message'=>'DIP Joint Added Successfully']);
        }
    }


    public function edit($id)
    {
        $dIPJoint=MhpDIPJoint::find($id);
        return response()->json(['status'=>200,'dIPJoint'=>$dIPJoint]);
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
           
            $update_dIPJoint=MhpDIPJoint::find($id);
            $update_dIPJoint->name=$request->name;
            $update_dIPJoint->update();

            return response()->json(['status'=>200,'message'=>'DIP Joint Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_dIPJoint = MhpDIPJoint::find($id);
        if ($del_dIPJoint)
        {
            if ($del_dIPJoint['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_dIPJoint->delete_status = $delete_status;
            $del_dIPJoint->save();
            return response()->json([
                'status' => 200,
                'message' => 'DIP Joint deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No DIP Joint Found',
            ]);
        }

    }
}


