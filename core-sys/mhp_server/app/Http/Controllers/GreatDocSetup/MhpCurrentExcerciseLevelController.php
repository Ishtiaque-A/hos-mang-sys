<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCurrentExcerciseLevel;
use Illuminate\Support\Facades\Validator;

class MhpCurrentExcerciseLevelController extends Controller
{
    //
    public function index()
    {
        $currentExcerciseLevel = MhpCurrentExcerciseLevel::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'currentExcerciseLevel'=>$currentExcerciseLevel]);
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
           
            $currentExcerciseLevel = new MhpCurrentExcerciseLevel();
            $currentExcerciseLevel->name = $request->name;

         $currentExcerciseLevel->save();

            return response()->json(['status'=>200,'message'=>'Current Excercise Level Added Successfully']);
        }
    }


    public function edit($id)
    {
        $currentExcerciseLevel=MhpCurrentExcerciseLevel::find($id);
        return response()->json(['status'=>200,'currentExcerciseLevel'=>$currentExcerciseLevel]);
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
           
            $update_currentExcerciseLevel=MhpCurrentExcerciseLevel::find($id);
            $update_currentExcerciseLevel->name=$request->name;
            $update_currentExcerciseLevel->update();

            return response()->json(['status'=>200,'message'=>'Current Excercise Level Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_currentExcerciseLevel = MhpCurrentExcerciseLevel::find($id);
        if ($del_currentExcerciseLevel)
        {
            if ($del_currentExcerciseLevel['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_currentExcerciseLevel->delete_status = $delete_status;
            $del_currentExcerciseLevel->save();
            return response()->json([
                'status' => 200,
                'message' => 'Current Excercise Level deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Current Excercise Level Found',
            ]);
        }

    }
}


