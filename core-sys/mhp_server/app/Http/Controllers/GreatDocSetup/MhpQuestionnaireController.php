<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\MhpQuestionnaire;
use Validator;

class MhpQuestionnaireController extends Controller
{
    //
    public function index()
    {
        $questionnaire = MhpQuestionnaire::where('delete_status',0)->orderBy('id','asc')->get();


        return response()->json(
            ['status'=>200,'questionnaire'=>$questionnaire]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'questionnaire_name' => 'required|max:100',
            'questionnaire_description' => 'required|max:100',
       
        ],
    );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        } 
        else{
           
            $questionnaire = new MhpQuestionnaire();
            $questionnaire->questionnaire_name = $request->questionnaire_name;
            $questionnaire->questionnaire_description = $request->questionnaire_description;

         $questionnaire->save();

            return response()->json(['status'=>200,'message'=>'Questionnaire Added Successfully']);
        }
    }


    public function edit($id)
    {
        $questionnaire=MhpQuestionnaire::find($id);
        return response()->json(['status'=>200,'questionnaire'=>$questionnaire]);
    }


    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'questionnaire_name' => 'required|max:100',
            'questionnaire_description' => 'required|max:100'

        ],
           
        );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }
         else{
           
            $update_questionnaire=MhpQuestionnaire::find($id);
            $update_questionnaire->questionnaire_name=$request->questionnaire_name;
            $update_questionnaire->questionnaire_description=$request->questionnaire_description;
            $update_questionnaire->update();

            return response()->json(['status'=>200,'message'=>'Questionnaire  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_questionnaire = MhpQuestionnaire::find($id);
        if ($del_questionnaire)
        {
            if ($del_questionnaire['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_questionnaire->delete_status = $delete_status;
            $del_questionnaire->save();
            return response()->json([
                'status' => 200,
                'message' => 'Questionnaire deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Questionnaire Found',
            ]);
        }

    }
}

