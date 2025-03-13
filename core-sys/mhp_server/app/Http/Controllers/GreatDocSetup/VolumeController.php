<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpVolume;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;
class VolumeController extends Controller
{
        
    public function index()
    {
        $volume = MhpVolume::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'volume'=>$volume]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'volume_name' => 'required|max:100',
            'status_id' => 'required',
            'selection_criteria' => 'required',
        ],
        ['status_id.required' => 'Status field is required!']
         );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
              
            $volume = new MhpVolume();
            $volume->volume_name = $request->volume_name;
            $volume->status_id = $request->status_id;
          
            $volume->selection_criteria = $request->selection_criteria;
            $volume->save();

            return response()->json(['status'=>200,'message'=>'volume  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $volume=MhpVolume::find($id);
        return response()->json(['status'=>200,'volume'=>$volume]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'volume_name' => 'required|max:100',
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
              
            $update_volume=MhpVolume::find($id);
            $update_volume->volume_name=$request->volume_name;
            $update_volume->status_id=$request->status_id;
             
            $update_volume->selection_criteria=$request->selection_criteria;
            $update_volume->update();

            return response()->json(['status'=>200,'message'=>'volume Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_volume = MhpVolume::find($id);
        if ($del_volume)
        {
            if ($del_volume['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_volume->delete_status = $delete_status;
            $del_volume->save();
            return response()->json([
                'status' => 200,
                'message' => 'volume deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No volume Found',
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
