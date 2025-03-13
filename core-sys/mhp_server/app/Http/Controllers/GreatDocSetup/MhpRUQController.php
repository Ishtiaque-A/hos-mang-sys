<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\MhpRUQ;
use Illuminate\Support\Facades\Validator;

class MhpRUQController extends Controller

{
    //
    public function index()
    {
        $RUQ = MhpRUQ::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'RUQ'=>$RUQ]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'RUQ_name' => 'required|max:100',
       
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
           
            $RUQ = new MhpRUQ();
            $RUQ->RUQ_name = $request->RUQ_name;

         $RUQ->save();

            return response()->json(['status'=>200,'message'=>'RUQ Added Successfully']);
        }
    }


    public function edit($id)
    {
        $RUQ=MhpRUQ::find($id);
        return response()->json(['status'=>200,'RUQ'=>$RUQ]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'RUQ_name' => 'required|max:100',
         

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
           
            $update_RUQ=MhpRUQ::find($id);
            $update_RUQ->RUQ_name=$request->RUQ_name;
            $update_RUQ->update();

            return response()->json(['status'=>200,'message'=>'RUQ Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_RUQ = MhpRUQ::find($id);
        if ($del_RUQ)
        {
            if ($del_RUQ['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_RUQ->delete_status = $delete_status;
            $del_RUQ->save();
            return response()->json([
                'status' => 200,
                'message' => 'RUQ deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No RUQ Found',
            ]);
        }

    }
}


