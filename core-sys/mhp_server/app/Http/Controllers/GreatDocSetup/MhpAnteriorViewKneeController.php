<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpAnteriorViewKnee;
use Illuminate\Support\Facades\Validator;

class MhpAnteriorViewKneeController extends Controller
{
    //
    public function index()
    {
        $anteriorViewKnee = MhpAnteriorViewKnee::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'anteriorViewKnee'=>$anteriorViewKnee]);
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
           
            $anteriorViewKnee = new MhpAnteriorViewKnee();
            $anteriorViewKnee->name = $request->name;

         $anteriorViewKnee->save();

            return response()->json(['status'=>200,'message'=>'Anterior View Knee Added Successfully']);
        }
    }


    public function edit($id)
    {
        $anteriorViewKnee=MhpAnteriorViewKnee::find($id);
        return response()->json(['status'=>200,'anteriorViewKnee'=>$anteriorViewKnee]);
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
           
            $update_anteriorViewKnee=MhpAnteriorViewKnee::find($id);
            $update_anteriorViewKnee->name=$request->name;
            $update_anteriorViewKnee->update();

            return response()->json(['status'=>200,'message'=>'Anterior View Knee Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_anteriorViewKnee = MhpAnteriorViewKnee::find($id);
        if ($del_anteriorViewKnee)
        {
            if ($del_anteriorViewKnee['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_anteriorViewKnee->delete_status = $delete_status;
            $del_anteriorViewKnee->save();
            return response()->json([
                'status' => 200,
                'message' => 'Anterior View Knee deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Anterior View Knee Found',
            ]);
        }

    }
}


