<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpProximalInterphalangealJoint;
use Illuminate\Support\Facades\Validator;

class MhpProximalInterphalangealJointController extends Controller
{
    //
    public function index()
    {
        $ProximalInterphalangealJoint = MhpProximalInterphalangealJoint::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'ProximalInterphalangealJoint'=>$ProximalInterphalangealJoint]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'ProximalInterphalangealJoint_name' => 'required|max:100',
       
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
           
            $ProximalInterphalangealJoint = new MhpProximalInterphalangealJoint();
            $ProximalInterphalangealJoint->ProximalInterphalangealJoint_name = $request->ProximalInterphalangealJoint_name;

         $ProximalInterphalangealJoint->save();

            return response()->json(['status'=>200,'message'=>'Proximal Interphalangeal Joint Added Successfully']);
        }
    }


    public function edit($id)
    {
        $ProximalInterphalangealJoint=MhpProximalInterphalangealJoint::find($id);
        return response()->json(['status'=>200,'ProximalInterphalangealJoint'=>$ProximalInterphalangealJoint]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'ProximalInterphalangealJoint_name' => 'required|max:100',
         

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
           
            $update_ProximalInterphalangealJoint=MhpProximalInterphalangealJoint::find($id);
            $update_ProximalInterphalangealJoint->ProximalInterphalangealJoint_name=$request->ProximalInterphalangealJoint_name;
            $update_ProximalInterphalangealJoint->update();

            return response()->json(['status'=>200,'message'=>'Proximal Interphalangeal Joint Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_ProximalInterphalangealJoint = MhpProximalInterphalangealJoint::find($id);
        if ($del_ProximalInterphalangealJoint)
        {
            if ($del_ProximalInterphalangealJoint['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_ProximalInterphalangealJoint->delete_status = $delete_status;
            $del_ProximalInterphalangealJoint->save();
            return response()->json([
                'status' => 200,
                'message' => 'Proximal Interphalangeal Joint deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Proximal Interphalangeal Joint Found',
            ]);
        }

    }
}


