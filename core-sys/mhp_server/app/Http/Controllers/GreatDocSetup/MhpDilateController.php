<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDilate;
use Illuminate\Support\Facades\Validator;

class MhpDilateController extends Controller
{
    //
    public function index()
    {
        $Dilate = MhpDilate::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Dilate'=>$Dilate]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Dilate_name' => 'required|max:100',
       
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
           
            $Dilate = new MhpDilate();
            $Dilate->Dilate_name = $request->Dilate_name;

         $Dilate->save();

            return response()->json(['status'=>200,'message'=>'Dilate Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Dilate=MhpDilate::find($id);
        return response()->json(['status'=>200,'Dilate'=>$Dilate]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Dilate_name' => 'required|max:100',
         

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
           
            $update_Dilate=MhpDilate::find($id);
            $update_Dilate->Dilate_name=$request->Dilate_name;
            $update_Dilate->update();

            return response()->json(['status'=>200,'message'=>'Dilate Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Dilate = MhpDilate::find($id);
        if ($del_Dilate)
        {
            if ($del_Dilate['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Dilate->delete_status = $delete_status;
            $del_Dilate->save();
            return response()->json([
                'status' => 200,
                'message' => 'Dilate deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Dilate Found',
            ]);
        }

    }
}



