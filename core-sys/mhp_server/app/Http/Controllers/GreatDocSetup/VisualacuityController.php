<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\MhpVisualacuity;
use Illuminate\Support\Facades\Validator;
class VisualacuityController extends Controller
{
       public function index()
    {
        $visualacuity = MhpVisualacuity::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'visualacuity'=>$visualacuity]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'visualacuity_name' => 'required|max:100',
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
            $visualacuity = new MhpVisualacuity();
            $visualacuity->visualacuity_name = $request->visualacuity_name;
            $visualacuity->status_id = $request->status_id;
            $visualacuity->selection_criteria = $request->selection_criteria;
            $visualacuity->save();

            return response()->json(['status'=>200,'message'=>'Visual Acuity Added Successfully']);
        }
    }


    public function edit($id)
    {
        $visualacuity=MhpVisualacuity::find($id);
        return response()->json(['status'=>200,'visualacuity'=>$visualacuity]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'visualacuity_name' => 'required|max:100',
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
            $update_visualacuity=MhpVisualacuity::find($id);
            $update_visualacuity->visualacuity_name=$request->visualacuity_name;
            $update_visualacuity->status_id=$request->status_id;
            $update_visualacuity->selection_criteria=$request->selection_criteria;
            $update_visualacuity->update();

            return response()->json(['status'=>200,'message'=>'Visual Acuity Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_visualacuity = MhpVisualacuity::find($id);
        if ($del_visualacuity)
        {
            if ($del_visualacuity['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_visualacuity->delete_status = $delete_status;
            $del_visualacuity->save();
            return response()->json([
                'status' => 200,
                'message' => 'Visual Acuity deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Visual Acuity Found',
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
