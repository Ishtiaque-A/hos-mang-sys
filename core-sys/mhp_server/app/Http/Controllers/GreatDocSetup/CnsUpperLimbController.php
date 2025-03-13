<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsUpperLimb;
use Illuminate\Support\Facades\Validator;

class CnsUpperLimbController extends Controller
{
    //
    public function index()
    {
        $UpperLimb = CnsUpperLimb::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'UpperLimb'=>$UpperLimb]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'UpperLimb_name' => 'required|max:100',
       
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
           
            $UpperLimb = new CnsUpperLimb();
            $UpperLimb->UpperLimb_name = $request->UpperLimb_name;

         $UpperLimb->save();

            return response()->json(['status'=>200,'message'=>'Upper Limb Added Successfully']);
        }
    }


    public function edit($id)
    {
        $UpperLimb=CnsUpperLimb::find($id);
        return response()->json(['status'=>200,'UpperLimb'=>$UpperLimb]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'UpperLimb_name' => 'required|max:100',
         

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
           
            $update_UpperLimb=CnsUpperLimb::find($id);
            $update_UpperLimb->UpperLimb_name=$request->UpperLimb_name;
            $update_UpperLimb->update();

            return response()->json(['status'=>200,'message'=>'Upper Limb Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_UpperLimb = CnsUpperLimb::find($id);
        if ($del_UpperLimb)
        {
            if ($del_UpperLimb['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_UpperLimb->delete_status = $delete_status;
            $del_UpperLimb->save();
            return response()->json([
                'status' => 200,
                'message' => 'Upper Limb deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Upper Limb Found',
            ]);
        }

    }
}


