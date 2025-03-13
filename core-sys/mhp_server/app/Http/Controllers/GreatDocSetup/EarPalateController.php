<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\CnsEarPalate;
use Illuminate\Support\Facades\Validator;
class EarPalateController extends Controller
{
    
    public function index()
    {
        $earpalate=CnsEarPalate::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'earpalate'=>$earpalate]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'earpalate_name' => 'required|max:100',
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
       $earpalate=new CnsEarPalate();
       $earpalate->earpalate_name=$request->earpalate_name;
       $earpalate->status_id=$request->status_id;
       $earpalate->selection_criteria=$request->selection_criteria;
       $earpalate->save();

        return response()->json(['status'=>200,'message'=>'Ear Palate Added Successfully']);
    }
}


    public function edit($id)
    {
      $earpalate=CnsEarPalate::find($id);
        return response()->json(['status'=>200,'earpalate'=>$earpalate]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'earpalate_name' => 'required|max:100',
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
        $update_earpalate=CnsEarPalate::find($id);
        $update_earpalate->earpalate_name=$request->earpalate_name;
        $update_earpalate->status_id=$request->status_id;
        $update_earpalate->selection_criteria=$request->selection_criteria;
        $update_earpalate->update();

        return response()->json(['status'=>200,'message'=>'Ear Palate Updated Successfully']);
    }
    }

    public function destroy($id)
    {
        $del_earpalate = CnsEarPalate::find($id);
        if ($del_earpalate)
        {
            if ($del_earpalate['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_earpalate->delete_status = $delete_status;
            $del_earpalate->save();
            return response()->json([
                'status' => 200,
                'message' => 'Ear Palate deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Ear Palate Found',
            ]);
        }


}
 public function examination_dropdown(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
