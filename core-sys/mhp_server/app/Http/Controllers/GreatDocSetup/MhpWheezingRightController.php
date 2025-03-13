<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpWheezingRight;
use Illuminate\Support\Facades\Validator;

class MhpWheezingRightController extends Controller
{
    //
    public function index()
    {
        $WheezingRight = MhpWheezingRight::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'WheezingRight'=>$WheezingRight]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'WheezingRight_name' => 'required|max:100',
       
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
           
            $WheezingRight = new MhpWheezingRight();
            $WheezingRight->WheezingRight_name = $request->WheezingRight_name;

         $WheezingRight->save();

            return response()->json(['status'=>200,'message'=>'Wheezing Right Added Successfully']);
        }
    }


    public function edit($id)
    {
        $WheezingRight=MhpWheezingRight::find($id);
        return response()->json(['status'=>200,'WheezingRight'=>$WheezingRight]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'WheezingRight_name' => 'required|max:100',
         

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
           
            $update_WheezingRight=MhpWheezingRight::find($id);
            $update_WheezingRight->WheezingRight_name=$request->WheezingRight_name;
            $update_WheezingRight->update();

            return response()->json(['status'=>200,'message'=>'Wheezing Right Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_WheezingRight = MhpWheezingRight::find($id);
        if ($del_WheezingRight)
        {
            if ($del_WheezingRight['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_WheezingRight->delete_status = $delete_status;
            $del_WheezingRight->save();
            return response()->json([
                'status' => 200,
                'message' => 'Wheezing Right deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Wheezing Right Found',
            ]);
        }

    }
}



