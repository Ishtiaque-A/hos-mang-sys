<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPIPJoint;
use Illuminate\Support\Facades\Validator;

class MhpPIPJointController extends Controller
{
    //
    public function index()
    {
        $pIPJoint = MhpPIPJoint::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'pIPJoint'=>$pIPJoint]);
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
           
            $pIPJoint = new MhpPIPJoint();
            $pIPJoint->name = $request->name;

         $pIPJoint->save();

            return response()->json(['status'=>200,'message'=>'PIP Joint Added Successfully']);
        }
    }


    public function edit($id)
    {
        $pIPJoint=MhpPIPJoint::find($id);
        return response()->json(['status'=>200,'pIPJoint'=>$pIPJoint]);
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
           
            $update_pIPJoint=MhpPIPJoint::find($id);
            $update_pIPJoint->name=$request->name;
            $update_pIPJoint->update();

            return response()->json(['status'=>200,'message'=>'PIP Joint Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_pIPJoint = MhpPIPJoint::find($id);
        if ($del_pIPJoint)
        {
            if ($del_pIPJoint['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_pIPJoint->delete_status = $delete_status;
            $del_pIPJoint->save();
            return response()->json([
                'status' => 200,
                'message' => 'PIP Joint deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No PIP Joint Found',
            ]);
        }

    }
}


