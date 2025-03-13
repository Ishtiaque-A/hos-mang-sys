<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSkin;
use Illuminate\Support\Facades\Validator;

class MhpSkinController extends Controller
{
    //
    public function index()
    {
        $skin = MhpSkin::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'skin'=>$skin]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'skin_name' => 'required|max:100',
       
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
           
            $skin = new MhpSkin();
            $skin->skin_name = $request->skin_name;

         $skin->save();

            return response()->json(['status'=>200,'message'=>'Skin Added Successfully']);
        }
    }


    public function edit($id)
    {
        $skin=MhpSkin::find($id);
        return response()->json(['status'=>200,'skin'=>$skin]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'skin_name' => 'required|max:100',
         

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
           
            $update_skin=MhpSkin::find($id);
            $update_skin->skin_name=$request->skin_name;
            $update_skin->update();

            return response()->json(['status'=>200,'message'=>'Skin Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_skin = MhpSkin::find($id);
        if ($del_skin)
        {
            if ($del_skin['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_skin->delete_status = $delete_status;
            $del_skin->save();
            return response()->json([
                'status' => 200,
                'message' => 'Skin deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Skin Found',
            ]);
        }

    }
}


