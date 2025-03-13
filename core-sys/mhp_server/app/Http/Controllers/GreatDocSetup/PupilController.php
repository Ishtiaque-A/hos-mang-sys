<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPupil;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class PupilController extends Controller
{
     public function index()
    {
        $pupil=MhpPupil::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'pupil'=>$pupil]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'pupil_name' => 'required|max:100',
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
       $pupil=new MhpPupil();
       $pupil->pupil_name=$request->pupil_name;
       $pupil->status_id=$request->status_id;
       $pupil->selection_criteria=$request->selection_criteria;
       $pupil->save();

        return response()->json(['status'=>200,'message'=>'pupil Added Successfully']);
    }
}


    public function edit($id)
    {
      $pupil=MhpPupil::find($id);
        return response()->json(['status'=>200,'pupil'=>$pupil]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'pupil_name' => 'required|max:100',
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
        $update_pupil=MhpPupil::find($id);
        $update_pupil->pupil_name=$request->pupil_name;
        $update_pupil->status_id=$request->status_id;
        $update_pupil->selection_criteria=$request->selection_criteria;
        $update_pupil->update();

        return response()->json(['status'=>200,'message'=>'pupil Updated Successfully']);
    }
    }

    public function destroy($id)
    {
        $del_pupil = MhpPupil::find($id);
        if ($del_pupil)
        {
            if ($del_pupil['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_pupil->delete_status = $delete_status;
            $del_pupil->save();
            return response()->json([
                'status' => 200,
                'message' => 'pupil deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No pupil Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
