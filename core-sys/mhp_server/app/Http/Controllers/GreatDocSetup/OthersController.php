<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpOthers;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;
class OthersController extends Controller
{
     public function index()
    {
        $others = MhpOthers::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'others'=>$others]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'others_name' => 'required|max:100',
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
              
            $others = new MhpOthers();
            $others->others_name = $request->others_name;
            $others->status_id = $request->status_id;
          
            $others->selection_criteria = $request->selection_criteria;
            $others->save();

            return response()->json(['status'=>200,'message'=>'Others  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $others=MhpOthers::find($id);
        return response()->json(['status'=>200,'others'=>$others]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'others_name' => 'required|max:100',
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
              
            $update_others=MhpOthers::find($id);
            $update_others->others_name=$request->others_name;
            $update_others->status_id=$request->status_id;
             
            $update_others->selection_criteria=$request->selection_criteria;
            $update_others->update();

            return response()->json(['status'=>200,'message'=>'Others Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_others = MhpOthers::find($id);
        if ($del_others)
        {
            if ($del_others['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_others->delete_status = $delete_status;
            $del_others->save();
            return response()->json([
                'status' => 200,
                'message' => 'Others deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No others Found',
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
