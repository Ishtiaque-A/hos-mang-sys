<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsLeftValue;
use Illuminate\Support\Facades\Validator;

class CnsLeftValueController extends Controller
{
    //
    public function index()
    {
        $LeftValue = CnsLeftValue::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'LeftValue'=>$LeftValue]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'LeftValue_name' => 'required|max:100',
       
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
           
            $LeftValue = new CnsLeftValue();
            $LeftValue->LeftValue_name = $request->LeftValue_name;

         $LeftValue->save();

            return response()->json(['status'=>200,'message'=>'Left Value Added Successfully']);
        }
    }


    public function edit($id)
    {
        $LeftValue=CnsLeftValue::find($id);
        return response()->json(['status'=>200,'LeftValue'=>$LeftValue]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'LeftValue_name' => 'required|max:100',
         

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
           
            $update_LeftValue=CnsLeftValue::find($id);
            $update_LeftValue->LeftValue_name=$request->LeftValue_name;
            $update_LeftValue->update();

            return response()->json(['status'=>200,'message'=>'Left Value Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_LeftValue = CnsLeftValue::find($id);
        if ($del_LeftValue)
        {
            if ($del_LeftValue['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_LeftValue->delete_status = $delete_status;
            $del_LeftValue->save();
            return response()->json([
                'status' => 200,
                'message' => 'Left Value deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Left Value Found',
            ]);
        }

    }
}

