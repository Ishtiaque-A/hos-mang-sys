<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpHeartSound;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;
class HeartSoundController extends Controller
{
     
    public function index()
    {
        $heartSound = MhpHeartSound::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'heartSound'=>$heartSound]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'heartSound_name' => 'required|max:100',
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
              
            $heartSound = new MhpHeartSound();
            $heartSound->heartSound_name = $request->heartSound_name;
            $heartSound->status_id = $request->status_id;
          
            $heartSound->selection_criteria = $request->selection_criteria;
            $heartSound->save();

            return response()->json(['status'=>200,'message'=>'heartSound  Added Successfully']);
        }
    }


    public function edit($id)
    {
        $heartSound=MhpHeartSound::find($id);
        return response()->json(['status'=>200,'heartSound'=>$heartSound]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'heartSound_name' => 'required|max:100',
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
              
            $update_heartSound=MhpHeartSound::find($id);
            $update_heartSound->heartSound_name=$request->heartSound_name;
            $update_heartSound->status_id=$request->status_id;
             
            $update_heartSound->selection_criteria=$request->selection_criteria;
            $update_heartSound->update();

            return response()->json(['status'=>200,'message'=>'heartSound Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_heartSound = MhpHeartSound::find($id);
        if ($del_heartSound)
        {
            if ($del_heartSound['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_heartSound->delete_status = $delete_status;
            $del_heartSound->save();
            return response()->json([
                'status' => 200,
                'message' => 'heartSound deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No heartSound Found',
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
