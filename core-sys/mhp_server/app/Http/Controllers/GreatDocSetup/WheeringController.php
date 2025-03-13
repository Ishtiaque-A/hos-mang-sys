<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MreWheering;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;
class WheeringController extends Controller
{
    
    public function index()
    {
        $wheering = MreWheering::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'wheering'=>$wheering]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'wheering_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
            'image'=>'required',
        ],['status_id.required' => 'Status field is required!'] );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
              if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/wheering/', $name);
        } 
            $wheering = new MreWheering();
            $wheering->wheering_name = $request->wheering_name;
            $wheering->status_id = $request->status_id;
            $wheering->selection_criteria = $request->selection_criteria;

            if($files!=null){
                $wheering->image = $name;

            }

            $wheering->save();

            return response()->json(['status'=>200,'message'=>'Wheering  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $wheering=MreWheering::find($id);
        return response()->json(['status'=>200,'wheering'=>$wheering]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'wheering_name' => 'required|max:100',
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
             if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/wheering/', $name);
        } 
            $update_wheering=MreWheering::find($id);
            $update_wheering->wheering_name=$request->wheering_name;
            $update_wheering->status_id=$request->status_id;
            $update_wheering->selection_criteria=$request->selection_criteria;
             if($files!=null){
                $update_wheering->image = $name;

            }
            $update_wheering->update();

            return response()->json(['status'=>200,'message'=>'Wheering Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_wheering = MreWheering::find($id);
        if ($del_wheering)
        {
            if ($del_wheering['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_wheering->delete_status = $delete_status;
            $del_wheering->save();
            return response()->json([
                'status' => 200,
                'message' => 'Wheering deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No wheering Found',
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
