<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpThroat;
use App\Models\MhpHistoryExaminationStatus;
use Validator;
class ThroatController extends Controller
{
  public function index()
    {
        $throat=MhpThroat::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'throat'=>$throat]);
    }

 
 
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'throat_name' => 'required|max:100',
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
       $throat=new MhpThroat();
       $throat->throat_name=$request->throat_name;
       $throat->status_id=$request->status_id;
       $throat->selection_criteria=$request->selection_criteria;
       $throat->save();

        return response()->json(['status'=>200,'message'=>'Throat Added Successfully']);
    }
}


    public function edit($id)
    {
      $throat=Mhpthroat::find($id);
        return response()->json(['status'=>200,'throat'=>$throat]);
    }


    public function update(Request $request, $id)
    {

           $validator = Validator::make($request->all(),[
            'throat_name' => 'required|max:100',
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
        $update_throat=Mhpthroat::find($id);
        $update_throat->throat_name=$request->throat_name;
        $update_throat->status_id=$request->status_id;
        $update_throat->selection_criteria=$request->selection_criteria;
        $update_throat->update();

        return response()->json(['status'=>200,'message'=>'Throat Updated Successfully']);
    }
    }

    public function destroy($id)
    {
        $del_throat = MhpThroat::find($id);
        if ($del_throat)
        {
            if ($del_throat['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_throat->delete_status = $delete_status;
            $del_throat->save();
            return response()->json([
                'status' => 200,
                'message' => 'Throat deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No throat Found',
            ]);
        }


}
 public function getStatus(){
   $status_list=MhpHistoryExaminationStatus::where('delete_status',0)->get();
   return response()->json(['status'=>200,'status_list'=>$status_list]);
 }
}
