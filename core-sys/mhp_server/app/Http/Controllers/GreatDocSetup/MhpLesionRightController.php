<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLesionRight;
use Illuminate\Support\Facades\Validator;

class MhpLesionRightController extends Controller
{
    //
    public function index()
    {
        $LesionRight = MhpLesionRight::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'LesionRight'=>$LesionRight]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'LesionRight_name' => 'required|max:100',
       
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
           
            $LesionRight = new MhpLesionRight();
            $LesionRight->LesionRight_name = $request->LesionRight_name;

         $LesionRight->save();

            return response()->json(['status'=>200,'message'=>'Lesion Right Added Successfully']);
        }
    }


    public function edit($id)
    {
        $LesionRight=MhpLesionRight::find($id);
        return response()->json(['status'=>200,'LesionRight'=>$LesionRight]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'LesionRight_name' => 'required|max:100',
         

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
           
            $update_LesionRight=MhpLesionRight::find($id);
            $update_LesionRight->LesionRight_name=$request->LesionRight_name;
            $update_LesionRight->update();

            return response()->json(['status'=>200,'message'=>'Lesion Right Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_LesionRight = MhpLesionRight::find($id);
        if ($del_LesionRight)
        {
            if ($del_LesionRight['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_LesionRight->delete_status = $delete_status;
            $del_LesionRight->save();
            return response()->json([
                'status' => 200,
                'message' => 'Lesion Right deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Lesion Right Found',
            ]);
        }

    }
}


