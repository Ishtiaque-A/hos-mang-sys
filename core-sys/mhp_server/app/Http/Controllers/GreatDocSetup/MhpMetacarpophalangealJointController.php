<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMetacarpophalangealJoint;
use Illuminate\Support\Facades\Validator;

class MhpMetacarpophalangealJointController extends Controller
{
    //
    public function index()
    {
        $MetacarpophalangealJoint = MhpMetacarpophalangealJoint::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'MetacarpophalangealJoint'=>$MetacarpophalangealJoint]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'MetacarpophalangealJoint_name' => 'required|max:100',
       
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
           
            $MetacarpophalangealJoint = new MhpMetacarpophalangealJoint();
            $MetacarpophalangealJoint->MetacarpophalangealJoint_name = $request->MetacarpophalangealJoint_name;

         $MetacarpophalangealJoint->save();

            return response()->json(['status'=>200,'message'=>'Metacarpophalangeal Joint Added Successfully']);
        }
    }


    public function edit($id)
    {
        $MetacarpophalangealJoint=MhpMetacarpophalangealJoint::find($id);
        return response()->json(['status'=>200,'MetacarpophalangealJoint'=>$MetacarpophalangealJoint]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'MetacarpophalangealJoint_name' => 'required|max:100',
         

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
           
            $update_MetacarpophalangealJoint=MhpMetacarpophalangealJoint::find($id);
            $update_MetacarpophalangealJoint->MetacarpophalangealJoint_name=$request->MetacarpophalangealJoint_name;
            $update_MetacarpophalangealJoint->update();

            return response()->json(['status'=>200,'message'=>'Metacarpophalangeal Joint Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_MetacarpophalangealJoint = MhpMetacarpophalangealJoint::find($id);
        if ($del_MetacarpophalangealJoint)
        {
            if ($del_MetacarpophalangealJoint['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_MetacarpophalangealJoint->delete_status = $delete_status;
            $del_MetacarpophalangealJoint->save();
            return response()->json([
                'status' => 200,
                'message' => 'Metacarpophalangeal Joint deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Metacarpophalangeal Joint Found',
            ]);
        }

    }
}

