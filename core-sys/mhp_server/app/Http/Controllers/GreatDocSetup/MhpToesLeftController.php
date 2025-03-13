<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpToesLeft;
use Illuminate\Support\Facades\Validator;

class MhpToesLeftController extends Controller
{
    //
    public function index()
    {
        $toesLeft = MhpToesLeft::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'toesLeft'=>$toesLeft]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
       
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
           
            $toesLeft = new MhpToesLeft();
            $toesLeft->name = $request->name;

         $toesLeft->save();

            return response()->json(['status'=>200,'message'=>'Toes Left Added Successfully']);
        }
    }


    public function edit($id)
    {
        $toesLeft=MhpToesLeft::find($id);
        return response()->json(['status'=>200,'toesLeft'=>$toesLeft]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'name' => 'required|max:100',
         
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
           
            $update_toesLeft=MhpToesLeft::find($id);
            $update_toesLeft->name=$request->name;
            $update_toesLeft->update();

            return response()->json(['status'=>200,'message'=>'Toes Left Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_toesLeft = MhpToesLeft::find($id);
        if ($del_toesLeft)
        {
            if ($del_toesLeft['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_toesLeft->delete_status = $delete_status;
            $del_toesLeft->save();
            return response()->json([
                'status' => 200,
                'message' => 'Toes Left deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Toes Left Found',
            ]);
        }

    }
}



