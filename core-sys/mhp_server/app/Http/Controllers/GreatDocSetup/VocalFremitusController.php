<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MreVocalFremitus;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;

class VocalFremitusController extends Controller
{
       //

    public function index()
    {
        $vocalfremitus = MreVocalFremitus::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'vocalfremitus'=>$vocalfremitus]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'vocalfremitus_name' => 'required|max:100',
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
            $files->move('images/files/vocalfremitus/', $name);
        }
            $vocalfremitus = new MreVocalFremitus();
            $vocalfremitus->vocalfremitus_name = $request->vocalfremitus_name;
            $vocalfremitus->status_id = $request->status_id;
            $vocalfremitus->selection_criteria = $request->selection_criteria;
            if($files!=null){
          $vocalfremitus->image=$name;
            }
            $vocalfremitus->save();

            return response()->json(['status'=>200,'message'=>'Vocal Fremitus  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $vocalfremitus=MreVocalFremitus::find($id);
        return response()->json(['status'=>200,'vocalfremitus'=>$vocalfremitus]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'vocalfremitus_name' => 'required|max:100',
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
            $files->move('images/files/vocalfremitus/', $name);
        }
            $update_vocalfremitus=MreVocalFremitus::find($id);
            $update_vocalfremitus->vocalfremitus_name=$request->vocalfremitus_name;
            $update_vocalfremitus->status_id=$request->status_id;
            $update_vocalfremitus->selection_criteria=$request->selection_criteria;
            if($files!=null){
             $update_vocalfremitus->image=$name;

            }
            $update_vocalfremitus->update();

            return response()->json(['status'=>200,'message'=>'Vocal Fremitus Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_vocalfremitus = MreVocalFremitus::find($id);
        if ($del_vocalfremitus)
        {
            if ($del_vocalfremitus['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_vocalfremitus->delete_status = $delete_status;
            $del_vocalfremitus->save();
            return response()->json([
                'status' => 200,
                'message' => 'Vocal Fremitus deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No vocalfremitus Found',
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
