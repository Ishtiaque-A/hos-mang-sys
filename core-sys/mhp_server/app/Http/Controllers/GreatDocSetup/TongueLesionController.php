<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTongueLesion;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class TongueLesionController extends Controller
{
     public function index()
    {
        $tongueLesion=MhpTongueLesion::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'tongueLesion'=>$tongueLesion]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'tongueLesion_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
        ], ['status_id.required' => 'Status field is required!'] );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }
        else{
       $tongueLesion=new MhpTongueLesion();
       $tongueLesion->tongueLesion_name=$request->tongueLesion_name;
       $tongueLesion->status_id=$request->status_id;
       $tongueLesion->selection_criteria=$request->selection_criteria;
       $tongueLesion->save();

        return response()->json(['status'=>200,'message'=>'Tongue Lesion  Added Successfully']);
    }
}


    public function edit($id)
    {
      $tongueLesion=MhpTongueLesion::find($id);
        return response()->json(['status'=>200,'tongueLesion'=>$tongueLesion]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'tongueLesion_name' => 'required|max:100',
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
        $update_tongueLesion=MhpTongueLesion::find($id);
        $update_tongueLesion->tongueLesion_name=$request->tongueLesion_name;
        $update_tongueLesion->status_id=$request->status_id;
        $update_tongueLesion->selection_criteria=$request->selection_criteria;
        $update_tongueLesion->update();

        return response()->json(['status'=>200,'message'=>'Tongue Lesion Updated Successfully']);
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
        $del_tongueLesion = MhpTongueLesion::find($id);
        if ($del_tongueLesion)
        {
            if ($del_tongueLesion['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_tongueLesion->delete_status = $delete_status;
            $del_tongueLesion->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tongue Lesion  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tongue Lesion  Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
