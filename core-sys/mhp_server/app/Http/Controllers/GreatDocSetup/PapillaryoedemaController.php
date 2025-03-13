<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\MhpPapillaryoedema;
use Illuminate\Support\Facades\Validator;

class PapillaryoedemaController extends Controller
{
      public function index()
    {
        $papillaryoedema = MhpPapillaryoedema::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'papillaryoedema'=>$papillaryoedema]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'papillaryoedema_name' => 'required|max:100',
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
            $papillaryoedema = new MhpPapillaryoedema();
            $papillaryoedema->papillaryoedema_name = $request->papillaryoedema_name;
            $papillaryoedema->status_id = $request->status_id;
            $papillaryoedema->selection_criteria = $request->selection_criteria;
            $papillaryoedema->save();

            return response()->json(['status'=>200,'message'=>'Papillary Oedema Added Successfully']);
        }
    }


    public function edit($id)
    {
        $papillaryoedema=MhpPapillaryoedema::find($id);
        return response()->json(['status'=>200,'papillaryoedema'=>$papillaryoedema]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'papillaryoedema_name' => 'required|max:100',
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
            $update_papillaryoedema=MhpPapillaryoedema::find($id);
            $update_papillaryoedema->papillaryoedema_name=$request->papillaryoedema_name;
            $update_papillaryoedema->status_id=$request->status_id;
            $update_papillaryoedema->selection_criteria=$request->selection_criteria;
            $update_papillaryoedema->update();

            return response()->json(['status'=>200,'message'=>'Papillary Oedema Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_papillaryoedema = MhpPapillaryoedema::find($id);
        if ($del_papillaryoedema)
        {
            if ($del_papillaryoedema['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_papillaryoedema->delete_status = $delete_status;
            $del_papillaryoedema->save();
            return response()->json([
                'status' => 200,
                'message' => 'Papillary Oedema deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Papillary Oedema Found',
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
