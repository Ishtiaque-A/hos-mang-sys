<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLesionMiddle;
use Illuminate\Support\Facades\Validator;
class MhpLesionMiddleController extends Controller
{
    //
    public function index()
    {
        $LesionMiddle = MhpLesionMiddle::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'LesionMiddle'=>$LesionMiddle]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'LesionMiddle_name' => 'required|max:100',
       
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
           
            $LesionMiddle = new MhpLesionMiddle();
            $LesionMiddle->LesionMiddle_name = $request->LesionMiddle_name;

         $LesionMiddle->save();

            return response()->json(['status'=>200,'message'=>'Lesion Middle Added Successfully']);
        }
    }


    public function edit($id)
    {
        $LesionMiddle=MhpLesionMiddle::find($id);
        return response()->json(['status'=>200,'LesionMiddle'=>$LesionMiddle]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'LesionMiddle_name' => 'required|max:100',
         

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
           
            $update_LesionMiddle=MhpLesionMiddle::find($id);
            $update_LesionMiddle->LesionMiddle_name=$request->LesionMiddle_name;
            $update_LesionMiddle->update();

            return response()->json(['status'=>200,'message'=>'Lesion Middle Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_LesionMiddle = MhpLesionMiddle::find($id);
        if ($del_LesionMiddle)
        {
            if ($del_LesionMiddle['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_LesionMiddle->delete_status = $delete_status;
            $del_LesionMiddle->save();
            return response()->json([
                'status' => 200,
                'message' => 'Lesion Middle deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Lesion Middle Found',
            ]);
        }

    }
}



