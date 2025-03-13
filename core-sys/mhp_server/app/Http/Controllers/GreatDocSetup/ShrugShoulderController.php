<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsShrugShoulder;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class ShrugShoulderController extends Controller
{
    
        public function index()
    {
        $shrugshoulder=CnsShrugShoulder::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'shrugshoulder'=>$shrugshoulder]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'shrugshoulder_name' => 'required|max:100',
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
       $shrugshoulder=new CnsShrugShoulder();
       $shrugshoulder->shrugshoulder_name=$request->shrugshoulder_name;
       $shrugshoulder->status_id=$request->status_id;
       $shrugshoulder->selection_criteria=$request->selection_criteria;
       $shrugshoulder->save();

        return response()->json(['status'=>200,'message'=>'Shrug Shoulder Added Successfully']);
    }
}


    public function edit($id)
    {
      $shrugshoulder=CnsShrugShoulder::find($id);
        return response()->json(['status'=>200,'shrugshoulder'=>$shrugshoulder]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'shrugshoulder_name' => 'required|max:100',
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
        $update_shrugshoulder=CnsShrugShoulder::find($id);
        $update_shrugshoulder->shrugshoulder_name=$request->shrugshoulder_name;
        $update_shrugshoulder->status_id=$request->status_id;
        $update_shrugshoulder->selection_criteria=$request->selection_criteria;
        $update_shrugshoulder->update();

        return response()->json(['status'=>200,'message'=>'Shrug Shoulder  Updated Successfully']);
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
        $del_shrugshoulder = CnsShrugShoulder::find($id);
        if ($del_shrugshoulder)
        {
            if ($del_shrugshoulder['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_shrugshoulder->delete_status = $delete_status;
            $del_shrugshoulder->save();
            return response()->json([
                'status' => 200,
                'message' => 'Shrug Shoulder  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Shrug Shoulder  Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
