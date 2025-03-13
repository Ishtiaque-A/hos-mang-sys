<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhePerceptual;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PerceptualController extends Controller
{
     //

    public function index()
    {
        $perceptual = MhePerceptual::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'perceptual'=>$perceptual]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'perceptual_name' => 'required|max:100',
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
            $perceptual = new MhePerceptual();
            $perceptual->perceptual_name = $request->perceptual_name;
            $perceptual->status_id = $request->status_id;
            $perceptual->selection_criteria = $request->selection_criteria;
            $perceptual->save();

            return response()->json(['status'=>200,'message'=>'Perceptual Disturbances Added Successfully']);
        }
    }


    public function edit($id)
    {
        $perceptual=MhePerceptual::find($id);
        return response()->json(['status'=>200,'perceptual'=>$perceptual]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'perceptual_name' => 'required|max:100',
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
            $update_perceptual=MhePerceptual::find($id);
            $update_perceptual->perceptual_name=$request->perceptual_name;
            $update_perceptual->status_id=$request->status_id;
            $update_perceptual->selection_criteria=$request->selection_criteria;
            $update_perceptual->update();

            return response()->json(['status'=>200,'message'=>'Perceptual Disturbances Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_perceptual = MhePerceptual::find($id);
        if ($del_perceptual)
        {
            if ($del_perceptual['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_perceptual->delete_status = $delete_status;
            $del_perceptual->save();
            return response()->json([
                'status' => 200,
                'message' => 'Perceptual Disturbances deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No perceptual Found',
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
