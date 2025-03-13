<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CnsGasReflex;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class GasReflexController extends Controller
{
        public function index()
    {
        $gasreflex=CnsGasReflex::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'gasreflex'=>$gasreflex]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'gasreflex_name' => 'required|max:100',
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
       $gasreflex=new CnsGasReflex();
       $gasreflex->gasreflex_name=$request->gasreflex_name;
       $gasreflex->status_id=$request->status_id;
       $gasreflex->selection_criteria=$request->selection_criteria;
       $gasreflex->save();

        return response()->json(['status'=>200,'message'=>'Gas reflex Added Successfully']);
    }
}


    public function edit($id)
    {
      $gasreflex=CnsGasReflex::find($id);
        return response()->json(['status'=>200,'gasreflex'=>$gasreflex]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'gasreflex_name' => 'required|max:100',
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
        $update_gasreflex=CnsGasReflex::find($id);
        $update_gasreflex->gasreflex_name=$request->gasreflex_name;
        $update_gasreflex->status_id=$request->status_id;
        $update_gasreflex->selection_criteria=$request->selection_criteria;
        $update_gasreflex->update();

        return response()->json(['status'=>200,'message'=>'Gas reflex  Updated Successfully']);
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
        $del_gasreflex = CnsGasReflex::find($id);
        if ($del_gasreflex)
        {
            if ($del_gasreflex['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_gasreflex->delete_status = $delete_status;
            $del_gasreflex->save();
            return response()->json([
                'status' => 200,
                'message' => 'Gas reflex  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Gas reflex  Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
