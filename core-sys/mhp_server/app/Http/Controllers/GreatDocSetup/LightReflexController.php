<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHistoryExaminationStatus;
use App\Models\MhpLightreflex;
use Illuminate\Support\Facades\Validator;
class LightReflexController extends Controller
{
      public function index()
    {
        $lightreflex = MhpLightreflex::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'lightreflex'=>$lightreflex]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'lightreflex_name' => 'required|max:100',
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
            $lightreflex = new MhpLightreflex();
            $lightreflex->lightreflex_name = $request->lightreflex_name;
            $lightreflex->status_id = $request->status_id;
            $lightreflex->selection_criteria = $request->selection_criteria;
            $lightreflex->save();

            return response()->json(['status'=>200,'message'=>'Light Reflex Added Successfully']);
        }
    }


    public function edit($id)
    {
        $lightreflex=MhpLightreflex::find($id);
        return response()->json(['status'=>200,'lightreflex'=>$lightreflex]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'lightreflex_name' => 'required|max:100',
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
            $update_lightreflex=MhpLightreflex::find($id);
            $update_lightreflex->lightreflex_name=$request->lightreflex_name;
            $update_lightreflex->status_id=$request->status_id;
            $update_lightreflex->selection_criteria=$request->selection_criteria;
            $update_lightreflex->update();

            return response()->json(['status'=>200,'message'=>'Light Reflex Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_lightreflex = MhpLightreflex::find($id);
        if ($del_lightreflex)
        {
            if ($del_lightreflex['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_lightreflex->delete_status = $delete_status;
            $del_lightreflex->save();
            return response()->json([
                'status' => 200,
                'message' => 'Light Reflex deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Light Reflex Found',
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
