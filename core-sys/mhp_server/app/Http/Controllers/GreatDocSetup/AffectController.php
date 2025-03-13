<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MheAffect;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class AffectController extends Controller
{
    
    public function index()
    {
        $affect = MheAffect::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'affect'=>$affect]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'affect_name' => 'required|max:100',
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
            $affect = new MheAffect();
            $affect->affect_name = $request->affect_name;
            $affect->status_id = $request->status_id;
            $affect->selection_criteria = $request->selection_criteria;
            $affect->save();

            return response()->json(['status'=>200,'message'=>'Affect Added Successfully']);
        }
    }


    public function edit($id)
    {
        $affect=MheAffect::find($id);
        return response()->json(['status'=>200,'affect'=>$affect]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'affect_name' => 'required|max:100',
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
            $update_affect=MheAffect::find($id);
            $update_affect->affect_name=$request->affect_name;
            $update_affect->status_id=$request->status_id;
            $update_affect->selection_criteria=$request->selection_criteria;
            $update_affect->update();

            return response()->json(['status'=>200,'message'=>'Affect Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_affect = MheAffect::find($id);
        if ($del_affect)
        {
            if ($del_affect['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_affect->delete_status = $delete_status;
            $del_affect->save();
            return response()->json([
                'status' => 200,
                'message' => 'Affect deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No affect Found',
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
