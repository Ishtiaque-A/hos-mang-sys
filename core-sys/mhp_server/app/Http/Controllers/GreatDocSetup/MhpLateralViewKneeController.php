<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLateralViewKnee;
use Illuminate\Support\Facades\Validator;

class MhpLateralViewKneeController extends Controller
{
    //
    public function index()
    {
        $lateralViewKnee = MhpLateralViewKnee::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'lateralViewKnee'=>$lateralViewKnee]);
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
           
            $lateralViewKnee = new MhpLateralViewKnee();
            $lateralViewKnee->name = $request->name;

         $lateralViewKnee->save();

            return response()->json(['status'=>200,'message'=>'Lateral View Knee Added Successfully']);
        }
    }


    public function edit($id)
    {
        $lateralViewKnee=MhpLateralViewKnee::find($id);
        return response()->json(['status'=>200,'lateralViewKnee'=>$lateralViewKnee]);
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
           
            $update_lateralViewKnee=MhpLateralViewKnee::find($id);
            $update_lateralViewKnee->name=$request->name;
            $update_lateralViewKnee->update();

            return response()->json(['status'=>200,'message'=>'Lateral View Knee Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_lateralViewKnee = MhpLateralViewKnee::find($id);
        if ($del_lateralViewKnee)
        {
            if ($del_lateralViewKnee['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_lateralViewKnee->delete_status = $delete_status;
            $del_lateralViewKnee->save();
            return response()->json([
                'status' => 200,
                'message' => 'Lateral View Knee deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Lateral View Knee Found',
            ]);
        }

    }
}



