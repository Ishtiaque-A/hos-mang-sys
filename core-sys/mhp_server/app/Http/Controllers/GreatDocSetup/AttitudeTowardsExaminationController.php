<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MheAttitudeTowardsExamination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AttitudeTowardsExaminationController extends Controller
{
    //

    public function index()
    {
        $attitude_towards_examination = MheAttitudeTowardsExamination::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'attitude_towards_examination'=>$attitude_towards_examination]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'attitude_towards_examination_name' => 'required|max:100',
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
            $attitude_towards_examination = new MheAttitudeTowardsExamination();
            $attitude_towards_examination->attitude_towards_examination_name = $request->attitude_towards_examination_name;
            $attitude_towards_examination->status_id = $request->status_id;
            $attitude_towards_examination->selection_criteria = $request->selection_criteria;
            $attitude_towards_examination->save();

            return response()->json(['status'=>200,'message'=>'Attitude Towards Examination Added Successfully']);
        }
    }


    public function edit($id)
    {
        $attitude_towards_examination=MheAttitudeTowardsExamination::find($id);
        return response()->json(['status'=>200,'attitude_towards_examination'=>$attitude_towards_examination]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'attitude_towards_examination_name' => 'required|max:100',
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
            $update_attitude_towards_examination=MheAttitudeTowardsExamination::find($id);
            $update_attitude_towards_examination->attitude_towards_examination_name=$request->attitude_towards_examination_name;
            $update_attitude_towards_examination->status_id=$request->status_id;
            $update_attitude_towards_examination->selection_criteria=$request->selection_criteria;
            $update_attitude_towards_examination->update();

            return response()->json(['status'=>200,'message'=>'Attitude Towards Examination Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_attitude_towards_examination = MheAttitudeTowardsExamination::find($id);
        if ($del_attitude_towards_examination)
        {
            if ($del_attitude_towards_examination['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_attitude_towards_examination->delete_status = $delete_status;
            $del_attitude_towards_examination->save();
            return response()->json([
                'status' => 200,
                'message' => 'Attitude Towards Examination deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Attitude Towards Examination Found',
            ]);
        }


    }

}
