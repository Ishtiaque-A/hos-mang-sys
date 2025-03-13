<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MreVocalResonance;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;
class VocalResonanceController extends Controller
{
      //

    public function index()
    {
        $vocalresonance = MreVocalResonance::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'vocalresonance'=>$vocalresonance]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'vocalresonance_name' => 'required|max:100',
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
            $files->move('images/files/vocalresonance/', $name);
        }
            $vocalresonance = new MreVocalResonance();
            $vocalresonance->vocalresonance_name = $request->vocalresonance_name;
            $vocalresonance->status_id = $request->status_id;
            if($files!=null){
                $vocalresonance->image = $name;

            }
            $vocalresonance->selection_criteria = $request->selection_criteria;
            $vocalresonance->save();

            return response()->json(['status'=>200,'message'=>'Vocal Resonance  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $vocalresonance=MreVocalResonance::find($id);
        return response()->json(['status'=>200,'vocalresonance'=>$vocalresonance]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'vocalresonance_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
            'image'=>'required',
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
            $files->move('images/files/vocalresonance/', $name);
        }
            $update_vocalresonance=MreVocalResonance::find($id);
            $update_vocalresonance->vocalresonance_name=$request->vocalresonance_name;
            $update_vocalresonance->status_id=$request->status_id;
              if($files!=null){
                $update_vocalresonance->image = $name;

            }
            $update_vocalresonance->selection_criteria=$request->selection_criteria;
            $update_vocalresonance->update();

            return response()->json(['status'=>200,'message'=>'Vocal Resonance Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_vocalresonance = MreVocalResonance::find($id);
        if ($del_vocalresonance)
        {
            if ($del_vocalresonance['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_vocalresonance->delete_status = $delete_status;
            $del_vocalresonance->save();
            return response()->json([
                'status' => 200,
                'message' => 'Vocal Resonance deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No vocalresonance Found',
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
