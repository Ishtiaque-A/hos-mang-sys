<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\CnsSensory;
use Illuminate\Support\Facades\Validator;
class SensoryController extends Controller
{
     public function index()
    {
        $sensory = CnsSensory::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'sensory'=>$sensory]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'sensory_name' => 'required|max:100',
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
            $sensory = new CnsSensory();
            $sensory->sensory_name = $request->sensory_name;
            $sensory->status_id = $request->status_id;
            $sensory->selection_criteria = $request->selection_criteria;
            $sensory->save();

            return response()->json(['status'=>200,'message'=>'Sensory Added Successfully']);
        }
    }


    public function edit($id)
    {
        $sensory=CnsSensory::find($id);
        return response()->json(['status'=>200,'sensory'=>$sensory]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'sensory_name' => 'required|max:100',
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
            $update_sensory=CnsSensory::find($id);
            $update_sensory->sensory_name=$request->sensory_name;
            $update_sensory->status_id=$request->status_id;
            $update_sensory->selection_criteria=$request->selection_criteria;
            $update_sensory->update();

            return response()->json(['status'=>200,'message'=>'Sensory Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_sensory = CnsSensory::find($id);
        if ($del_sensory)
        {
            if ($del_sensory['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_sensory->delete_status = $delete_status;
            $del_sensory->save();
            return response()->json([
                'status' => 200,
                'message' => 'Sensory deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Sensory Found',
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
