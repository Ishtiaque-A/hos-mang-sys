<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsWhisperTest;
use App\Models\MhpHistoryExaminationStatus;
use Validator;

class WhisperTestController extends Controller
{
    public function index()
    {
        $whispertest=CnsWhisperTest::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'whispertest'=>$whispertest]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'whispertest_name' => 'required|max:100',
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
       $whispertest=new CnsWhisperTest();
       $whispertest->whispertest_name=$request->whispertest_name;
       $whispertest->status_id=$request->status_id;
       $whispertest->selection_criteria=$request->selection_criteria;
       $whispertest->save();

        return response()->json(['status'=>200,'message'=>'Whisper Test Added Successfully']);
    }
}


    public function edit($id)
    {
      $whispertest=CnsWhisperTest::find($id);
        return response()->json(['status'=>200,'whispertest'=>$whispertest]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'whispertest_name' => 'required|max:100',
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
        $update_whispertest=CnsWhisperTest::find($id);
        $update_whispertest->whispertest_name=$request->whispertest_name;
        $update_whispertest->status_id=$request->status_id;
        $update_whispertest->selection_criteria=$request->selection_criteria;
        $update_whispertest->update();

        return response()->json(['status'=>200,'message'=>'Whisper Test Updated Successfully']);
    }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $del_whispertest = CnsWhisperTest::find($id);
        if ($del_whispertest)
        {
            if ($del_whispertest['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_whispertest->delete_status = $delete_status;
            $del_whispertest->save();
            return response()->json([
                'status' => 200,
                'message' => 'Whisper Test deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Whisper Test Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
