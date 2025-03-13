<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\MhpWorth4Dot;
use Illuminate\Support\Facades\Validator;

class MhpWorth4DotController extends Controller
{
    //
    public function index()
    {
        $Worth4Dot = MhpWorth4Dot::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Worth4Dot'=>$Worth4Dot]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Worth4Dot_name' => 'required|max:100',
       
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
           
            $Worth4Dot = new MhpWorth4Dot();
            $Worth4Dot->Worth4Dot_name = $request->Worth4Dot_name;

         $Worth4Dot->save();

            return response()->json(['status'=>200,'message'=>'Worth-4-Dot Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Worth4Dot=MhpWorth4Dot::find($id);
        return response()->json(['status'=>200,'Worth4Dot'=>$Worth4Dot]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Worth4Dot_name' => 'required|max:100',
         

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
           
            $update_Worth4Dot=MhpWorth4Dot::find($id);
            $update_Worth4Dot->Worth4Dot_name=$request->Worth4Dot_name;
            $update_Worth4Dot->update();

            return response()->json(['status'=>200,'message'=>'Worth-4-Dot Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Worth4Dot = MhpWorth4Dot::find($id);
        if ($del_Worth4Dot)
        {
            if ($del_Worth4Dot['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Worth4Dot->delete_status = $delete_status;
            $del_Worth4Dot->save();
            return response()->json([
                'status' => 200,
                'message' => 'Worth-4-Dot deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Worth-4-Dot Found',
            ]);
        }

    }
}


