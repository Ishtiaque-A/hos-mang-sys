<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMurmur;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;
class MurmurController extends Controller
{
     public function index()
    {
        $murmur = MhpMurmur::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'murmur'=>$murmur]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'murmur_name' => 'required|max:100',
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
              
            $murmur = new MhpMurmur();
            $murmur->murmur_name = $request->murmur_name;
            $murmur->status_id = $request->status_id;
          
            $murmur->selection_criteria = $request->selection_criteria;
            $murmur->save();

            return response()->json(['status'=>200,'message'=>'Murmur  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $murmur=MhpMurmur::find($id);
        return response()->json(['status'=>200,'murmur'=>$murmur]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'murmur_name' => 'required|max:100',
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
              
            $update_murmur=MhpMurmur::find($id);
            $update_murmur->murmur_name=$request->murmur_name;
            $update_murmur->status_id=$request->status_id;
             
            $update_murmur->selection_criteria=$request->selection_criteria;
            $update_murmur->update();

            return response()->json(['status'=>200,'message'=>'Murmur Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_murmur = MhpMurmur::find($id);
        if ($del_murmur)
        {
            if ($del_murmur['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_murmur->delete_status = $delete_status;
            $del_murmur->save();
            return response()->json([
                'status' => 200,
                'message' => 'Murmur deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No murmur Found',
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
