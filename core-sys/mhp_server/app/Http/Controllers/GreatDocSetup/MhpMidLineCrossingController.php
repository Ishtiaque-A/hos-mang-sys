<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMidLineCrossing;
use Illuminate\Support\Facades\Validator;

class MhpMidLineCrossingController extends Controller
{
    //
    public function index()
    {
        $MidLineCrossing = MhpMidLineCrossing::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'MidLineCrossing'=>$MidLineCrossing]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'MidLineCrossing_name' => 'required|max:100',
       
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
           
            $MidLineCrossing = new MhpMidLineCrossing();
            $MidLineCrossing->MidLineCrossing_name = $request->MidLineCrossing_name;

         $MidLineCrossing->save();

            return response()->json(['status'=>200,'message'=>'Mid Line Crossing Added Successfully']);
        }
    }


    public function edit($id)
    {
        $MidLineCrossing=MhpMidLineCrossing::find($id);
        return response()->json(['status'=>200,'MidLineCrossing'=>$MidLineCrossing]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'MidLineCrossing_name' => 'required|max:100',
         

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
           
            $update_MidLineCrossing=MhpMidLineCrossing::find($id);
            $update_MidLineCrossing->MidLineCrossing_name=$request->MidLineCrossing_name;
            $update_MidLineCrossing->update();

            return response()->json(['status'=>200,'message'=>'Mid Line Crossing Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_MidLineCrossing = MhpMidLineCrossing::find($id);
        if ($del_MidLineCrossing)
        {
            if ($del_MidLineCrossing['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_MidLineCrossing->delete_status = $delete_status;
            $del_MidLineCrossing->save();
            return response()->json([
                'status' => 200,
                'message' => 'Mid Line Crossing deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Mid Line Crossing Found',
            ]);
        }

    }
}



