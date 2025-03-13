<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMovement;
use Illuminate\Support\Facades\Validator;

class MhpMovementController extends Controller
{
    //
    public function index()
    {
        $Movement = MhpMovement::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Movement'=>$Movement]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Movement_name' => 'required|max:100',
       
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
           
            $Movement = new MhpMovement();
            $Movement->Movement_name = $request->Movement_name;

         $Movement->save();

            return response()->json(['status'=>200,'message'=>'Movement Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Movement=MhpMovement::find($id);
        return response()->json(['status'=>200,'Movement'=>$Movement]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Movement_name' => 'required|max:100',
         

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
           
            $update_Movement=MhpMovement::find($id);
            $update_Movement->Movement_name=$request->Movement_name;
            $update_Movement->update();

            return response()->json(['status'=>200,'message'=>'Movement Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Movement = MhpMovement::find($id);
        if ($del_Movement)
        {
            if ($del_Movement['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Movement->delete_status = $delete_status;
            $del_Movement->save();
            return response()->json([
                'status' => 200,
                'message' => 'Movement deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Movement Found',
            ]);
        }

    }
}




