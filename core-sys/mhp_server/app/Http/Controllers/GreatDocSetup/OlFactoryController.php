<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\MhpOlFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OlFactoryController extends Controller
{
    public function index()
    {
        $olfactory = MhpOlFactory::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'olfactory'=>$olfactory]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'olfactory_name' => 'required|max:100',
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
            $olfactory = new MhpOlFactory();
            $olfactory->olfactory_name = $request->olfactory_name;
            $olfactory->status_id = $request->status_id;
            $olfactory->selection_criteria = $request->selection_criteria;
            $olfactory->save();

            return response()->json(['status'=>200,'message'=>'OL Factory Added Successfully']);
        }
    }


    public function edit($id)
    {
        $olfactory=MhpOlFactory::find($id);
        return response()->json(['status'=>200,'olfactory'=>$olfactory]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'olfactory_name' => 'required|max:100',
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
            $update_olfactory=MhpOlFactory::find($id);
            $update_olfactory->olfactory_name=$request->olfactory_name;
            $update_olfactory->status_id=$request->status_id;
            $update_olfactory->selection_criteria=$request->selection_criteria;
            $update_olfactory->update();

            return response()->json(['status'=>200,'message'=>'OL Factory Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_olfactory = MhpOlFactory::find($id);
        if ($del_olfactory)
        {
            if ($del_olfactory['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_olfactory->delete_status = $delete_status;
            $del_olfactory->save();
            return response()->json([
                'status' => 200,
                'message' => 'OL Factory deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No OL Factory Found',
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
