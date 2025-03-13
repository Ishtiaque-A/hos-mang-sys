<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\CnsDroopingCorner;
use Illuminate\Support\Facades\Validator;
class DroopingCornerController extends Controller
{
    public function index()
    {
        $droopingcorner=CnsDroopingCorner::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'droopingcorner'=>$droopingcorner]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'droopingcorner_name' => 'required|max:100',
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
       $droopingcorner=new CnsDroopingCorner();
       $droopingcorner->droopingcorner_name=$request->droopingcorner_name;
       $droopingcorner->status_id=$request->status_id;
       $droopingcorner->selection_criteria=$request->selection_criteria;
       $droopingcorner->save();

        return response()->json(['status'=>200,'message'=>'Drooping Corner Added Successfully']);
    }
}


    public function edit($id)
    {
      $droopingcorner=CnsDroopingCorner::find($id);
        return response()->json(['status'=>200,'droopingcorner'=>$droopingcorner]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'droopingcorner_name' => 'required|max:100',
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
        $update_droopingcorner=CnsDroopingCorner::find($id);
        $update_droopingcorner->droopingcorner_name=$request->droopingcorner_name;
        $update_droopingcorner->status_id=$request->status_id;
        $update_droopingcorner->selection_criteria=$request->selection_criteria;
        $update_droopingcorner->update();

        return response()->json(['status'=>200,'message'=>'Drooping Corner Updated Successfully']);
    }
    }

    public function destroy($id)
    {
        $del_droopingcorner = CnsDroopingCorner::find($id);
        if ($del_droopingcorner)
        {
            if ($del_droopingcorner['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_droopingcorner->delete_status = $delete_status;
            $del_droopingcorner->save();
            return response()->json([
                'status' => 200,
                'message' => 'Drooping Corner deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Drooping Corner Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
