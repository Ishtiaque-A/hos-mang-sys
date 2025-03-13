<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpRightLumber;
use Illuminate\Support\Facades\Validator;

class MhpRightLumberController extends Controller
{
    //
    public function index()
    {
        $RightLumber = MhpRightLumber::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'RightLumber'=>$RightLumber]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'RightLumber_name' => 'required|max:100',
       
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
           
            $RightLumber = new MhpRightLumber();
            $RightLumber->RightLumber_name = $request->RightLumber_name;

         $RightLumber->save();

            return response()->json(['status'=>200,'message'=>'Right Lumber Added Successfully']);
        }
    }


    public function edit($id)
    {
        $RightLumber=MhpRightLumber::find($id);
        return response()->json(['status'=>200,'RightLumber'=>$RightLumber]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'RightLumber_name' => 'required|max:100',
         

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
           
            $update_RightLumber=MhpRightLumber::find($id);
            $update_RightLumber->RightLumber_name=$request->RightLumber_name;
            $update_RightLumber->update();

            return response()->json(['status'=>200,'message'=>'Right Lumber Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_RightLumber = MhpRightLumber::find($id);
        if ($del_RightLumber)
        {
            if ($del_RightLumber['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_RightLumber->delete_status = $delete_status;
            $del_RightLumber->save();
            return response()->json([
                'status' => 200,
                'message' => 'Right Lumber deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Right Lumber Found',
            ]);
        }

    }
}

