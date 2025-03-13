<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPalpation;
use Illuminate\Support\Facades\Validator;

class MhpPalpationController extends Controller
{
    //
    public function index()
    {
        $Palpation = MhpPalpation::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Palpation'=>$Palpation]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Palpation_name' => 'required|max:100',
       
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
           
            $Palpation = new MhpPalpation();
            $Palpation->Palpation_name = $request->Palpation_name;

         $Palpation->save();

            return response()->json(['status'=>200,'message'=>'Palpation Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Palpation=MhpPalpation::find($id);
        return response()->json(['status'=>200,'Palpation'=>$Palpation]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Palpation_name' => 'required|max:100',
         

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
           
            $update_Palpation=MhpPalpation::find($id);
            $update_Palpation->Palpation_name=$request->Palpation_name;
            $update_Palpation->update();

            return response()->json(['status'=>200,'message'=>'Palpation Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Palpation = MhpPalpation::find($id);
        if ($del_Palpation)
        {
            if ($del_Palpation['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Palpation->delete_status = $delete_status;
            $del_Palpation->save();
            return response()->json([
                'status' => 200,
                'message' => 'Palpation deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Palpation Found',
            ]);
        }

    }
}


