<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMotor;
use Illuminate\Support\Facades\Validator;

class MhpMotorController extends Controller
{
    //
    public function index()
    {
        $motor = MhpMotor::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'motor'=>$motor]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'motor_name' => 'required|max:100',
       
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
           
            $motor = new MhpMotor();
            $motor->motor_name = $request->motor_name;

         $motor->save();

            return response()->json(['status'=>200,'message'=>'Motor Added Successfully']);
        }
    }


    public function edit($id)
    {
        $motor=MhpMotor::find($id);
        return response()->json(['status'=>200,'motor'=>$motor]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'motor_name' => 'required|max:100',
         

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
           
            $update_motor=MhpMotor::find($id);
            $update_motor->motor_name=$request->motor_name;
            $update_motor->update();

            return response()->json(['status'=>200,'message'=>'Motor  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_motor = MhpMotor::find($id);
        if ($del_motor)
        {
            if ($del_motor['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_motor->delete_status = $delete_status;
            $del_motor->save();
            return response()->json([
                'status' => 200,
                'message' => 'Motor deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Motor Found',
            ]);
        }

    }
}

