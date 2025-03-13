<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPosterior;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class PosteriorController extends Controller
{
     public function index()
    {
        $posterior=MhpPosterior::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'posterior'=>$posterior]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'posterior_name' => 'required|max:100',
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
       $posterior=new MhpPosterior();
       $posterior->posterior_name=$request->posterior_name;
       $posterior->status_id=$request->status_id;
       $posterior->selection_criteria=$request->selection_criteria;
       $posterior->save();

        return response()->json(['status'=>200,'message'=>'Posterior Auricular Added Successfully']);
    }
}


    public function edit($id)
    {
      $posterior=MhpPosterior::find($id);
        return response()->json(['status'=>200,'posterior'=>$posterior]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'posterior_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
        ],['status_id.required' => 'Status field is required!']);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
        $update_posterior=MhpPosterior::find($id);
        $update_posterior->posterior_name=$request->posterior_name;
        $update_posterior->status_id=$request->status_id;
        $update_posterior->selection_criteria=$request->selection_criteria;
        $update_posterior->update();

        return response()->json(['status'=>200,'message'=>'Posterior Auricular Updated Successfully']);
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
        $del_posterior = MhpPosterior::find($id);
        if ($del_posterior)
        {
            if ($del_posterior['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_posterior->delete_status = $delete_status;
            $del_posterior->save();
            return response()->json([
                'status' => 200,
                'message' => 'Posterior Auriculardeleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Posterior Auricular Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
