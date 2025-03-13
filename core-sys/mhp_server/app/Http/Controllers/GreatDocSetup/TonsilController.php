<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTonsil;
use App\Models\MhpHistoryExaminationStatus;
use Validator;

class TonsilController extends Controller
{
     public function index()
    {
        $tonsil=MhpTonsil::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'tonsil'=>$tonsil]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'tonsil_name' => 'required|max:100',
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
       $tonsil=new MhpTonsil();
       $tonsil->tonsil_name=$request->tonsil_name;
       $tonsil->status_id=$request->status_id;
       $tonsil->selection_criteria=$request->selection_criteria;
       $tonsil->save();

        return response()->json(['status'=>200,'message'=>'Tonsil Added Successfully']);
    }
}


    public function edit($id)
    {
      $tonsil=MhpTonsil::find($id);
        return response()->json(['status'=>200,'tonsil'=>$tonsil]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'tonsil_name' => 'required|max:100',
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
        $update_tonsil=MhpTonsil::find($id);
        $update_tonsil->tonsil_name=$request->tonsil_name;
        $update_tonsil->status_id=$request->status_id;
        $update_tonsil->selection_criteria=$request->selection_criteria;
        $update_tonsil->update();

        return response()->json(['status'=>200,'message'=>'Tonsil Updated Successfully']);
    }
    }

    public function destroy($id)
    {
        $del_tonsil = MhpTonsil::find($id);
        if ($del_tonsil)
        {
            if ($del_tonsil['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_tonsil->delete_status = $delete_status;
            $del_tonsil->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tonsil deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tonsil Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
