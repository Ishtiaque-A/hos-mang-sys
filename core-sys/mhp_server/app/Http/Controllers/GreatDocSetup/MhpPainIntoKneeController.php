<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPainIntoKnee;
use Illuminate\Support\Facades\Validator;

class MhpPainIntoKneeController extends Controller
{
    //
    public function index()
    {
        $PainIntoKnee = MhpPainIntoKnee::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'PainIntoKnee'=>$PainIntoKnee]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'PainIntoKnee_name' => 'required|max:100',
       
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
           
            $PainIntoKnee = new MhpPainIntoKnee();
            $PainIntoKnee->PainIntoKnee_name = $request->PainIntoKnee_name;

         $PainIntoKnee->save();

            return response()->json(['status'=>200,'message'=>'Pain Into Knee Added Successfully']);
        }
    }


    public function edit($id)
    {
        $PainIntoKnee=MhpPainIntoKnee::find($id);
        return response()->json(['status'=>200,'PainIntoKnee'=>$PainIntoKnee]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'PainIntoKnee_name' => 'required|max:100',
         

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
           
            $update_PainIntoKnee=MhpPainIntoKnee::find($id);
            $update_PainIntoKnee->PainIntoKnee_name=$request->PainIntoKnee_name;
            $update_PainIntoKnee->update();

            return response()->json(['status'=>200,'message'=>'Pain Into Knee Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_PainIntoKnee = MhpPainIntoKnee::find($id);
        if ($del_PainIntoKnee)
        {
            if ($del_PainIntoKnee['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_PainIntoKnee->delete_status = $delete_status;
            $del_PainIntoKnee->save();
            return response()->json([
                'status' => 200,
                'message' => 'Pain Into Knee deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Pain Into Knee Found',
            ]);
        }

    }
}

