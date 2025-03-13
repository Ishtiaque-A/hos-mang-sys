<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpMastoid;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class MastoidController extends Controller
{
     public function index()
    {
        $mastoid=MhpMastoid::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'mastoid'=>$mastoid]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'mastoid_name' => 'required|max:100',
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
       $mastoid=new MhpMastoid();
       $mastoid->mastoid_name=$request->mastoid_name;
       $mastoid->status_id=$request->status_id;
       $mastoid->selection_criteria=$request->selection_criteria;
       $mastoid->save();

        return response()->json(['status'=>200,'message'=>'Mastoid Added Successfully']);
    }
}


    public function edit($id)
    {
      $mastoid=MhpMastoid::find($id);
        return response()->json(['status'=>200,'mastoid'=>$mastoid]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'mastoid_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
        ],['status_id.required' => 'Status field is required!']
    );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
        $update_mastoid=MhpMastoid::find($id);
        $update_mastoid->mastoid_name=$request->mastoid_name;
        $update_mastoid->status_id=$request->status_id;
        $update_mastoid->selection_criteria=$request->selection_criteria;
        $update_mastoid->update();

        return response()->json(['status'=>200,'message'=>'Mastoid Updated Successfully']);
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
        $del_mastoid = MhpMastoid::find($id);
        if ($del_mastoid)
        {
            if ($del_mastoid['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_mastoid->delete_status = $delete_status;
            $del_mastoid->save();
            return response()->json([
                'status' => 200,
                'message' => 'Mastoid deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Mastoid Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
