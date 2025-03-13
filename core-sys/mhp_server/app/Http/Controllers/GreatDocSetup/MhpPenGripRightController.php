<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPenGripRight;
use Illuminate\Support\Facades\Validator;

class MhpPenGripRightController extends Controller
{
    //
    public function index()
    {
        $PenGripRight = MhpPenGripRight::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'PenGripRight'=>$PenGripRight]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'PenGripRight_name' => 'required|max:100',
       
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
           
            $PenGripRight = new MhpPenGripRight();
            $PenGripRight->PenGripRight_name = $request->PenGripRight_name;

         $PenGripRight->save();

            return response()->json(['status'=>200,'message'=>'Pen Grip Right Added Successfully']);
        }
    }


    public function edit($id)
    {
        $PenGripRight=MhpPenGripRight::find($id);
        return response()->json(['status'=>200,'PenGripRight'=>$PenGripRight]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'PenGripRight_name' => 'required|max:100',
         

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
           
            $update_PenGripRight=MhpPenGripRight::find($id);
            $update_PenGripRight->PenGripRight_name=$request->PenGripRight_name;
            $update_PenGripRight->update();

            return response()->json(['status'=>200,'message'=>'Pen Grip Right Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_PenGripRight = MhpPenGripRight::find($id);
        if ($del_PenGripRight)
        {
            if ($del_PenGripRight['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_PenGripRight->delete_status = $delete_status;
            $del_PenGripRight->save();
            return response()->json([
                'status' => 200,
                'message' => 'Pen Grip Right deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Pen Grip Right Found',
            ]);
        }

    }
}



