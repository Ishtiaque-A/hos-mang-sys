<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpDeafness;
use Illuminate\Support\Facades\Validator;

class MhpDeafnessController extends Controller
{
    //
    public function index()
    {
        $Deafness = MhpDeafness::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Deafness'=>$Deafness]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Deafness_name' => 'required|max:100',
       
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
           
            $Deafness = new MhpDeafness();
            $Deafness->Deafness_name = $request->Deafness_name;

         $Deafness->save();

            return response()->json(['status'=>200,'message'=>'Deafness Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Deafness=MhpDeafness::find($id);
        return response()->json(['status'=>200,'Deafness'=>$Deafness]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Deafness_name' => 'required|max:100',
         

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
           
            $update_Deafness=MhpDeafness::find($id);
            $update_Deafness->Deafness_name=$request->Deafness_name;
            $update_Deafness->update();

            return response()->json(['status'=>200,'message'=>'Deafness Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Deafness = MhpDeafness::find($id);
        if ($del_Deafness)
        {
            if ($del_Deafness['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Deafness->delete_status = $delete_status;
            $del_Deafness->save();
            return response()->json([
                'status' => 200,
                'message' => 'Deafness deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Deafness Found',
            ]);
        }

    }
}

