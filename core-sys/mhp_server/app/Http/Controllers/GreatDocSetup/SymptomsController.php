<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MreSymptoms;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Support\Facades\Validator;

class SymptomsController extends Controller
{
    public function index()
    {
        $symptoms = MreSymptoms::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'symptoms'=>$symptoms]);
    }



    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'symptoms_name' => 'required|max:100',
            'status_id' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $symptoms = new MreSymptoms();
            $symptoms->symptoms_name = $request->symptoms_name;       
            $symptoms->save();

            return response()->json(['status'=>200,'message'=>'Symptoms data Added Successfully']);
        }
    }


    public function edit($id)
    {
        $symptoms=MreSymptoms::find($id);
        return response()->json(['status'=>200,'symptoms'=>$symptoms]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'symptoms_name' => 'required|max:100',
            'status_id' => 'required|max:100',
         
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_symptoms=MreSymptoms::find($id);
            $update_symptoms->symptoms_name=$request->symptoms_name;
            $update_symptoms->status_id=$request->status_id;
            $update_symptoms->selection_criteria=$request->selection_criteria;
            $update_symptoms->update();

            return response()->json(['status'=>200,'message'=>'Symptoms Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_symptoms = MreSymptoms::find($id);
        if ($del_symptoms)
        {
            if ($del_symptoms['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_symptoms->delete_status = $delete_status;
            $del_symptoms->save();
            return response()->json([
                'status' => 200,
                'message' => 'Symptoms deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No symptoms Found',
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
