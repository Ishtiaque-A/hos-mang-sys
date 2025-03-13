<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpArrangements;
use Illuminate\Support\Facades\Validator;

class MhpArrangementsController extends Controller
{
    //
    public function index()
    {
        $Arrangements = MhpArrangements::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Arrangements'=>$Arrangements]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Arrangements_name' => 'required|max:100',
       
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
           
            $Arrangements = new MhpArrangements();
            $Arrangements->Arrangements_name = $request->Arrangements_name;

         $Arrangements->save();

            return response()->json(['status'=>200,'message'=>'Arrangements Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Arrangements=MhpArrangements::find($id);
        return response()->json(['status'=>200,'Arrangements'=>$Arrangements]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Arrangements_name' => 'required|max:100',
         

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
           
            $update_Arrangements=MhpArrangements::find($id);
            $update_Arrangements->Arrangements_name=$request->Arrangements_name;
            $update_Arrangements->update();

            return response()->json(['status'=>200,'message'=>'Arrangements Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Arrangements = MhpArrangements::find($id);
        if ($del_Arrangements)
        {
            if ($del_Arrangements['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Arrangements->delete_status = $delete_status;
            $del_Arrangements->save();
            return response()->json([
                'status' => 200,
                'message' => 'Arrangements deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Arrangements Found',
            ]);
        }

    }
}


