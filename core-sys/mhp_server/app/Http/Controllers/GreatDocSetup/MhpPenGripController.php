<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPenGrip;
use Illuminate\Support\Facades\Validator;

class MhpPenGripController extends Controller
{
    //
    public function index()
    {
        $PenGrip = MhpPenGrip::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'PenGrip'=>$PenGrip]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'PenGrip_name' => 'required|max:100',
       
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
           
            $PenGrip = new MhpPenGrip();
            $PenGrip->PenGrip_name = $request->PenGrip_name;

         $PenGrip->save();

            return response()->json(['status'=>200,'message'=>'Pen Grip Added Successfully']);
        }
    }


    public function edit($id)
    {
        $PenGrip=MhpPenGrip::find($id);
        return response()->json(['status'=>200,'PenGrip'=>$PenGrip]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'PenGrip_name' => 'required|max:100',
         

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
           
            $update_PenGrip=MhpPenGrip::find($id);
            $update_PenGrip->PenGrip_name=$request->PenGrip_name;
            $update_PenGrip->update();

            return response()->json(['status'=>200,'message'=>'Pen Grip Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_PenGrip = MhpPenGrip::find($id);
        if ($del_PenGrip)
        {
            if ($del_PenGrip['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_PenGrip->delete_status = $delete_status;
            $del_PenGrip->save();
            return response()->json([
                'status' => 200,
                'message' => 'Pen Grip deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Pen Grip Found',
            ]);
        }

    }
}



