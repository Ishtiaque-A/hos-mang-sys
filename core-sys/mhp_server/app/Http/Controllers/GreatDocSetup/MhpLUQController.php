<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLUQ;
use Illuminate\Support\Facades\Validator;

class MhpLUQController extends Controller
{
    //
    public function index()
    {
        $LUQ = MhpLUQ::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'LUQ'=>$LUQ]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'LUQ_name' => 'required|max:100',
       
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
           
            $LUQ = new MhpLUQ();
            $LUQ->LUQ_name = $request->LUQ_name;

         $LUQ->save();

            return response()->json(['status'=>200,'message'=>'LUQ Added Successfully']);
        }
    }


    public function edit($id)
    {
        $LUQ=MhpLUQ::find($id);
        return response()->json(['status'=>200,'LUQ'=>$LUQ]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'LUQ_name' => 'required|max:100',
         

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
           
            $update_LUQ=MhpLUQ::find($id);
            $update_LUQ->LUQ_name=$request->LUQ_name;
            $update_LUQ->update();

            return response()->json(['status'=>200,'message'=>'LUQ Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_LUQ = MhpLUQ::find($id);
        if ($del_LUQ)
        {
            if ($del_LUQ['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_LUQ->delete_status = $delete_status;
            $del_LUQ->save();
            return response()->json([
                'status' => 200,
                'message' => 'LUQ deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No LUQ Found',
            ]);
        }

    }
}
