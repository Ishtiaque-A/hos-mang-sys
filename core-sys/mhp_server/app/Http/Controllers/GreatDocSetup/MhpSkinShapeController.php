<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSkinShape;
use Illuminate\Support\Facades\Validator;

class MhpSkinShapeController extends Controller
{
    //
    public function index()
    {
        $SkinShape = MhpSkinShape::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'SkinShape'=>$SkinShape]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'SkinShape_name' => 'required|max:100',
       
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
           
            $SkinShape = new MhpSkinShape();
            $SkinShape->SkinShape_name = $request->SkinShape_name;

         $SkinShape->save();

            return response()->json(['status'=>200,'message'=>'Skin Shape Added Successfully']);
        }
    }


    public function edit($id)
    {
        $SkinShape=MhpSkinShape::find($id);
        return response()->json(['status'=>200,'SkinShape'=>$SkinShape]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'SkinShape_name' => 'required|max:100',
         

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
           
            $update_SkinShape=MhpSkinShape::find($id);
            $update_SkinShape->SkinShape_name=$request->SkinShape_name;
            $update_SkinShape->update();

            return response()->json(['status'=>200,'message'=>'Skin Shape Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_SkinShape = MhpSkinShape::find($id);
        if ($del_SkinShape)
        {
            if ($del_SkinShape['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_SkinShape->delete_status = $delete_status;
            $del_SkinShape->save();
            return response()->json([
                'status' => 200,
                'message' => 'Skin Shape deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Skin Shape Found',
            ]);
        }

    }
}


