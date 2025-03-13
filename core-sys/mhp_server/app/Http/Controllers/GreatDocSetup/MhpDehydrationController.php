<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDehydration;
use Illuminate\Support\Facades\Validator;

class MhpDehydrationController extends Controller
{
    //
    public function index()
    {
        $dehydration = MhpDehydration::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'dehydration'=>$dehydration]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'dehydration_name' => 'required|max:100',
       
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
           
            $dehydration = new MhpDehydration();
            $dehydration->dehydration_name = $request->dehydration_name;

         $dehydration->save();

            return response()->json(['status'=>200,'message'=>'Dehydration Added Successfully']);
        }
    }


    public function edit($id)
    {
        $dehydration=MhpDehydration::find($id);
        return response()->json(['status'=>200,'dehydration'=>$dehydration]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'dehydration_name' => 'required|max:100',
         

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
           
            $update_dehydration=MhpDehydration::find($id);
            $update_dehydration->dehydration_name=$request->dehydration_name;
            $update_dehydration->update();

            return response()->json(['status'=>200,'message'=>'Dehydration Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_dehydration = MhpDehydration::find($id);
        if ($del_dehydration)
        {
            if ($del_dehydration['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_dehydration->delete_status = $delete_status;
            $del_dehydration->save();
            return response()->json([
                'status' => 200,
                'message' => 'Dehydration deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Dehydration Found',
            ]);
        }

    }
}

