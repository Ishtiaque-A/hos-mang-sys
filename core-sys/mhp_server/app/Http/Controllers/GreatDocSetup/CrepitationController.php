<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MreCrepitation;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;
class CrepitationController extends Controller
{
    
    public function index()
    {
        $crepitation = MreCrepitation::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'crepitation'=>$crepitation]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'crepitation_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
            'image' => 'required',
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
            $files->move('images/files/crepitation/', $name);
        }
            $crepitation = new MreCrepitation();
            $crepitation->crepitation_name = $request->crepitation_name;
            $crepitation->status_id = $request->status_id;
            if($files!=null){
                $crepitation->image = $name;

            }
            $crepitation->selection_criteria = $request->selection_criteria;
            $crepitation->save();

            return response()->json(['status'=>200,'message'=>'Crepitation  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $crepitation=MreCrepitation::find($id);
        return response()->json(['status'=>200,'crepitation'=>$crepitation]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'crepitation_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
            'image' => 'required',
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
            $files->move('images/files/crepitation/', $name);
        }
            $update_crepitation=MreCrepitation::find($id);
            $update_crepitation->crepitation_name=$request->crepitation_name;
            $update_crepitation->status_id=$request->status_id;
              if($files!=null){
                $update_crepitation->image = $name;

            }
            $update_crepitation->selection_criteria=$request->selection_criteria;
            $update_crepitation->update();

            return response()->json(['status'=>200,'message'=>'Crepitation Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_crepitation = MreCrepitation::find($id);
        if ($del_crepitation)
        {
            if ($del_crepitation['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_crepitation->delete_status = $delete_status;
            $del_crepitation->save();
            return response()->json([
                'status' => 200,
                'message' => 'Crepitation deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No crepitation Found',
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
