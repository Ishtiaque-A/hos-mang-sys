<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpContinuous;
use Illuminate\Support\Facades\Validator;

class MhpContinuousController extends Controller
{
    //
    public function index()
    {
        $Continuous = MhpContinuous::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Continuous'=>$Continuous]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Continuous_name' => 'required|max:100',
       
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
           
            $Continuous = new MhpContinuous();
            $Continuous->Continuous_name = $request->Continuous_name;

         $Continuous->save();

            return response()->json(['status'=>200,'message'=>'Continuous Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Continuous=MhpContinuous::find($id);
        return response()->json(['status'=>200,'Continuous'=>$Continuous]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Continuous_name' => 'required|max:100',
         

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
           
            $update_Continuous=MhpContinuous::find($id);
            $update_Continuous->Continuous_name=$request->Continuous_name;
            $update_Continuous->update();

            return response()->json(['status'=>200,'message'=>'Continuous Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Continuous = MhpContinuous::find($id);
        if ($del_Continuous)
        {
            if ($del_Continuous['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Continuous->delete_status = $delete_status;
            $del_Continuous->save();
            return response()->json([
                'status' => 200,
                'message' => 'Continuous deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Continuous Found',
            ]);
        }

    }
}


