<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\CnsLookingUp;
use Illuminate\Support\Facades\Validator;
class LookingUpController extends Controller
{
    
     public function index()
    {
        $lookingup=CnsLookingUp::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'lookingup'=>$lookingup]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'lookingup_name' => 'required|max:100',
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
       $lookingup=new CnsLookingUp();
       $lookingup->lookingup_name=$request->lookingup_name;
       $lookingup->status_id=$request->status_id;
       $lookingup->selection_criteria=$request->selection_criteria;
       $lookingup->save();

        return response()->json(['status'=>200,'message'=>'Jaw jerk Added Successfully']);
    }
}


    public function edit($id)
    {
      $lookingup=CnsLookingUp::find($id);
        return response()->json(['status'=>200,'lookingup'=>$lookingup]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'lookingup_name' => 'required|max:100',
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
        $update_lookingup=CnsLookingUp::find($id);
        $update_lookingup->lookingup_name=$request->lookingup_name;
        $update_lookingup->status_id=$request->status_id;
        $update_lookingup->selection_criteria=$request->selection_criteria;
        $update_lookingup->update();

        return response()->json(['status'=>200,'message'=>'Jaw jerk Updated Successfully']);
    }
    }

    public function destroy($id)
    {
        $del_lookingup = CnsLookingUp::find($id);
        if ($del_lookingup)
        {
            if ($del_lookingup['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_lookingup->delete_status = $delete_status;
            $del_lookingup->save();
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
