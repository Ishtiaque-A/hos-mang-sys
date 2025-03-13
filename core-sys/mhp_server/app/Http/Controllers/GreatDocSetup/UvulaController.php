<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsUvula;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class UvulaController extends Controller
{
    public function index()
    {
        $uvula=CnsUvula::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'uvula'=>$uvula]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'uvula_name' => 'required|max:100',
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
       $uvula=new CnsUvula();
       $uvula->uvula_name=$request->uvula_name;
       $uvula->status_id=$request->status_id;
       $uvula->selection_criteria=$request->selection_criteria;
       $uvula->save();

        return response()->json(['status'=>200,'message'=>'uvula Added Successfully']);
    }
}


    public function edit($id)
    {
      $uvula=CnsUvula::find($id);
        return response()->json(['status'=>200,'uvula'=>$uvula]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'uvula_name' => 'required|max:100',
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
        $update_uvula=CnsUvula::find($id);
        $update_uvula->uvula_name=$request->uvula_name;
        $update_uvula->status_id=$request->status_id;
        $update_uvula->selection_criteria=$request->selection_criteria;
        $update_uvula->update();

        return response()->json(['status'=>200,'message'=>'Uvula Updated Successfully']);
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
        $del_uvula = CnsUvula::find($id);
        if ($del_uvula)
        {
            if ($del_uvula['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_uvula->delete_status = $delete_status;
            $del_uvula->save();
            return response()->json([
                'status' => 200,
                'message' => 'Uvula deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Uvula Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
