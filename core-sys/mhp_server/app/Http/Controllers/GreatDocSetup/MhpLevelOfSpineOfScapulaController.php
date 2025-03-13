<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLevelOfSpineOfScapula;
use Illuminate\Support\Facades\Validator;

class MhpLevelOfSpineOfScapulaController extends Controller
{
    //
    public function index()
    {
        $LevelOfSpineOfScapula = MhpLevelOfSpineOfScapula::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'LevelOfSpineOfScapula'=>$LevelOfSpineOfScapula]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'LevelOfSpineOfScapula_name' => 'required|max:100',
       
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
           
            $LevelOfSpineOfScapula = new MhpLevelOfSpineOfScapula();
            $LevelOfSpineOfScapula->LevelOfSpineOfScapula_name = $request->LevelOfSpineOfScapula_name;

         $LevelOfSpineOfScapula->save();

            return response()->json(['status'=>200,'message'=>'Level of spine of scapula Added Successfully']);
        }
    }


    public function edit($id)
    {
        $LevelOfSpineOfScapula=MhpLevelOfSpineOfScapula::find($id);
        return response()->json(['status'=>200,'LevelOfSpineOfScapula'=>$LevelOfSpineOfScapula]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'LevelOfSpineOfScapula_name' => 'required|max:100',
         

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
           
            $update_LevelOfSpineOfScapula=MhpLevelOfSpineOfScapula::find($id);
            $update_LevelOfSpineOfScapula->LevelOfSpineOfScapula_name=$request->LevelOfSpineOfScapula_name;
            $update_LevelOfSpineOfScapula->update();

            return response()->json(['status'=>200,'message'=>'Level of spine of scapula Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_LevelOfSpineOfScapula = MhpLevelOfSpineOfScapula::find($id);
        if ($del_LevelOfSpineOfScapula)
        {
            if ($del_LevelOfSpineOfScapula['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_LevelOfSpineOfScapula->delete_status = $delete_status;
            $del_LevelOfSpineOfScapula->save();
            return response()->json([
                'status' => 200,
                'message' => 'Level of spine of scapula deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Level of spine of scapula Found',
            ]);
        }

    }
}

