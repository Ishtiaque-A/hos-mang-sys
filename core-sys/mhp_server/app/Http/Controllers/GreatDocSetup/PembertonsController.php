<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPembertons;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;

class PembertonsController extends Controller
{
     public function index()
    {
        $pembertons = MhpPembertons::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'pembertons'=>$pembertons]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'pembertons_name' => 'required|max:100',
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
            $pembertons = new MhpPembertons();
            $pembertons->pembertons_name = $request->pembertons_name;
            $pembertons->status_id = $request->status_id;
            $pembertons->selection_criteria = $request->selection_criteria;
            $pembertons->save();

            return response()->json(['status'=>200,'message'=>'Pembertons  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $pembertons=MhpPembertons::find($id);
        return response()->json(['status'=>200,'pembertons'=>$pembertons]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'pembertons_name' => 'required|max:100',
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
            $update_pembertons=MhpPembertons::find($id);
            $update_pembertons->pembertons_name=$request->pembertons_name;
            $update_pembertons->status_id=$request->status_id;
            $update_pembertons->selection_criteria=$request->selection_criteria;
            $update_pembertons->update();

            return response()->json(['status'=>200,'message'=>'Pembertons Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_pembertons = MhpPembertons::find($id);
        if ($del_pembertons)
        {
            if ($del_pembertons['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_pembertons->delete_status = $delete_status;
            $del_pembertons->save();
            return response()->json([
                'status' => 200,
                'message' => 'Pembertons deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No pembertons Found',
            ]);
        }


    }
    public function examination_dropdown(){
        $status_list = MhpHistoryExaminationStatus::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status'=>200,
            'status_list'=>$status_list
        ]);
    }
}
