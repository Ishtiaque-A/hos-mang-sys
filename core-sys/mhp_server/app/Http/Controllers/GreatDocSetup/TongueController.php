<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTongue;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class TongueController extends Controller
{
    public function index()
    {
        $tongue=MhpTongue::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'tongue'=>$tongue]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'tongue_name' => 'required|max:100',
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
       $tongue=new MhpTongue();
       $tongue->tongue_name=$request->tongue_name;
       $tongue->status_id=$request->status_id;
       $tongue->selection_criteria=$request->selection_criteria;
       $tongue->save();

        return response()->json(['status'=>200,'message'=>'Tongue Added Successfully']);
    }
}


    public function edit($id)
    {
      $tongue=MhpTongue::find($id);
        return response()->json(['status'=>200,'tongue'=>$tongue]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'tongue_name' => 'required|max:100',
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
        $update_tongue=MhpTongue::find($id);
        $update_tongue->tongue_name=$request->tongue_name;
        $update_tongue->status_id=$request->status_id;
        $update_tongue->selection_criteria=$request->selection_criteria;
        $update_tongue->update();

        return response()->json(['status'=>200,'message'=>'Tongue Updated Successfully']);
    }
    }

    public function destroy($id)
    {
        $del_tongue = MhpTongue::find($id);
        if ($del_tongue)
        {
            if ($del_tongue['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_tongue->delete_status = $delete_status;
            $del_tongue->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tongue deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tongue Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
