<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpIntermittent;
use Illuminate\Support\Facades\Validator;

class MhpIntermittentController extends Controller
{
    //
    public function index()
    {
        $Intermittent = MhpIntermittent::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'Intermittent'=>$Intermittent]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'Intermittent_name' => 'required|max:100',
       
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
           
            $Intermittent = new MhpIntermittent();
            $Intermittent->Intermittent_name = $request->Intermittent_name;

         $Intermittent->save();

            return response()->json(['status'=>200,'message'=>'Intermittent Added Successfully']);
        }
    }


    public function edit($id)
    {
        $Intermittent=MhpIntermittent::find($id);
        return response()->json(['status'=>200,'Intermittent'=>$Intermittent]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'Intermittent_name' => 'required|max:100',
         

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
           
            $update_Intermittent=MhpIntermittent::find($id);
            $update_Intermittent->Intermittent_name=$request->Intermittent_name;
            $update_Intermittent->update();

            return response()->json(['status'=>200,'message'=>'Intermittent Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_Intermittent = MhpIntermittent::find($id);
        if ($del_Intermittent)
        {
            if ($del_Intermittent['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_Intermittent->delete_status = $delete_status;
            $del_Intermittent->save();
            return response()->json([
                'status' => 200,
                'message' => 'Intermittent deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Intermittent Found',
            ]);
        }

    }
}



