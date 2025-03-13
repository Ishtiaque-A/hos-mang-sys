<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\CnsJawJerk;
use Validator;


class JawJerkController extends Controller
{
    
     public function index()
    {
        $jawjerk=CnsJawJerk::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'jawjerk'=>$jawjerk]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'jawjerk_name' => 'required|max:100',
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
       $jawjerk=new CnsJawJerk();
       $jawjerk->jawjerk_name=$request->jawjerk_name;
       $jawjerk->status_id=$request->status_id;
       $jawjerk->selection_criteria=$request->selection_criteria;
       $jawjerk->save();

        return response()->json(['status'=>200,'message'=>'Jaw jerk Added Successfully']);
    }
}


    public function edit($id)
    {
      $jawjerk=CnsJawJerk::find($id);
        return response()->json(['status'=>200,'jawjerk'=>$jawjerk]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'jawjerk_name' => 'required|max:100',
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
        $update_jawjerk=CnsJawJerk::find($id);
        $update_jawjerk->jawjerk_name=$request->jawjerk_name;
        $update_jawjerk->status_id=$request->status_id;
        $update_jawjerk->selection_criteria=$request->selection_criteria;
        $update_jawjerk->update();

        return response()->json(['status'=>200,'message'=>'Jaw jerk Updated Successfully']);
    }
    }

    public function destroy($id)
    {
        $del_jawjerk = CnsJawJerk::find($id);
        if ($del_jawjerk)
        {
            if ($del_jawjerk['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_jawjerk->delete_status = $delete_status;
            $del_jawjerk->save();
            return response()->json([
                'status' => 200,
                'message' => 'Jaw jerk deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Jaw jerk Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
