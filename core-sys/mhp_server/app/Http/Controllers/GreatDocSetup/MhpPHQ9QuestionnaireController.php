<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpPHQ9Questionnaire;
use Illuminate\Support\Facades\Validator;

class MhpPHQ9QuestionnaireController extends Controller
{
    //
    public function index()
    {
        $PHQ9Questionnaire = MhpPHQ9Questionnaire::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'PHQ9Questionnaire'=>$PHQ9Questionnaire]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'PHQ9Questionnaire_name' => 'required',
       
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
           
            $PHQ9Questionnaire = new MhpPHQ9Questionnaire();
            $PHQ9Questionnaire->PHQ9Questionnaire_name = $request->PHQ9Questionnaire_name;

         $PHQ9Questionnaire->save();

            return response()->json(['status'=>200,'message'=>'PHQ-9 Questionnaire Added Successfully']);
        }
    }


    public function edit($id)
    {
        $PHQ9Questionnaire=MhpPHQ9Questionnaire::find($id);
        return response()->json(['status'=>200,'PHQ9Questionnaire'=>$PHQ9Questionnaire]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'PHQ9Questionnaire_name' => 'required',
         

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
           
            $update_PHQ9Questionnaire=MhpPHQ9Questionnaire::find($id);
            $update_PHQ9Questionnaire->PHQ9Questionnaire_name=$request->PHQ9Questionnaire_name;
            $update_PHQ9Questionnaire->update();

            return response()->json(['status'=>200,'message'=>'PHQ-9 Questionnaire Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_PHQ9Questionnaire = MhpPHQ9Questionnaire::find($id);
        if ($del_PHQ9Questionnaire)
        {
            if ($del_PHQ9Questionnaire['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_PHQ9Questionnaire->delete_status = $delete_status;
            $del_PHQ9Questionnaire->save();
            return response()->json([
                'status' => 200,
                'message' => 'PHQ-9 Questionnaire deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No PHQ-9 Questionnaire Found',
            ]);
        }

    }
}

