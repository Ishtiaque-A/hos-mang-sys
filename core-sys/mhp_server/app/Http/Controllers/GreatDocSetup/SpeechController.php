<?php

namespace App\Http\Controllers\GreatDocSetup;
use App\Http\Controllers\Controller;

use App\Models\MheSpeech;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SpeechController extends Controller
{
    
    public function index()
    {
        $speech = MheSpeech::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'speech'=>$speech]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'speech_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
        ],['status_id.required' => 'Status field is required!'] );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $speech = new MheSpeech();
            $speech->speech_name = $request->speech_name;
            $speech->status_id = $request->status_id;
            $speech->selection_criteria = $request->selection_criteria;
            $speech->save();

            return response()->json(['status'=>200,'message'=>'Speech Added Successfully']);
        }
    }


    public function edit($id)
    {
        $speech=MheSpeech::find($id);
        return response()->json(['status'=>200,'speech'=>$speech]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'speech_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
        ],
            ['status_id.required'=>'Status field is required']
        );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_speech=MheSpeech::find($id);
            $update_speech->speech_name=$request->speech_name;
            $update_speech->status_id=$request->status_id;
            $update_speech->selection_criteria=$request->selection_criteria;
            $update_speech->update();

            return response()->json(['status'=>200,'message'=>'Speech  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_speech = MheSpeech::find($id);
        if ($del_speech)
        {
            if ($del_speech['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_speech->delete_status = $delete_status;
            $del_speech->save();
            return response()->json([
                'status' => 200,
                'message' => 'Speech  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Speech  Found',
            ]);
        }


    }
    public function examination_dropdown(){
        $status_list = MhpHistoryExaminationStatus::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status'=>200,
            'status_list'=>$status_list
        ]);
    }

}
