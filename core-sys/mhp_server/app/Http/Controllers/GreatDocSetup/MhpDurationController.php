<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDuration;
use Illuminate\Support\Facades\Validator;
class MhpDurationController extends Controller
{
    //
    public function index()
    {
        $Duration = MhpDuration::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Duration'=>$Duration]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Duration_name' => 'required|max:100',
       
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
           
            $Duration = new MhpDuration();
            $Duration->Duration_name = $request->Duration_name;

         $Duration->save();

            return response()->json(['status'=>200,'message'=>'Duration Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Duration=MhpDuration::find($id);
        return response()->json(['status'=>200,'Duration'=>$Duration]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Duration_name' => 'required|max:100',
         

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
           
            $update_Duration=MhpDuration::find($id);
            $update_Duration->Duration_name=$request->Duration_name;
            $update_Duration->update();

            return response()->json(['status'=>200,'message'=>'Duration Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Duration = MhpDuration::find($id);
        if ($del_Duration)
        {
            if ($del_Duration['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Duration->delete_status = $delete_status;
            $del_Duration->save();
            return response()->json([
                'status' => 200,
                'message' => 'Duration deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Duration Found',
            ]);
        }

    }
}

