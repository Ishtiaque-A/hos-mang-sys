<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpWheezingBoth;
use Illuminate\Support\Facades\Validator;

class MhpWheezingBothController extends Controller
{
    //
    public function index()
    {
        $WheezingBoth = MhpWheezingBoth::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'WheezingBoth'=>$WheezingBoth]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'WheezingBoth_name' => 'required|max:100',
       
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
           
            $WheezingBoth = new MhpWheezingBoth();
            $WheezingBoth->WheezingBoth_name = $request->WheezingBoth_name;

         $WheezingBoth->save();

            return response()->json(['status'=>200,'message'=>'Wheezing Both Added Successfully']);
        }
    }


    public function edit($id)
    {
        $WheezingBoth=MhpWheezingBoth::find($id);
        return response()->json(['status'=>200,'WheezingBoth'=>$WheezingBoth]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'WheezingBoth_name' => 'required|max:100',
         

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
           
            $update_WheezingBoth=MhpWheezingBoth::find($id);
            $update_WheezingBoth->WheezingBoth_name=$request->WheezingBoth_name;
            $update_WheezingBoth->update();

            return response()->json(['status'=>200,'message'=>'Wheezing Both Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_WheezingBoth = MhpWheezingBoth::find($id);
        if ($del_WheezingBoth)
        {
            if ($del_WheezingBoth['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_WheezingBoth->delete_status = $delete_status;
            $del_WheezingBoth->save();
            return response()->json([
                'status' => 200,
                'message' => 'Wheezing Both deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Wheezing Both Found',
            ]);
        }

    }
}
