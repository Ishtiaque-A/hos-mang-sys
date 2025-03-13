<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPhoriaTwo;
use Illuminate\Support\Facades\Validator;

class MhpPhoriaTwoController extends Controller
{
    //
    public function index()
    {
        $PhoriaTwo = MhpPhoriaTwo::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'PhoriaTwo'=>$PhoriaTwo]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'PhoriaTwo_name' => 'required|max:100',
       
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
           
            $PhoriaTwo = new MhpPhoriaTwo();
            $PhoriaTwo->PhoriaTwo_name = $request->PhoriaTwo_name;

         $PhoriaTwo->save();

            return response()->json(['status'=>200,'message'=>'Phoria Two Added Successfully']);
        }
    }


    public function edit($id)
    {
        $PhoriaTwo=MhpPhoriaTwo::find($id);
        return response()->json(['status'=>200,'PhoriaTwo'=>$PhoriaTwo]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'PhoriaTwo_name' => 'required|max:100',
         

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
           
            $update_PhoriaTwo=MhpPhoriaTwo::find($id);
            $update_PhoriaTwo->PhoriaTwo_name=$request->PhoriaTwo_name;
            $update_PhoriaTwo->update();

            return response()->json(['status'=>200,'message'=>'Phoria Two Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_PhoriaTwo = MhpPhoriaTwo::find($id);
        if ($del_PhoriaTwo)
        {
            if ($del_PhoriaTwo['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_PhoriaTwo->delete_status = $delete_status;
            $del_PhoriaTwo->save();
            return response()->json([
                'status' => 200,
                'message' => 'Phoria Two deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Phoria Two Found',
            ]);
        }

    }
}



