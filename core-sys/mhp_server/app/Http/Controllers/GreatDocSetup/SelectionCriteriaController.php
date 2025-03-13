<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpSelectionCriteria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SelectionCriteriaController extends Controller
{
    //

    public function index()
    {
        $selection_criteria = MhpSelectionCriteria::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'selection_criteria' => $selection_criteria,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'selection_criteria_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $selection_criteria = new MhpSelectionCriteria();
            $selection_criteria->selection_criteria_name = $request->selection_criteria_name;
            $selection_criteria->save();

            return response()->json([
                'status' => 200,
                'message' => 'Selection Criteria Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $selection_criteria = MhpSelectionCriteria::find($id);

        if ($selection_criteria)
        {
            return response()->json([
                'status' => 200,
                'selection_criteria' => $selection_criteria,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Selection Criteria Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'selection_criteria_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $selection_criteria = MhpSelectionCriteria::find($id);
            $selection_criteria->selection_criteria_name = $request->selection_criteria_name;
            $selection_criteria->update();

            return response()->json([
                'status' => 200,
                'message' => 'Selection Criteria Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
        $selection_criteria = MhpSelectionCriteria::find($id);
        if ($selection_criteria)
        {
            if ($selection_criteria['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $selection_criteria->delete_status = $delete_status;
            $selection_criteria->save();

            return response()->json([
                'status' => 200,
                'message' => 'Selection Criteria deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Selection Criteria Found',
            ]);
        }
    }

}
