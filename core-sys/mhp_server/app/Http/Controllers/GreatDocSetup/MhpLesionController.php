<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLesion;
use Illuminate\Support\Facades\Validator;
class MhpLesionController extends Controller
{
    //
    public function index()
    {
        $Lesion = MhpLesion::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Lesion'=>$Lesion]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Lesion_name' => 'required|max:100',
       
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
           
            $Lesion = new MhpLesion();
            $Lesion->Lesion_name = $request->Lesion_name;

         $Lesion->save();

            return response()->json(['status'=>200,'message'=>'Lesion Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Lesion=MhpLesion::find($id);
        return response()->json(['status'=>200,'Lesion'=>$Lesion]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Lesion_name' => 'required|max:100',
         

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
           
            $update_Lesion=MhpLesion::find($id);
            $update_Lesion->Lesion_name=$request->Lesion_name;
            $update_Lesion->update();

            return response()->json(['status'=>200,'message'=>'Lesion Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Lesion = MhpLesion::find($id);
        if ($del_Lesion)
        {
            if ($del_Lesion['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Lesion->delete_status = $delete_status;
            $del_Lesion->save();
            return response()->json([
                'status' => 200,
                'message' => 'Lesion deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Lesion Found',
            ]);
        }

    }
}
