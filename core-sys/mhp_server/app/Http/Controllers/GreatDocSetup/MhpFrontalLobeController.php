<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpFrontalLobe;
use Illuminate\Support\Facades\Validator;
class MhpFrontalLobeController extends Controller
{
    //
    public function index()
    {
        $FrontalLobe = MhpFrontalLobe::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'FrontalLobe'=>$FrontalLobe]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'FrontalLobe_name' => 'required|max:100',
       
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
           
            $FrontalLobe = new MhpFrontalLobe();
            $FrontalLobe->FrontalLobe_name = $request->FrontalLobe_name;

         $FrontalLobe->save();

            return response()->json(['status'=>200,'message'=>'Frontal Lobe Added Successfully']);
        }
    }


    public function edit($id)
    {
        $FrontalLobe=MhpFrontalLobe::find($id);
        return response()->json(['status'=>200,'FrontalLobe'=>$FrontalLobe]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'FrontalLobe_name' => 'required|max:100',
         

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
           
            $update_FrontalLobe=MhpFrontalLobe::find($id);
            $update_FrontalLobe->FrontalLobe_name=$request->FrontalLobe_name;
            $update_FrontalLobe->update();

            return response()->json(['status'=>200,'message'=>'Frontal Lobe Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_FrontalLobe = MhpFrontalLobe::find($id);
        if ($del_FrontalLobe)
        {
            if ($del_FrontalLobe['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_FrontalLobe->delete_status = $delete_status;
            $del_FrontalLobe->save();
            return response()->json([
                'status' => 200,
                'message' => 'Frontal Lobe deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Frontal Lobe Found',
            ]);
        }

    }
}

