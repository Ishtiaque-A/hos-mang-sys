<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsHallpike;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class HallpikeController extends Controller
{
    
    public function index()
    {
        $hallpike=CnsHallpike::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'hallpike'=>$hallpike]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'hallpike_name' => 'required|max:100',
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
       $hallpike=new CnsHallpike();
       $hallpike->hallpike_name=$request->hallpike_name;
       $hallpike->status_id=$request->status_id;
       $hallpike->selection_criteria=$request->selection_criteria;
       $hallpike->save();

        return response()->json(['status'=>200,'message'=>'hallpike Added Successfully']);
    }
}


    public function edit($id)
    {
      $hallpike=CnsHallpike::find($id);
        return response()->json(['status'=>200,'hallpike'=>$hallpike]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'hallpike_name' => 'required|max:100',
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
        $update_hallpike=CnsHallpike::find($id);
        $update_hallpike->hallpike_name=$request->hallpike_name;
        $update_hallpike->status_id=$request->status_id;
        $update_hallpike->selection_criteria=$request->selection_criteria;
        $update_hallpike->update();

        return response()->json(['status'=>200,'message'=>'hallpike Updated Successfully']);
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
        $del_hallpike = CnsHallpike::find($id);
        if ($del_hallpike)
        {
            if ($del_hallpike['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_hallpike->delete_status = $delete_status;
            $del_hallpike->save();
            return response()->json([
                'status' => 200,
                'message' => 'hallpike deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No hallpike Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
