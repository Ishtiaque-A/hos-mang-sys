<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpParietalLobe;
use Illuminate\Support\Facades\Validator;

class MhpParietalLobeController extends Controller
{
    //
    public function index()
    {
        $ParietalLobe = MhpParietalLobe::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'ParietalLobe'=>$ParietalLobe]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'ParietalLobe_name' => 'required|max:100',
       
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
           
            $ParietalLobe = new MhpParietalLobe();
            $ParietalLobe->ParietalLobe_name = $request->ParietalLobe_name;

         $ParietalLobe->save();

            return response()->json(['status'=>200,'message'=>'Parietal Lobe Added Successfully']);
        }
    }


    public function edit($id)
    {
        $ParietalLobe=MhpParietalLobe::find($id);
        return response()->json(['status'=>200,'ParietalLobe'=>$ParietalLobe]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'ParietalLobe_name' => 'required|max:100',
         

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
           
            $update_ParietalLobe=MhpParietalLobe::find($id);
            $update_ParietalLobe->ParietalLobe_name=$request->ParietalLobe_name;
            $update_ParietalLobe->update();

            return response()->json(['status'=>200,'message'=>'Parietal Lobe Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_ParietalLobe = MhpParietalLobe::find($id);
        if ($del_ParietalLobe)
        {
            if ($del_ParietalLobe['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_ParietalLobe->delete_status = $delete_status;
            $del_ParietalLobe->save();
            return response()->json([
                'status' => 200,
                'message' => 'Parietal Lobe deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Parietal Lobe Found',
            ]);
        }

    }
}


