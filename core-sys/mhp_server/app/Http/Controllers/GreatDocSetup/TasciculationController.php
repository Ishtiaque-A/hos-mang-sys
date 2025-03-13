<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsTasciculation;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class TasciculationController extends Controller
{
      public function index()
    {
        $tasciculation=CnsTasciculation::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'tasciculation'=>$tasciculation]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'tasciculation_name' => 'required|max:100',
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
       $tasciculation=new CnsTasciculation();
       $tasciculation->tasciculation_name=$request->tasciculation_name;
       $tasciculation->status_id=$request->status_id;
       $tasciculation->selection_criteria=$request->selection_criteria;
       $tasciculation->save();

        return response()->json(['status'=>200,'message'=>'Tasciculation Added Successfully']);
    }
}


    public function edit($id)
    {
      $tasciculation=CnsTasciculation::find($id);
        return response()->json(['status'=>200,'tasciculation'=>$tasciculation]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'tasciculation_name' => 'required|max:100',
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
        $update_tasciculation=CnsTasciculation::find($id);
        $update_tasciculation->tasciculation_name=$request->tasciculation_name;
        $update_tasciculation->status_id=$request->status_id;
        $update_tasciculation->selection_criteria=$request->selection_criteria;
        $update_tasciculation->update();

        return response()->json(['status'=>200,'message'=>'Tasciculation  Updated Successfully']);
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
        $del_tasciculation = CnsTasciculation::find($id);
        if ($del_tasciculation)
        {
            if ($del_tasciculation['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_tasciculation->delete_status = $delete_status;
            $del_tasciculation->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tasciculation  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tasciculation  Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
