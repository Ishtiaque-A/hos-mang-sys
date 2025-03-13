<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MreAbnormalBreathing;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;

class AbnormalBreathingController extends Controller
{
    
  //

    public function index()
    {
        $abnormalbreathing = MreAbnormalBreathing::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'abnormalbreathing'=>$abnormalbreathing]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'abnormalbreathing_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
             'image'=>'required',

        ],['status_id.required' => 'Status field is required!'] );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/', $name);
        } 
            $abnormalbreathing = new MreAbnormalBreathing();
            $abnormalbreathing->abnormalbreathing_name = $request->abnormalbreathing_name;
            $abnormalbreathing->status_id = $request->status_id;
            $abnormalbreathing->selection_criteria = $request->selection_criteria;
            $abnormalbreathing->image = $name;
            $abnormalbreathing->save();

            return response()->json(['status'=>200,'message'=>'Abnormal Breathing  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $abnormalbreathing=MreAbnormalBreathing::find($id);
        return response()->json(['status'=>200,'abnormalbreathing'=>$abnormalbreathing]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'abnormalbreathing_name' => 'required|max:100',
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
            if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/', $name);
        } 
            $update_abnormalbreathing=MreAbnormalBreathing::find($id);
            $update_abnormalbreathing->abnormalbreathing_name=$request->abnormalbreathing_name;
            $update_abnormalbreathing->status_id=$request->status_id;
            $update_abnormalbreathing->selection_criteria=$request->selection_criteria;
            if ($files != null) {
          $update_abnormalbreathing->image=$name; 
               }
            $update_abnormalbreathing->update();

            return response()->json(['status'=>200,'message'=>'Abnormal Breathing Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_abnormalbreathing = MreAbnormalBreathing::find($id);
        if ($del_abnormalbreathing)
        {
            if ($del_abnormalbreathing['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_abnormalbreathing->delete_status = $delete_status;
            $del_abnormalbreathing->save();
            return response()->json([
                'status' => 200,
                'message' => 'Abnormal Breathing deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No abnormalbreathing Found',
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

