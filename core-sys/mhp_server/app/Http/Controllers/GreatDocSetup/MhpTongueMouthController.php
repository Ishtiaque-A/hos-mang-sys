<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTongueMouth;
use Illuminate\Support\Facades\Validator;
class MhpTongueMouthController extends Controller
{
    //
    public function index()
    {
        $tonguemouth = MhpTongueMouth::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'tonguemouth'=>$tonguemouth]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'tonguemouth_name' => 'required|max:100',
       
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
           
            $tonguemouth = new MhpTongueMouth();
            $tonguemouth->tonguemouth_name = $request->tonguemouth_name;

         $tonguemouth->save();

            return response()->json(['status'=>200,'message'=>'Tongue Mouth Added Successfully']);
        }
    }


    public function edit($id)
    {
        $tonguemouth=MhpTongueMouth::find($id);
        return response()->json(['status'=>200,'tonguemouth'=>$tonguemouth]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'tonguemouth_name' => 'required|max:100',
         

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
           
            $update_tonguemouth=MhpTongueMouth::find($id);
            $update_tonguemouth->tonguemouth_name=$request->tonguemouth_name;
            $update_tonguemouth->update();

            return response()->json(['status'=>200,'message'=>'Tongue Mouth Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_tonguemouth = MhpTongueMouth::find($id);
        if ($del_tonguemouth)
        {
            if ($del_tonguemouth['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_tonguemouth->delete_status = $delete_status;
            $del_tonguemouth->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tongue Mouth deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tongue Mouth Found',
            ]);
        }

    }
}

