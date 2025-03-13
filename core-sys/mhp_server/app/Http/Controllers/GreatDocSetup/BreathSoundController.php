<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MreBreathSound;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;

class BreathSoundController extends Controller
{
    //

    public function index()
    {
        $breathsound = MreBreathSound::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'breathsound'=>$breathsound]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'breathsound_name' => 'required|max:100',
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

        }
        else{
            if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/breathsound/', $name);
        } 
           $breathsound = new MreBreathSound();
            $breathsound->breathsound_name = $request->breathsound_name;
            $breathsound->status_id = $request->status_id;
            $breathsound->selection_criteria = $request->selection_criteria;
             $breathsound->image = $name;

            $breathsound->save();



            return response()->json(['status'=>200,'message'=>'Breath Sound  Added Successfully']);
        }
    }
    


    public function edit($id)
    {
        $breathsound=MreBreathSound::find($id);
        return response()->json(['status'=>200,'breathsound'=>$breathsound]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'breathsound_name' => 'required|max:100',
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

        }
         else{
            if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999).$names;
            $files->move('images/files/breathsound/', $name);
        } 
           $update_breathsound=MreBreathSound::find($id);
            $update_breathsound->breathsound_name=$request->breathsound_name;
            $update_breathsound->status_id=$request->status_id;
            $update_breathsound->selection_criteria=$request->selection_criteria;
               if ($files != null) {
             $update_breathsound->image = $name;       
            }
             
            $update_breathsound->update();
            

            return response()->json(['status'=>200,'message'=>'Breath Sound  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_breathsound = MreBreathSound::find($id);
        if ($del_breathsound)
        {
            if ($del_breathsound['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_breathsound->delete_status = $delete_status;
            $del_breathsound->save();
            return response()->json([
                'status' => 200,
                'message' => 'Breath Sound deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No breathsound Found',
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
