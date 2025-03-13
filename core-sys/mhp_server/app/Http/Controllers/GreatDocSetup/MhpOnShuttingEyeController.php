<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpOnShuttingEye;
use Illuminate\Support\Facades\Validator;

class MhpOnShuttingEyeController extends Controller
{
    //
    public function index()
    {
        $onshuttingeye = MhpOnShuttingEye::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'onshuttingeye'=>$onshuttingeye]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'onshuttingeye_name' => 'required|max:100',
       
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
           
            $onshuttingeye = new MhpOnShuttingEye();
            $onshuttingeye->onshuttingeye_name = $request->onshuttingeye_name;

         $onshuttingeye->save();

            return response()->json(['status'=>200,'message'=>'On Shutting Eye Added Successfully']);
        }
    }


    public function edit($id)
    {
        $onshuttingeye=MhpOnShuttingEye::find($id);
        return response()->json(['status'=>200,'onshuttingeye'=>$onshuttingeye]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'onshuttingeye_name' => 'required|max:100',
         

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
           
            $update_onshuttingeye=MhpOnShuttingEye::find($id);
            $update_onshuttingeye->onshuttingeye_name=$request->onshuttingeye_name;
            $update_onshuttingeye->update();

            return response()->json(['status'=>200,'message'=>'On Shutting Eye Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_onshuttingeye = MhpOnShuttingEye::find($id);
        if ($del_onshuttingeye)
        {
            if ($del_onshuttingeye['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_onshuttingeye->delete_status = $delete_status;
            $del_onshuttingeye->save();
            return response()->json([
                'status' => 200,
                'message' => 'On Shutting Eye deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No On Shutting Eye Found',
            ]);
        }

    }
}

