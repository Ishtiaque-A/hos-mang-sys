<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDoubleVision;
use Illuminate\Support\Facades\Validator;

class MhpDoubleVisionController extends Controller
{
    //
    public function index()
    {
        $DoubleVision = MhpDoubleVision::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'DoubleVision'=>$DoubleVision]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'DoubleVision_name' => 'required|max:100',
       
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
           
            $DoubleVision = new MhpDoubleVision();
            $DoubleVision->DoubleVision_name = $request->DoubleVision_name;

         $DoubleVision->save();

            return response()->json(['status'=>200,'message'=>'Double Vision Added Successfully']);
        }
    }


    public function edit($id)
    {
        $DoubleVision=MhpDoubleVision::find($id);
        return response()->json(['status'=>200,'DoubleVision'=>$DoubleVision]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'DoubleVision_name' => 'required|max:100',
         

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
           
            $update_DoubleVision=MhpDoubleVision::find($id);
            $update_DoubleVision->DoubleVision_name=$request->DoubleVision_name;
            $update_DoubleVision->update();

            return response()->json(['status'=>200,'message'=>'Double Vision Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_DoubleVision = MhpDoubleVision::find($id);
        if ($del_DoubleVision)
        {
            if ($del_DoubleVision['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_DoubleVision->delete_status = $delete_status;
            $del_DoubleVision->save();
            return response()->json([
                'status' => 200,
                'message' => 'Double Vision deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Double Vision Found',
            ]);
        }

    }
}


