<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCripatationBoth;
use Illuminate\Support\Facades\Validator;

class MhpCripatationBothController extends Controller
{
    //
    public function index()
    {
        $CripatationBoth = MhpCripatationBoth::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'CripatationBoth'=>$CripatationBoth]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'CripatationBoth_name' => 'required|max:100',
       
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
           
            $CripatationBoth = new MhpCripatationBoth();
            $CripatationBoth->CripatationBoth_name = $request->CripatationBoth_name;

         $CripatationBoth->save();

            return response()->json(['status'=>200,'message'=>'Cripatation Both Added Successfully']);
        }
    }


    public function edit($id)
    {
        $CripatationBoth=MhpCripatationBoth::find($id);
        return response()->json(['status'=>200,'CripatationBoth'=>$CripatationBoth]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'CripatationBoth_name' => 'required|max:100',
         

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
           
            $update_CripatationBoth=MhpCripatationBoth::find($id);
            $update_CripatationBoth->CripatationBoth_name=$request->CripatationBoth_name;
            $update_CripatationBoth->update();

            return response()->json(['status'=>200,'message'=>'Cripatation Both Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_CripatationBoth = MhpCripatationBoth::find($id);
        if ($del_CripatationBoth)
        {
            if ($del_CripatationBoth['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_CripatationBoth->delete_status = $delete_status;
            $del_CripatationBoth->save();
            return response()->json([
                'status' => 200,
                'message' => 'Cripatation Both deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Cripatation Both Found',
            ]);
        }

    }
}