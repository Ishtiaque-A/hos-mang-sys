<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpStanceSwatKnee;
use Illuminate\Support\Facades\Validator;

class MhpStanceSwatKneeController extends Controller
{
    //
    public function index()
    {
        $stanceSwatKnee = MhpStanceSwatKnee::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'stanceSwatKnee'=>$stanceSwatKnee]);
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
           
            $stanceSwatKnee = new MhpStanceSwatKnee();
            $stanceSwatKnee->name = $request->name;

         $stanceSwatKnee->save();

            return response()->json(['status'=>200,'message'=>'Stance Swat Knee Added Successfully']);
        }
    }


    public function edit($id)
    {
        $stanceSwatKnee=MhpStanceSwatKnee::find($id);
        return response()->json(['status'=>200,'stanceSwatKnee'=>$stanceSwatKnee]);
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
           
            $update_stanceSwatKnee=MhpStanceSwatKnee::find($id);
            $update_stanceSwatKnee->name=$request->name;
            $update_stanceSwatKnee->update();

            return response()->json(['status'=>200,'message'=>'Stance Swat Knee Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_stanceSwatKnee = MhpStanceSwatKnee::find($id);
        if ($del_stanceSwatKnee)
        {
            if ($del_stanceSwatKnee['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_stanceSwatKnee->delete_status = $delete_status;
            $del_stanceSwatKnee->save();
            return response()->json([
                'status' => 200,
                'message' => 'Stance Swat Knee deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Stance Swat Knee Found',
            ]);
        }

    }
}


