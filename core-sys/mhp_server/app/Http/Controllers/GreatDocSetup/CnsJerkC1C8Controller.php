<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsJerkC1C8;
use Illuminate\Support\Facades\Validator;

class CnsJerkC1C8Controller extends Controller
{
    //
    public function index()
    {
        $JerkC1C8 = CnsJerkC1C8::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'JerkC1C8'=>$JerkC1C8]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'JerkC1C8_name' => 'required|max:100',
       
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
           
            $JerkC1C8 = new CnsJerkC1C8();
            $JerkC1C8->JerkC1C8_name = $request->JerkC1C8_name;

         $JerkC1C8->save();

            return response()->json(['status'=>200,'message'=>'Jerk (C1,C8) Added Successfully']);
        }
    }


    public function edit($id)
    {
        $JerkC1C8=CnsJerkC1C8::find($id);
        return response()->json(['status'=>200,'JerkC1C8'=>$JerkC1C8]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'JerkC1C8_name' => 'required|max:100',
         

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
           
            $update_JerkC1C8=CnsJerkC1C8::find($id);
            $update_JerkC1C8->JerkC1C8_name=$request->JerkC1C8_name;
            $update_JerkC1C8->update();

            return response()->json(['status'=>200,'message'=>'Jerk (C1,C8) Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_JerkC1C8 = CnsJerkC1C8::find($id);
        if ($del_JerkC1C8)
        {
            if ($del_JerkC1C8['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_JerkC1C8->delete_status = $delete_status;
            $del_JerkC1C8->save();
            return response()->json([
                'status' => 200,
                'message' => 'Jerk (C1,C8) deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Jerk (C1,C8) Found',
            ]);
        }

    }
}


