<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpProcedureFee;
use App\Models\MhpProcedure;
use Validator;
use DB;
class ProcedureFeeController extends Controller
{
      public function index()
    {
        // $procedureFee=MhpProcedureFee::where('delete_status',0)->orderBy('id','desc')->get();
        $procedureFee=MhpProcedureFee::with('procedure')->orderBy('id','desc')->where('delete_status',0)->get();


        return response()->json(
            ['status'=>200,'procedureFee'=>$procedureFee]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'fee_name' => 'required|max:100',
            'procedure_id' => 'required',
            'item_code' => 'required|unique:mhp_procedure_fees',
        ],['procedure_id.required' => 'Procedure field is required!'] );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
       $procedureFee=new MhpProcedureFee();
       $procedureFee->subProcedure_name = $request->subProcedure_name;
       $procedureFee->fee_name = $request->fee_name;
       $procedureFee->procedure_id = $request->procedure_id;
       $procedureFee->item_code = $request->item_code;
       $procedureFee->description = $request->description;
       $procedureFee->save();

        return response()->json(['status'=>200,'message'=>'Procedure Fees Added Successfully']);
    }
}


    public function edit($id)
    {
      $procedureFee=MhpProcedureFee::find($id);
    	       // $procedureFee=DB::table('mhp_procedure_fees')->join('mhp_procedures','mhp_procedure_fees.procedure_id','=','mhp_procedures.id')->where('mhp_procedure_fees.id',$id)->get();

        return response()->json(['status'=>200,'procedureFee'=>$procedureFee,]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'fee_name' => 'required|max:100',
            'procedure_id' => 'required',
            'item_code' => 'required',
        ],
        ['procedure_id.required'=>'Procedure field is required']
    );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
        $update_procedureFee=MhpProcedureFee::find($id);
          $update_procedureFee->subProcedure_name=$request->subProcedure_name;

        $update_procedureFee->fee_name=$request->fee_name;
        $update_procedureFee->procedure_id=$request->procedure_id;
         $update_procedureFee->item_code=$request->item_code;
         $update_procedureFee->description=$request->description;

        $update_procedureFee->update();

        return response()->json(['status'=>200,'message'=>'Procedure Fees  Updated Successfully']);
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
        $del_procedureFee = MhpProcedureFee::find($id);
        if ($del_procedureFee)
        {
            if ($del_procedureFee['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_procedureFee->delete_status = $delete_status;
            $del_procedureFee->save();
            return response()->json([
                'status' => 200,
                'message' => 'Procedure Fees  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Procedure Fees  Found',
            ]);
        }


}
 public function procedure_dropdown(){
   $procedure_name=MhpProcedure::where('delete_status',0)->get();
   return response()->json(['status'=>200,'procedure_name'=>$procedure_name]);
 }
 
   public function subProcedureById($id){

     $subProcedure=MhpProcedureFee::with('procedure')->where('procedure_id',$id)->where('delete_status',0)->orderBy('id','desc')->get();
      return response()->json([
                'status' => 200,
                'subProcedure' =>$subProcedure,
            ]);
   }

}
