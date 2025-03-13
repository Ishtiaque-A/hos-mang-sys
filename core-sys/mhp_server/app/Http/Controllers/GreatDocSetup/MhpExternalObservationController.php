<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpExternalObservation;
use Illuminate\Support\Facades\Validator;

class MhpExternalObservationController extends Controller
{
    //
    public function index()
    {
        $ExternalObservation = MhpExternalObservation::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'ExternalObservation'=>$ExternalObservation]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'ExternalObservation_name' => 'required|max:100',
       
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
           
            $ExternalObservation = new MhpExternalObservation();
            $ExternalObservation->ExternalObservation_name = $request->ExternalObservation_name;

         $ExternalObservation->save();

            return response()->json(['status'=>200,'message'=>'External Observation Added Successfully']);
        }
    }


    public function edit($id)
    {
        $ExternalObservation=MhpExternalObservation::find($id);
        return response()->json(['status'=>200,'ExternalObservation'=>$ExternalObservation]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'ExternalObservation_name' => 'required|max:100',
         

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
           
            $update_ExternalObservation=MhpExternalObservation::find($id);
            $update_ExternalObservation->ExternalObservation_name=$request->ExternalObservation_name;
            $update_ExternalObservation->update();

            return response()->json(['status'=>200,'message'=>'External Observation Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_ExternalObservation = MhpExternalObservation::find($id);
        if ($del_ExternalObservation)
        {
            if ($del_ExternalObservation['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_ExternalObservation->delete_status = $delete_status;
            $del_ExternalObservation->save();
            return response()->json([
                'status' => 200,
                'message' => 'External Observation deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No External Observation Found',
            ]);
        }

    }
}


