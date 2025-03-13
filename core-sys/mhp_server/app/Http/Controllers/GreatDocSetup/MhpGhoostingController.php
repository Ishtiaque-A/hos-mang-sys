<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpGhoosting;
use Illuminate\Support\Facades\Validator;

class MhpGhoostingController extends Controller
{
    //
    public function index()
    {
        $Ghoosting = MhpGhoosting::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Ghoosting'=>$Ghoosting]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Ghoosting_name' => 'required|max:100',
       
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
           
            $Ghoosting = new MhpGhoosting();
            $Ghoosting->Ghoosting_name = $request->Ghoosting_name;

         $Ghoosting->save();

            return response()->json(['status'=>200,'message'=>'Ghoosting Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Ghoosting=MhpGhoosting::find($id);
        return response()->json(['status'=>200,'Ghoosting'=>$Ghoosting]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Ghoosting_name' => 'required|max:100',
         

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
           
            $update_Ghoosting=MhpGhoosting::find($id);
            $update_Ghoosting->Ghoosting_name=$request->Ghoosting_name;
            $update_Ghoosting->update();

            return response()->json(['status'=>200,'message'=>'Ghoosting Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Ghoosting = MhpGhoosting::find($id);
        if ($del_Ghoosting)
        {
            if ($del_Ghoosting['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Ghoosting->delete_status = $delete_status;
            $del_Ghoosting->save();
            return response()->json([
                'status' => 200,
                'message' => 'Ghoosting deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Ghoosting Found',
            ]);
        }

    }
}


