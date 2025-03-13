<?php

namespace App\Http\Controllers\AdminSetupDoctors\CareSuggestion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCareSuggestion;
use Illuminate\Support\Facades\Validator;
class CareSuggestionController extends Controller
{
    
 public function index()
    {
        $care_suggestion = MhpCareSuggestion::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'care_suggestion'=>$care_suggestion]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'care_suggestion_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $care_suggestion = new MhpCareSuggestion();
            $care_suggestion->care_suggestion_name = $request->care_suggestion_name;
            $care_suggestion->save();

            return response()->json(['status'=>200,'message'=>'care_suggestion Added Successfully']);
        }
    }


    public function edit($id)
    {
        $care_suggestion=MhpCareSuggestion::find($id);
        return response()->json(['status'=>200,'care_suggestion'=>$care_suggestion]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'care_suggestion_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_care_suggestion=MhpCareSuggestion::find($id);
            $update_care_suggestion->care_suggestion_name=$request->care_suggestion_name;

            $update_care_suggestion->update();

            return response()->json(['status'=>200,'message'=>'care_suggestion  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_care_suggestion = MhpCareSuggestion::find($id);

        if ($del_care_suggestion)
        {
            if ($del_care_suggestion['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_care_suggestion->delete();
            return response()->json([
                'status' => 200,
                'message' => 'care_suggestion  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No care_suggestion  Found',
            ]);
        }


    }
}
