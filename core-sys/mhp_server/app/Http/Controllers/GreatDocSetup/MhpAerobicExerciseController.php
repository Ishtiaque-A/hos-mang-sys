<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpAerobicExercise;
use Illuminate\Support\Facades\Validator;

class MhpAerobicExerciseController extends Controller
{
    //
    public function index()
    {
        $aerobicExercise = MhpAerobicExercise::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'aerobicExercise'=>$aerobicExercise]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
       
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
           
            $aerobicExercise = new MhpAerobicExercise();
            $aerobicExercise->name = $request->name;

         $aerobicExercise->save();

            return response()->json(['status'=>200,'message'=>'Aerobic Exercise Added Successfully']);
        }
    }


    public function edit($id)
    {
        $aerobicExercise=MhpAerobicExercise::find($id);
        return response()->json(['status'=>200,'aerobicExercise'=>$aerobicExercise]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
         
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
           
            $update_aerobicExercise=MhpAerobicExercise::find($id);
            $update_aerobicExercise->name=$request->name;
            $update_aerobicExercise->update();

            return response()->json(['status'=>200,'message'=>'Aerobic Exercise Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_aerobicExercise = MhpAerobicExercise::find($id);
        if ($del_aerobicExercise)
        {
            if ($del_aerobicExercise['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_aerobicExercise->delete_status = $delete_status;
            $del_aerobicExercise->save();
            return response()->json([
                'status' => 200,
                'message' => 'Aerobic Exercise deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Aerobic Exercise Found',
            ]);
        }

    }
}



