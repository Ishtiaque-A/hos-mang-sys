<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\MhpEyemovements;
use Illuminate\Support\Facades\Validator;
class EyemovementsController extends Controller
{
      public function index()
    {
        $eyemovements = MhpEyemovements::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'eyemovements'=>$eyemovements]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'eyemovements_name' => 'required|max:100',
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
            $eyemovements = new MhpEyemovements();
            $eyemovements->eyemovements_name = $request->eyemovements_name;
            $eyemovements->status_id = $request->status_id;
            $eyemovements->selection_criteria = $request->selection_criteria;
            $eyemovements->save();

            return response()->json(['status'=>200,'message'=>'Eye Movements Added Successfully']);
        }
    }


    public function edit($id)
    {
        $eyemovements=MhpEyemovements::find($id);
        return response()->json(['status'=>200,'eyemovements'=>$eyemovements]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'eyemovements_name' => 'required|max:100',
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
            $update_eyemovements=MhpEyemovements::find($id);
            $update_eyemovements->eyemovements_name=$request->eyemovements_name;
            $update_eyemovements->status_id=$request->status_id;
            $update_eyemovements->selection_criteria=$request->selection_criteria;
            $update_eyemovements->update();

            return response()->json(['status'=>200,'message'=>'Eye Movements Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_eyemovements = MhpEyemovements::find($id);
        if ($del_eyemovements)
        {
            if ($del_eyemovements['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_eyemovements->delete_status = $delete_status;
            $del_eyemovements->save();
            return response()->json([
                'status' => 200,
                'message' => 'Eye Movements deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Eye Movements Found',
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
