<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MheMood;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MoodController extends Controller
{
     //

    public function index()
    {
        $mood = MheMood::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'mood'=>$mood]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'mood_name' => 'required|max:100',
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
            $mood = new MheMood();
            $mood->mood_name = $request->mood_name;
            $mood->status_id = $request->status_id;
            $mood->selection_criteria = $request->selection_criteria;
            $mood->save();

            return response()->json(['status'=>200,'message'=>'Mood Added Successfully']);
        }
    }


    public function edit($id)
    {
        $mood=MheMood::find($id);
        return response()->json(['status'=>200,'mood'=>$mood]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'mood_name' => 'required|max:100',
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
            $update_mood=MheMood::find($id);
            $update_mood->mood_name=$request->mood_name;
            $update_mood->status_id=$request->status_id;
            $update_mood->selection_criteria=$request->selection_criteria;
            $update_mood->update();

            return response()->json(['status'=>200,'message'=>'Mood Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_mood = MheMood::find($id);
        if ($del_mood)
        {
            if ($del_mood['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_mood->delete_status = $delete_status;
            $del_mood->save();
            return response()->json([
                'status' => 200,
                'message' => 'Mood deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Mood Found',
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
