<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTemporalLobe;
use Illuminate\Support\Facades\Validator;

class MhpTemporalLobeController extends Controller
{
    //
    public function index()
    {
        $TemporalLobe = MhpTemporalLobe::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'TemporalLobe'=>$TemporalLobe]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'TemporalLobe_name' => 'required|max:100',
       
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
           
            $TemporalLobe = new MhpTemporalLobe();
            $TemporalLobe->TemporalLobe_name = $request->TemporalLobe_name;

         $TemporalLobe->save();

            return response()->json(['status'=>200,'message'=>'Temporal Lobe Added Successfully']);
        }
    }


    public function edit($id)
    {
        $TemporalLobe=MhpTemporalLobe::find($id);
        return response()->json(['status'=>200,'TemporalLobe'=>$TemporalLobe]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'TemporalLobe_name' => 'required|max:100',
         

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
           
            $update_TemporalLobe=MhpTemporalLobe::find($id);
            $update_TemporalLobe->TemporalLobe_name=$request->TemporalLobe_name;
            $update_TemporalLobe->update();

            return response()->json(['status'=>200,'message'=>'Temporal Lobe Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_TemporalLobe = MhpTemporalLobe::find($id);
        if ($del_TemporalLobe)
        {
            if ($del_TemporalLobe['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_TemporalLobe->delete_status = $delete_status;
            $del_TemporalLobe->save();
            return response()->json([
                'status' => 200,
                'message' => 'Temporal Lobe deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Temporal Lobe Found',
            ]);
        }

    }
}

