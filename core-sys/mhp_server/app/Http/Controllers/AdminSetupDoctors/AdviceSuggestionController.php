<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpAdviceSuggestion;
use Illuminate\Support\Facades\Validator;

class AdviceSuggestionController extends Controller
{
    //

    public function index()
    {
        $advice_suggestions = MhpAdviceSuggestion::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
           'status' => 200,
            'advice_suggestions' => $advice_suggestions,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
           'advice_suggestions_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'error_msg' => $validator->messages(),
            ]);
        }else{

            $data = new MhpAdviceSuggestion();
            $data->advice_suggestions_name = $request->advice_suggestions_name;
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'Advice Suggestions Added Successfully',
            ]);

        }
    }

    public function edit($id)
    {
        $advice_suggestions = MhpAdviceSuggestion::find($id);

        if ($advice_suggestions)
        {
            return response()->json([
                'status' => 200,
                'advice_suggestions' => $advice_suggestions,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Advice Suggestions Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $data = MhpAdviceSuggestion::find($id);

        if ($data)
        {

            $validator = Validator::make($request->all(),[
                'advice_suggestions_name' => 'required|max:100',
            ]);

            if ($validator->fails())
            {
                return response()->json([
                    'error_msg' => $validator->messages(),
                ]);
            }else{
                $data->advice_suggestions_name = $request->advice_suggestions_name;
                $data->update();
                return response()->json([
                   'status' => 200,
                   'message' => 'Advice Suggestions Updated Successfully',
                ]);
            }

        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Advice Suggestions Found',
            ]);
        }
    }

    public function destroy($id)
    {
        $occupational_hazards = MhpAdviceSuggestion::find($id);
        if ($occupational_hazards)
        {
            if ($occupational_hazards['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $occupational_hazards->delete_status = $delete_status;
            $occupational_hazards->save();
            return response()->json([
                'status' => 200,
                'message' => 'Advice Suggestions deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Advice Suggestions Found',
            ]);
        }

    }

    public function advice_suggestions_dropdown()
    {
        $advice_suggestions = MhpAdviceSuggestion::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'advice_suggestions' => $advice_suggestions,
        ]);
    }

}
