<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDistalInterphalangealJoint;
use Illuminate\Support\Facades\Validator;

class MhpDistalInterphalangealJointController extends Controller
{
    //
    public function index()
    {
        $DistalInterphalangealJoint = MhpDistalInterphalangealJoint::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'DistalInterphalangealJoint'=>$DistalInterphalangealJoint]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'DistalInterphalangealJoint_name' => 'required|max:100',
       
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
           
            $DistalInterphalangealJoint = new MhpDistalInterphalangealJoint();
            $DistalInterphalangealJoint->DistalInterphalangealJoint_name = $request->DistalInterphalangealJoint_name;

         $DistalInterphalangealJoint->save();

            return response()->json(['status'=>200,'message'=>'Distal Interphalangeal Joint Added Successfully']);
        }
    }


    public function edit($id)
    {
        $DistalInterphalangealJoint=MhpDistalInterphalangealJoint::find($id);
        return response()->json(['status'=>200,'DistalInterphalangealJoint'=>$DistalInterphalangealJoint]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'DistalInterphalangealJoint_name' => 'required|max:100',
         

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
           
            $update_DistalInterphalangealJoint=MhpDistalInterphalangealJoint::find($id);
            $update_DistalInterphalangealJoint->DistalInterphalangealJoint_name=$request->DistalInterphalangealJoint_name;
            $update_DistalInterphalangealJoint->update();

            return response()->json(['status'=>200,'message'=>'Distal Interphalangeal Joint Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_DistalInterphalangealJoint = MhpDistalInterphalangealJoint::find($id);
        if ($del_DistalInterphalangealJoint)
        {
            if ($del_DistalInterphalangealJoint['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_DistalInterphalangealJoint->delete_status = $delete_status;
            $del_DistalInterphalangealJoint->save();
            return response()->json([
                'status' => 200,
                'message' => 'Distal Interphalangeal Joint deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Distal Interphalangeal Joint Found',
            ]);
        }

    }
}

