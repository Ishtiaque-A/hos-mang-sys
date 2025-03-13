<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPHQ9QuestionnaireValue;
use Illuminate\Support\Facades\Validator;

class MhpPHQ9QuestionnaireValueController extends Controller
{
    //
    public function index()
    {
        $PHQ9QuestionnaireValue = MhpPHQ9QuestionnaireValue::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'PHQ9QuestionnaireValue'=>$PHQ9QuestionnaireValue]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'PHQ9QuestionnaireValue_name' => 'required|max:100',
            'PHQ9QuestionnaireValue_value' => 'required|max:100',
       
        ],
        // ['status_id.required' => 'Status field is required!'] 
    );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        } 
        else{
           
            $PHQ9QuestionnaireValue = new MhpPHQ9QuestionnaireValue();
            $PHQ9QuestionnaireValue->PHQ9QuestionnaireValue_name = $request->PHQ9QuestionnaireValue_name;
            $PHQ9QuestionnaireValue->PHQ9QuestionnaireValue_value = $request->PHQ9QuestionnaireValue_value;

         $PHQ9QuestionnaireValue->save();

            return response()->json(['status'=>200,'message'=>'PHQ-9 Questionnaire Value Added Successfully']);
        }
    }

    public function edit($id)
    {
        $PHQ9QuestionnaireValue=MhpPHQ9QuestionnaireValue::find($id);
        return response()->json(['status'=>200,'PHQ9QuestionnaireValue'=>$PHQ9QuestionnaireValue]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'PHQ9QuestionnaireValue_name' => 'required|max:100',
            'PHQ9QuestionnaireValue_value' => 'required|max:100',
         

        ],
            // ['status_id.required'=>'Status field is required']
        );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }
         else{
           
            $update_PHQ9QuestionnaireValue=MhpPHQ9QuestionnaireValue::find($id);
            $update_PHQ9QuestionnaireValue->PHQ9QuestionnaireValue_name=$request->PHQ9QuestionnaireValue_name;
            $update_PHQ9QuestionnaireValue->PHQ9QuestionnaireValue_value=$request->PHQ9QuestionnaireValue_value;
            $update_PHQ9QuestionnaireValue->update();

            return response()->json(['status'=>200,'message'=>'PHQ-9 Questionnaire Value Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_PHQ9QuestionnaireValue = MhpPHQ9QuestionnaireValue::find($id);
        if ($del_PHQ9QuestionnaireValue)
        {
            if ($del_PHQ9QuestionnaireValue['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_PHQ9QuestionnaireValue->delete_status = $delete_status;
            $del_PHQ9QuestionnaireValue->save();
            return response()->json([
                'status' => 200,
                'message' => 'PHQ-9 Questionnaire Value deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No PHQ-9 Questionnaire Value Found',
            ]);
        }

    }
}

