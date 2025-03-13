<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MheAttituteTowards;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AttituteTowardsController extends Controller
{
    public function index()
    {
        $attitute = MheAttituteTowards::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'attitute'=>$attitute]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'attitute_name' => 'required|max:100',
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
            $attitute = new MheAttituteTowards();
            $attitute->attitute_name = $request->attitute_name;
            $attitute->status_id = $request->status_id;
            $attitute->selection_criteria = $request->selection_criteria;
            $attitute->save();

            return response()->json(['status'=>200,'message'=>'Attitute Towards Added Successfully']);
        }
    }


    public function edit($id)
    {
        $attitute=MheAttituteTowards::find($id);
        return response()->json(['status'=>200,'attitute'=>$attitute]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'attitute_name' => 'required|max:100',
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
            $update_attitute=MheAttituteTowards::find($id);
            $update_attitute->attitute_name=$request->attitute_name;
            $update_attitute->status_id=$request->status_id;
            $update_attitute->selection_criteria=$request->selection_criteria;
            $update_attitute->update();

            return response()->json(['status'=>200,'message'=>'Attitute Towards Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_attitute = MheAttituteTowards::find($id);
        if ($del_attitute)
        {
            if ($del_attitute['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_attitute->delete_status = $delete_status;
            $del_attitute->save();
            return response()->json([
                'status' => 200,
                'message' => 'Attitute Towards deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Attitute Towards Found',
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