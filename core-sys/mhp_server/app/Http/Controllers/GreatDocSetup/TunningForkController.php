<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTunning;
use App\Models\MhpHistoryExaminationStatus;
use Validator;

class TunningForkController extends Controller
{
   public function index()
    {
        $tunning=MhpTunning::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'tunning'=>$tunning]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'tunning_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
        ], ['status_id.required' => 'Status field is required!'] );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
       $tunning=new MhpTunning();
       $tunning->tunning_name=$request->tunning_name;
       $tunning->status_id=$request->status_id;
       $tunning->selection_criteria=$request->selection_criteria;
       $tunning->save();

        return response()->json(['status'=>200,'message'=>'Tunning Fork Added Successfully']);
    }
}


    public function edit($id)
    {
      $tunning=MhpTunning::find($id);
        return response()->json(['status'=>200,'tunning'=>$tunning]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'tunning_name' => 'required|max:100',
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
        $update_tunning=MhpTunning::find($id);
        $update_tunning->tunning_name=$request->tunning_name;
        $update_tunning->status_id=$request->status_id;
        $update_tunning->selection_criteria=$request->selection_criteria;
        $update_tunning->update();

        return response()->json(['status'=>200,'message'=>'Tunning Fork Updated Successfully']);
    }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $del_tunning = MhpTunning::find($id);
        if ($del_tunning)
        {
            if ($del_tunning['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_tunning->delete_status = $delete_status;
            $del_tunning->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tunning Fork deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tunning Fork Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
