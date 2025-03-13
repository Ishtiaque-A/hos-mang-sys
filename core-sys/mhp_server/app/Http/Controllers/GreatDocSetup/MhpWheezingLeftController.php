<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpWheezingLeft;
use Illuminate\Support\Facades\Validator;

class MhpWheezingLeftController extends Controller
{
    //
    public function index()
    {
        $WheezingLeft = MhpWheezingLeft::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'WheezingLeft'=>$WheezingLeft]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'WheezingLeft_name' => 'required|max:100',
       
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
           
            $WheezingLeft = new MhpWheezingLeft();
            $WheezingLeft->WheezingLeft_name = $request->WheezingLeft_name;

         $WheezingLeft->save();

            return response()->json(['status'=>200,'message'=>'Wheezing Left Added Successfully']);
        }
    }


    public function edit($id)
    {
        $WheezingLeft=MhpWheezingLeft::find($id);
        return response()->json(['status'=>200,'WheezingLeft'=>$WheezingLeft]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'WheezingLeft_name' => 'required|max:100',
         

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
           
            $update_WheezingLeft=MhpWheezingLeft::find($id);
            $update_WheezingLeft->WheezingLeft_name=$request->WheezingLeft_name;
            $update_WheezingLeft->update();

            return response()->json(['status'=>200,'message'=>'Wheezing Left Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_WheezingLeft = MhpWheezingLeft::find($id);
        if ($del_WheezingLeft)
        {
            if ($del_WheezingLeft['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_WheezingLeft->delete_status = $delete_status;
            $del_WheezingLeft->save();
            return response()->json([
                'status' => 200,
                'message' => 'Wheezing Left deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Wheezing Left Found',
            ]);
        }

    }
}
