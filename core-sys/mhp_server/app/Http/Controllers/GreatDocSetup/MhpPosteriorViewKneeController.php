<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPosteriorViewKnee;
use Illuminate\Support\Facades\Validator;

class MhpPosteriorViewKneeController extends Controller
{
    //
    public function index()
    {
        $posteriorViewKnee = MhpPosteriorViewKnee::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'posteriorViewKnee'=>$posteriorViewKnee]);
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
           
            $posteriorViewKnee = new MhpPosteriorViewKnee();
            $posteriorViewKnee->name = $request->name;

         $posteriorViewKnee->save();

            return response()->json(['status'=>200,'message'=>'Posterior View Knee Added Successfully']);
        }
    }


    public function edit($id)
    {
        $posteriorViewKnee=MhpPosteriorViewKnee::find($id);
        return response()->json(['status'=>200,'posteriorViewKnee'=>$posteriorViewKnee]);
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
           
            $update_posteriorViewKnee=MhpPosteriorViewKnee::find($id);
            $update_posteriorViewKnee->name=$request->name;
            $update_posteriorViewKnee->update();

            return response()->json(['status'=>200,'message'=>'Posterior View Knee Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_posteriorViewKnee = MhpPosteriorViewKnee::find($id);
        if ($del_posteriorViewKnee)
        {
            if ($del_posteriorViewKnee['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_posteriorViewKnee->delete_status = $delete_status;
            $del_posteriorViewKnee->save();
            return response()->json([
                'status' => 200,
                'message' => 'Posterior View Knee deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Posterior View Knee Found',
            ]);
        }

    }
}



