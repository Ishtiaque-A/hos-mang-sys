<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpTympanicMembrane;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class TympanicMembraneController extends Controller
{
 
    public function index()
    {
        $tympanic=MhpTympanicMembrane::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'tympanic'=>$tympanic]);
    }


    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'tympanic_name' => 'required|max:100',
            'status' => 'required',
            'selection_criteria' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
        $tympanic=new MhpTympanicMembrane();
        $tympanic->tympanic_name=$request->tympanic_name;
        $tympanic->status=$request->status;
        $tympanic->selection_criteria=$request->selection_criteria;
        $tympanic->save();

        return response()->json(['status'=>200,'message'=>'Tympanic Membrane Added Successfully']);
    }
}

  
    public function edit($id)
    {
        $tympanic=MhpTympanicMembrane::find($id);
        return response()->json(['status'=>200,'tympanic'=>$tympanic]);
    }

    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'tympanic_name' => 'required|max:100',
            'status' => 'required',
            'selection_criteria' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
         $tympanic=MhpTympanicMembrane::find($id);
         $tympanic->tympanic_name=$request->tympanic_name;
         $tympanic->status=$request->status;
         $tympanic->selection_criteria=$request->selection_criteria;
         $tympanic->update();

        return response()->json(['status'=>200,'message'=>'Tympanic Membrane Updated Successfully']);
    }
    }
  
    public function destroy($id)
    {
        $del_tympanic = MhpTympanicMembrane::find($id);
        if ($del_tympanic)
        {
            if ($del_tympanic['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_tympanic->delete_status = $delete_status;
            $del_tympanic->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tympanic Membrane deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Tympanic Membrane Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
