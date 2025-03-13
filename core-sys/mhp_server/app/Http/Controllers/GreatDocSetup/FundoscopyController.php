<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\MhpFundoscopy;
use Illuminate\Support\Facades\Validator;
class FundoscopyController extends Controller
{
     public function index()
    {
        $fundoscopy = MhpFundoscopy::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'fundoscopy'=>$fundoscopy]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'fundoscopy_name' => 'required|max:100',
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
            $fundoscopy = new MhpFundoscopy();
            $fundoscopy->fundoscopy_name = $request->fundoscopy_name;
            $fundoscopy->status_id = $request->status_id;
            $fundoscopy->selection_criteria = $request->selection_criteria;
            $fundoscopy->save();

            return response()->json(['status'=>200,'message'=>'Fundos Copy Added Successfully']);
        }
    }


    public function edit($id)
    {
        $fundoscopy=MhpFundoscopy::find($id);
        return response()->json(['status'=>200,'fundoscopy'=>$fundoscopy]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'fundoscopy_name' => 'required|max:100',
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
            $update_fundoscopy=MhpFundoscopy::find($id);
            $update_fundoscopy->fundoscopy_name=$request->fundoscopy_name;
            $update_fundoscopy->status_id=$request->status_id;
            $update_fundoscopy->selection_criteria=$request->selection_criteria;
            $update_fundoscopy->update();

            return response()->json(['status'=>200,'message'=>'Fundos Copy Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_fundoscopy = MhpFundoscopy::find($id);
        if ($del_fundoscopy)
        {
            if ($del_fundoscopy['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_fundoscopy->delete_status = $delete_status;
            $del_fundoscopy->save();
            return response()->json([
                'status' => 200,
                'message' => 'Fundos Copy deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Fundos Copy Found',
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
