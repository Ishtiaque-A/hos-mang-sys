<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpRediation;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;
class RediationController extends Controller
{
       
    public function index()
    {
        $rediation = MhpRediation::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'rediation'=>$rediation]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'rediation_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
        ],
        ['status_id.required' => 'Status field is required!']
         );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
              
            $rediation = new MhpRediation();
            $rediation->rediation_name = $request->rediation_name;
            $rediation->status_id = $request->status_id;
          
            $rediation->selection_criteria = $request->selection_criteria;
            $rediation->save();

            return response()->json(['status'=>200,'message'=>'Rediation  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $rediation=MhpRediation::find($id);
        return response()->json(['status'=>200,'rediation'=>$rediation]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'rediation_name' => 'required|max:100',
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
              
            $update_rediation=MhpRediation::find($id);
            $update_rediation->rediation_name=$request->rediation_name;
            $update_rediation->status_id=$request->status_id;
             
            $update_rediation->selection_criteria=$request->selection_criteria;
            $update_rediation->update();

            return response()->json(['status'=>200,'message'=>'Rediation Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_rediation = MhpRediation::find($id);
        if ($del_rediation)
        {
            if ($del_rediation['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_rediation->delete_status = $delete_status;
            $del_rediation->save();
            return response()->json([
                'status' => 200,
                'message' => 'Rediation deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No rediation Found',
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
