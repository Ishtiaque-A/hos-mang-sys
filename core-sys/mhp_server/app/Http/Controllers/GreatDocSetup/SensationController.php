<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsSensation;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class SensationController extends Controller
{
    
      public function index()
    {
        $sensation=CnsSensation::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'sensation'=>$sensation]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'sensation_name' => 'required|max:100',
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
       $sensation=new CnsSensation();
       $sensation->sensation_name=$request->sensation_name;
       $sensation->status_id=$request->status_id;
       $sensation->selection_criteria=$request->selection_criteria;
       $sensation->save();

        return response()->json(['status'=>200,'message'=>'sensation Added Successfully']);
    }
}


    public function edit($id)
    {
      $sensation=CnsSensation::find($id);
        return response()->json(['status'=>200,'sensation'=>$sensation]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'sensation_name' => 'required|max:100',
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
        $update_sensation=CnsSensation::find($id);
        $update_sensation->sensation_name=$request->sensation_name;
        $update_sensation->status_id=$request->status_id;
        $update_sensation->selection_criteria=$request->selection_criteria;
        $update_sensation->update();

        return response()->json(['status'=>200,'message'=>'sensation  Updated Successfully']);
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
        $del_sensation = CnsSensation::find($id);
        if ($del_sensation)
        {
            if ($del_sensation['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_sensation->delete_status = $delete_status;
            $del_sensation->save();
            return response()->json([
                'status' => 200,
                'message' => 'sensation  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No sensation  Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
