<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpEar;
use Illuminate\Support\Facades\Validator;

class MhpEarController extends Controller
{
    //
    public function index()
    {
        $Ear = MhpEar::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Ear'=>$Ear]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Ear_name' => 'required|max:100',
       
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
           
            $Ear = new MhpEar();
            $Ear->Ear_name = $request->Ear_name;

         $Ear->save();

            return response()->json(['status'=>200,'message'=>'Ear Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Ear=MhpEar::find($id);
        return response()->json(['status'=>200,'Ear'=>$Ear]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Ear_name' => 'required|max:100',
         

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
           
            $update_Ear=MhpEar::find($id);
            $update_Ear->Ear_name=$request->Ear_name;
            $update_Ear->update();

            return response()->json(['status'=>200,'message'=>'Ear Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Ear = MhpEar::find($id);
        if ($del_Ear)
        {
            if ($del_Ear['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Ear->delete_status = $delete_status;
            $del_Ear->save();
            return response()->json([
                'status' => 200,
                'message' => 'Ear deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Ear Found',
            ]);
        }

    }
}
