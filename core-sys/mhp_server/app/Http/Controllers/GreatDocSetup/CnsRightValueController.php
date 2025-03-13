<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsRightValue;
use Illuminate\Support\Facades\Validator;

class CnsRightValueController extends Controller
{
    //
    public function index()
    {
        $RightValue = CnsRightValue::where('delete_status',0)->orderBy('id','desc')->get();

        return response()->json(
            ['status'=>200,'RightValue'=>$RightValue]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'RightValue_name' => 'required|max:100',
       
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
           
            $RightValue = new CnsRightValue();
            $RightValue->RightValue_name = $request->RightValue_name;

         $RightValue->save();

            return response()->json(['status'=>200,'message'=>'Right Value Added Successfully']);
        }
    }


    public function edit($id)
    {
        $RightValue=CnsRightValue::find($id);
        return response()->json(['status'=>200,'RightValue'=>$RightValue]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'RightValue_name' => 'required|max:100',
         

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
           
            $update_RightValue=CnsRightValue::find($id);
            $update_RightValue->RightValue_name=$request->RightValue_name;
            $update_RightValue->update();

            return response()->json(['status'=>200,'message'=>'Right Value Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_RightValue = CnsRightValue::find($id);
        if ($del_RightValue)
        {
            if ($del_RightValue['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_RightValue->delete_status = $delete_status;
            $del_RightValue->save();
            return response()->json([
                'status' => 200,
                'message' => 'Right Value deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Right Value Found',
            ]);
        }

    }
}

