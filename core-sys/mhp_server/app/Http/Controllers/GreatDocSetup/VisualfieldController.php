<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\MhpVisualfield;
use Illuminate\Support\Facades\Validator;
class VisualfieldController extends Controller
{
       public function index()
    {
        $visualfield = MhpVisualfield::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'visualfield'=>$visualfield]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'visualfield_name' => 'required|max:100',
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
            $visualfield = new MhpVisualfield();
            $visualfield->visualfield_name = $request->visualfield_name;
            $visualfield->status_id = $request->status_id;
            $visualfield->selection_criteria = $request->selection_criteria;
            $visualfield->save();

            return response()->json(['status'=>200,'message'=>'Visual Field Added Successfully']);
        }
    }


    public function edit($id)
    {
        $visualfield=MhpVisualfield::find($id);
        return response()->json(['status'=>200,'visualfield'=>$visualfield]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'visualfield_name' => 'required|max:100',
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
            $update_visualfield=MhpVisualfield::find($id);
            $update_visualfield->visualfield_name=$request->visualfield_name;
            $update_visualfield->status_id=$request->status_id;
            $update_visualfield->selection_criteria=$request->selection_criteria;
            $update_visualfield->update();

            return response()->json(['status'=>200,'message'=>'Visual Field Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_visualfield = MhpVisualfield::find($id);
        if ($del_visualfield)
        {
            if ($del_visualfield['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_visualfield->delete_status = $delete_status;
            $del_visualfield->save();
            return response()->json([
                'status' => 200,
                'message' => 'Visual Field deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Visual Field Found',
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
