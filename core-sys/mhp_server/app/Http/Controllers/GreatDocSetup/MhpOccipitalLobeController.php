<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpOccipitalLobe;
use Illuminate\Support\Facades\Validator;

class MhpOccipitalLobeController extends Controller
{
    //
    public function index()
    {
        $OccipitalLobe = MhpOccipitalLobe::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'OccipitalLobe'=>$OccipitalLobe]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'OccipitalLobe_name' => 'required|max:100',
       
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
           
            $OccipitalLobe = new MhpOccipitalLobe();
            $OccipitalLobe->OccipitalLobe_name = $request->OccipitalLobe_name;

         $OccipitalLobe->save();

            return response()->json(['status'=>200,'message'=>'Occipital Lobe Added Successfully']);
        }
    }


    public function edit($id)
    {
        $OccipitalLobe=MhpOccipitalLobe::find($id);
        return response()->json(['status'=>200,'OccipitalLobe'=>$OccipitalLobe]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'OccipitalLobe_name' => 'required|max:100',
         

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
           
            $update_OccipitalLobe=MhpOccipitalLobe::find($id);
            $update_OccipitalLobe->OccipitalLobe_name=$request->OccipitalLobe_name;
            $update_OccipitalLobe->update();

            return response()->json(['status'=>200,'message'=>'Occipital Lobe Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_OccipitalLobe = MhpOccipitalLobe::find($id);
        if ($del_OccipitalLobe)
        {
            if ($del_OccipitalLobe['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_OccipitalLobe->delete_status = $delete_status;
            $del_OccipitalLobe->save();
            return response()->json([
                'status' => 200,
                'message' => 'Occipital Lobe deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Occipital Lobe Found',
            ]);
        }

    }
}


