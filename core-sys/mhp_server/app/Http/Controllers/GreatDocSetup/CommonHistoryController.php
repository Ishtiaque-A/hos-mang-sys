<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCommonHistory;
use App\Models\MhpExaminationHeading;
use Illuminate\Support\Facades\Validator;

class CommonHistoryController extends Controller
{
      public function index()
    {
        $commonHistory = MhpCommonHistory::with('examination_heading')->where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'commonHistory'=>$commonHistory]);
    }

    

    public function CommonHistory_Cardivascular()
    {
        $findID = MhpExaminationHeading::where('examinationHeading_name','like', "%cardivascular%")->first();

        $commonHistory = MhpCommonHistory::with('examination_heading')->where('examination_id',$findID['id'])->where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'commonHistory'=>$commonHistory]);
    }

    public function commonHistory_Respiratory()
    {
        $findID = MhpExaminationHeading::where('examinationHeading_name','like', "%respiratory%")->first();

        $commonHistory = MhpCommonHistory::with('examination_heading')->where('examination_id',$findID['id'])->where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'commonHistory'=>$commonHistory]);
    }

    public function commonHistory_gestro()
    {
        $findID = MhpExaminationHeading::where('examinationHeading_name','like', "%gastro%")->first();

        $commonHistory = MhpCommonHistory::with('examination_heading')->where('examination_id',$findID['id'])->where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'commonHistory'=>$commonHistory]);
    }

    public function commonHistory_general()
    {
        $findID = MhpExaminationHeading::where('examinationHeading_name','like', "%general%")->first();

        $commonHistory = MhpCommonHistory::with('examination_heading')->where('examination_id',$findID['id'])->where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json(
            ['status'=>200,'commonHistory'=>$commonHistory]);
    }

    public function commonHistory_for_all($name)
    {
        $findID = MhpExaminationHeading::where('examinationHeading_name','like', "%$name%")->first();

        $commonHistory = MhpCommonHistory::with('examination_heading')->where('examination_id',$findID['id'])->where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json(
            ['status'=>200,'commonHistory'=>$commonHistory]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'history_name' => 'required|max:100',
            'status_id' => 'required',
        ],['status_id.required' => 'Status field is required!'] );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $commonHistory = new MhpCommonHistory();
            $commonHistory->history_name = $request->history_name;
            $commonHistory->examination_id = $request->status_id;
            $commonHistory->save();

            return response()->json(['status'=>200,'message'=>'Common History Added Successfully']);
        }
    }


    public function edit($id)
    {
        $commonHistory=MhpCommonHistory::find($id);
        return response()->json(['status'=>200,'commonHistory'=>$commonHistory]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'history_name' => 'required|max:100',
            'status_id' => 'required',
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
            $update_commonHistory=MhpCommonHistory::find($id);
            $update_commonHistory->history_name=$request->history_name;
            $update_commonHistory->examination_id=$request->status_id;
            $update_commonHistory->update();

            return response()->json(['status'=>200,'message'=>'Common History  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_commonHistory = MhpCommonHistory::find($id);
        if ($del_commonHistory)
        {
            if ($del_commonHistory['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_commonHistory->delete_status = $delete_status;
            $del_commonHistory->save();
            return response()->json([
                'status' => 200,
                'message' => 'Common History  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Common History  Found',
            ]);
        }


    }
    public function examination_dropdown(){
        $status_list = MhpExaminationHeading::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status'=>200,
            'status_list'=>$status_list
        ]);
    }
}
