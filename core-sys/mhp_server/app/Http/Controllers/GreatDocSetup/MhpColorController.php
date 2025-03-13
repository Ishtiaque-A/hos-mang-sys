<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpColor;
use Illuminate\Support\Facades\Validator;

class MhpColorController extends Controller
{
    //
    public function index()
    {
        $Color = MhpColor::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Color'=>$Color]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Color_name' => 'required|max:100',
       
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
           
            $Color = new MhpColor();
            $Color->Color_name = $request->Color_name;

         $Color->save();

            return response()->json(['status'=>200,'message'=>'Color Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Color=MhpColor::find($id);
        return response()->json(['status'=>200,'Color'=>$Color]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Color_name' => 'required|max:100',
         

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
           
            $update_Color=MhpColor::find($id);
            $update_Color->Color_name=$request->Color_name;
            $update_Color->update();

            return response()->json(['status'=>200,'message'=>'Color Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Color = MhpColor::find($id);
        if ($del_Color)
        {
            if ($del_Color['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Color->delete_status = $delete_status;
            $del_Color->save();
            return response()->json([
                'status' => 200,
                'message' => 'Color deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Color Found',
            ]);
        }

    }
}


