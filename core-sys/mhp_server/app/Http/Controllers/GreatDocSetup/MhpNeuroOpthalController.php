<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpNeuroOpthal;
use Illuminate\Support\Facades\Validator;

class MhpNeuroOpthalController extends Controller
{
    //
    public function index()
    {
        $NeuroOpthal = MhpNeuroOpthal::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'NeuroOpthal'=>$NeuroOpthal]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'NeuroOpthal_name' => 'required|max:100',
       
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
           
            $NeuroOpthal = new MhpNeuroOpthal();
            $NeuroOpthal->NeuroOpthal_name = $request->NeuroOpthal_name;

         $NeuroOpthal->save();

            return response()->json(['status'=>200,'message'=>'Neuro Opthal Added Successfully']);
        }
    }


    public function edit($id)
    {
        $NeuroOpthal=MhpNeuroOpthal::find($id);
        return response()->json(['status'=>200,'NeuroOpthal'=>$NeuroOpthal]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'NeuroOpthal_name' => 'required|max:100',
         

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
           
            $update_NeuroOpthal=MhpNeuroOpthal::find($id);
            $update_NeuroOpthal->NeuroOpthal_name=$request->NeuroOpthal_name;
            $update_NeuroOpthal->update();

            return response()->json(['status'=>200,'message'=>'Neuro Opthal Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        // $del_NeuroOpthal = MhpNeuroOpthal::find($id);
        // if ($del_NeuroOpthal)
        // {
        //     if ($del_NeuroOpthal['delete_status']==0){
        //         $delete_status = 1;
        //     }else{
        //         $delete_status = 0;
        //     }
        //     $del_NeuroOpthal->delete_status = $delete_status;
        //     $del_NeuroOpthal->save();
        //     return response()->json([
        //         'status' => 200,
        //         'message' => 'Neuro Opthal deleted successfully',
        //     ]);

        // }else{
        //     return response()->json([
        //         'status' => 404,
        //         'message' => 'No Neuro Opthal Found',
        //     ]);
        // }
        $del_NeuroOpthal = MhpNeuroOpthal::find($id);
        if ($del_NeuroOpthal)
        {
            if ($del_NeuroOpthal['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            dd($delete_status);
            $del_NeuroOpthal->delete_status = $delete_status;
            $del_NeuroOpthal->save();
            return response()->json([
                'status' => 200,
                'message' => 'Neuro Opthal deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Neuro Opthal Found',
            ]);
        }


    }
}



