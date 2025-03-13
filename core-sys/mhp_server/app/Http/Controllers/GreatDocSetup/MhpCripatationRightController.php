<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCripatationRight;
use Illuminate\Support\Facades\Validator;

class MhpCripatationRightController extends Controller
{
    //
    public function index()
    {
        $CripatationRight = MhpCripatationRight::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'CripatationRight'=>$CripatationRight]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'CripatationRight_name' => 'required|max:100',
       
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
           
            $CripatationRight = new MhpCripatationRight();
            $CripatationRight->CripatationRight_name = $request->CripatationRight_name;

         $CripatationRight->save();

            return response()->json(['status'=>200,'message'=>'Cripatation Right Added Successfully']);
        }
    }


    public function edit($id)
    {
        $CripatationRight=MhpCripatationRight::find($id);
        return response()->json(['status'=>200,'CripatationRight'=>$CripatationRight]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'CripatationRight_name' => 'required|max:100',
         

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
           
            $update_CripatationRight=MhpCripatationRight::find($id);
            $update_CripatationRight->CripatationRight_name=$request->CripatationRight_name;
            $update_CripatationRight->update();

            return response()->json(['status'=>200,'message'=>'Cripatation Right Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_CripatationRight = MhpCripatationRight::find($id);
        if ($del_CripatationRight)
        {
            if ($del_CripatationRight['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_CripatationRight->delete_status = $delete_status;
            $del_CripatationRight->save();
            return response()->json([
                'status' => 200,
                'message' => 'Cripatation Right deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Cripatation Right Found',
            ]);
        }

    }
}



