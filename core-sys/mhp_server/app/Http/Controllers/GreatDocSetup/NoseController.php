<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpNose;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class NoseController extends Controller
{
    public function index()
    {
        $nose=MhpNose::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'nose'=>$nose]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'nose_name' => 'required|max:100',
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
       $nose=new MhpNose();
       $nose->nose_name=$request->nose_name;
       $nose->status_id=$request->status_id;
       $nose->selection_criteria=$request->selection_criteria;
       $nose->save();

        return response()->json(['status'=>200,'message'=>'Nose Added Successfully']);
    }
}


    public function edit($id)
    {
      $nose=MhpNose::find($id);
        return response()->json(['status'=>200,'nose'=>$nose]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'nose_name' => 'required|max:100',
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
        $update_nose=MhpNose::find($id);
        $update_nose->nose_name=$request->nose_name;
        $update_nose->status_id=$request->status_id;
        $update_nose->selection_criteria=$request->selection_criteria;
        $update_nose->update();

        return response()->json(['status'=>200,'message'=>'Nose Updated Successfully']);
    }
    }

    public function destroy($id)
    {
        $del_nose = MhpNose::find($id);
        if ($del_nose)
        {
            if ($del_nose['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_nose->delete_status = $delete_status;
            $del_nose->save();
            return response()->json([
                'status' => 200,
                'message' => 'Nose deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Nose Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
