<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSpeechNurologies;
use Illuminate\Support\Facades\Validator;

class MhpSpeechNurologiesController extends Controller
{
    //
    public function index()
    {
        $SpeechNurologies = MhpSpeechNurologies::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'SpeechNurologies'=>$SpeechNurologies]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'SpeechNurologies_name' => 'required|max:100',
       
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
           
            $SpeechNurologies = new MhpSpeechNurologies();
            $SpeechNurologies->SpeechNurologies_name = $request->SpeechNurologies_name;

         $SpeechNurologies->save();

            return response()->json(['status'=>200,'message'=>'Speech Added Successfully']);
        }
    }


    public function edit($id)
    {
        $SpeechNurologies=MhpSpeechNurologies::find($id);
        return response()->json(['status'=>200,'SpeechNurologies'=>$SpeechNurologies]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'SpeechNurologies_name' => 'required|max:100',
         

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
           
            $update_SpeechNurologies=MhpSpeechNurologies::find($id);
            $update_SpeechNurologies->SpeechNurologies_name=$request->SpeechNurologies_name;
            $update_SpeechNurologies->update();

            return response()->json(['status'=>200,'message'=>'Speech Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_SpeechNurologies = MhpSpeechNurologies::find($id);
        if ($del_SpeechNurologies)
        {
            if ($del_SpeechNurologies['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_SpeechNurologies->delete_status = $delete_status;
            $del_SpeechNurologies->save();
            return response()->json([
                'status' => 200,
                'message' => 'Speech deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Speech Found',
            ]);
        }

    }
}


