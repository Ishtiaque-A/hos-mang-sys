<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSpine;
use Illuminate\Support\Facades\Validator;

class MhpSpineController extends Controller
{
    //
    public function index()
    {
        $Spine = MhpSpine::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Spine'=>$Spine]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Spine_name' => 'required|max:100',
       
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
           
            $Spine = new MhpSpine();
            $Spine->Spine_name = $request->Spine_name;

         $Spine->save();

            return response()->json(['status'=>200,'message'=>'Spine Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Spine=MhpSpine::find($id);
        return response()->json(['status'=>200,'Spine'=>$Spine]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Spine_name' => 'required|max:100',
         

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
           
            $update_Spine=MhpSpine::find($id);
            $update_Spine->Spine_name=$request->Spine_name;
            $update_Spine->update();

            return response()->json(['status'=>200,'message'=>'Spine Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Spine = MhpSpine::find($id);
        if ($del_Spine)
        {
            if ($del_Spine['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Spine->delete_status = $delete_status;
            $del_Spine->save();
            return response()->json([
                'status' => 200,
                'message' => 'Spine deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Spine Found',
            ]);
        }

    }
}
