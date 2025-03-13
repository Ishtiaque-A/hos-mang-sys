<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsNeckMovement;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class NeckMovementController extends Controller
{
        public function index()
    {
        $neckmovement=CnsNeckMovement::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'neckmovement'=>$neckmovement]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'neckmovement_name' => 'required|max:100',
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
       $neckmovement=new CnsNeckMovement();
       $neckmovement->neckmovement_name=$request->neckmovement_name;
       $neckmovement->status_id=$request->status_id;
       $neckmovement->selection_criteria=$request->selection_criteria;
       $neckmovement->save();

        return response()->json(['status'=>200,'message'=>'Neck Movement Added Successfully']);
    }
}


    public function edit($id)
    {
      $neckmovement=CnsNeckMovement::find($id);
        return response()->json(['status'=>200,'neckmovement'=>$neckmovement]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'neckmovement_name' => 'required|max:100',
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
        $update_neckmovement=CnsNeckMovement::find($id);
        $update_neckmovement->neckmovement_name=$request->neckmovement_name;
        $update_neckmovement->status_id=$request->status_id;
        $update_neckmovement->selection_criteria=$request->selection_criteria;
        $update_neckmovement->update();

        return response()->json(['status'=>200,'message'=>'Neck Movement  Updated Successfully']);
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
        $del_neckmovement = CnsNeckMovement::find($id);
        if ($del_neckmovement)
        {
            if ($del_neckmovement['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_neckmovement->delete_status = $delete_status;
            $del_neckmovement->save();
            return response()->json([
                'status' => 200,
                'message' => 'Neck Movement  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Neck Movement  Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
