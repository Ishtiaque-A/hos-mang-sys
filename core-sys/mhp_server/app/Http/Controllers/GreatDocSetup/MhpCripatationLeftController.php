<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCripatationLeft;
use Illuminate\Support\Facades\Validator;

class MhpCripatationLeftController extends Controller
{
    //
    public function index()
    {
        $CripatationLeft = MhpCripatationLeft::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'CripatationLeft'=>$CripatationLeft]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'CripatationLeft_name' => 'required|max:100',
       
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
           
            $CripatationLeft = new MhpCripatationLeft();
            $CripatationLeft->CripatationLeft_name = $request->CripatationLeft_name;

         $CripatationLeft->save();

            return response()->json(['status'=>200,'message'=>'Cripatation Left Added Successfully']);
        }
    }


    public function edit($id)
    {
        $CripatationLeft=MhpCripatationLeft::find($id);
        return response()->json(['status'=>200,'CripatationLeft'=>$CripatationLeft]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'CripatationLeft_name' => 'required|max:100',
         

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
           
            $update_CripatationLeft=MhpCripatationLeft::find($id);
            $update_CripatationLeft->CripatationLeft_name=$request->CripatationLeft_name;
            $update_CripatationLeft->update();

            return response()->json(['status'=>200,'message'=>'Cripatation Left Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_CripatationLeft = MhpCripatationLeft::find($id);
        if ($del_CripatationLeft)
        {
            if ($del_CripatationLeft['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_CripatationLeft->delete_status = $delete_status;
            $del_CripatationLeft->save();
            return response()->json([
                'status' => 200,
                'message' => 'Cripatation Left deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Cripatation Left Found',
            ]);
        }

    }
}
