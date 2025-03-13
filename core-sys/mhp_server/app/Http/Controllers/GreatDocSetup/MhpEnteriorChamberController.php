<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpEnteriorChamber;
use Illuminate\Support\Facades\Validator;

class MhpEnteriorChamberController extends Controller
{
    //
    public function index()
    {
        $EnteriorChamber = MhpEnteriorChamber::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'EnteriorChamber'=>$EnteriorChamber]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'EnteriorChamber_name' => 'required|max:100',
       
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
           
            $EnteriorChamber = new MhpEnteriorChamber();
            $EnteriorChamber->EnteriorChamber_name = $request->EnteriorChamber_name;

         $EnteriorChamber->save();

            return response()->json(['status'=>200,'message'=>'Enterior Chamber Added Successfully']);
        }
    }


    public function edit($id)
    {
        $EnteriorChamber=MhpEnteriorChamber::find($id);
        return response()->json(['status'=>200,'EnteriorChamber'=>$EnteriorChamber]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'EnteriorChamber_name' => 'required|max:100',
         

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
           
            $update_EnteriorChamber=MhpEnteriorChamber::find($id);
            $update_EnteriorChamber->EnteriorChamber_name=$request->EnteriorChamber_name;
            $update_EnteriorChamber->update();

            return response()->json(['status'=>200,'message'=>'Enterior Chamber Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_EnteriorChamber = MhpEnteriorChamber::find($id);
        if ($del_EnteriorChamber)
        {
            if ($del_EnteriorChamber['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_EnteriorChamber->delete_status = $delete_status;
            $del_EnteriorChamber->save();
            return response()->json([
                'status' => 200,
                'message' => 'Enterior Chamber deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Enterior Chamber Found',
            ]);
        }

    }
}

