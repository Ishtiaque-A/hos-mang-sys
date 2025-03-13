<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MheAppropriteness;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class AppropritenessController extends Controller
{
    public function index()
    {
        $appropriteness = MheAppropriteness::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'appropriteness'=>$appropriteness]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'appropriteness_name' => 'required|max:100',
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
            $appropriteness = new MheAppropriteness();
            $appropriteness->appropriteness_name = $request->appropriteness_name;
            $appropriteness->status_id = $request->status_id;
            $appropriteness->selection_criteria = $request->selection_criteria;
            $appropriteness->save();

            return response()->json(['status'=>200,'message'=>'appropriteness Added Successfully']);
        }
    }


    public function edit($id)
    {
        $appropriteness=MheAppropriteness::find($id);
        return response()->json(['status'=>200,'appropriteness'=>$appropriteness]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'appropriteness_name' => 'required|max:100',
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
            $update_appropriteness=MheAppropriteness::find($id);
            $update_appropriteness->appropriteness_name=$request->appropriteness_name;
            $update_appropriteness->status_id=$request->status_id;
            $update_appropriteness->selection_criteria=$request->selection_criteria;
            $update_appropriteness->update();

            return response()->json(['status'=>200,'message'=>'appropriteness Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_appropriteness = MheAppropriteness::find($id);
        if ($del_appropriteness)
        {
            if ($del_appropriteness['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_appropriteness->delete_status = $delete_status;
            $del_appropriteness->save();
            return response()->json([
                'status' => 200,
                'message' => 'appropriteness deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No appropriteness Found',
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
