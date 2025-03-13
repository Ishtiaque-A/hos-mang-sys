<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpExamHistExtension;
use App\Models\MhpExamHistoryMapping;
use App\Models\MhpExamHistSelectParam;
use App\Models\MhpExamination;
use App\Models\MhpHistory;
use App\Models\MhpSelectionCriteria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExamHistoryMappingController extends Controller
{
    //

    public function index()
    {
        $exam_history_mapping = MhpExamHistoryMapping::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'exam_history_mapping' => $exam_history_mapping,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'examination_name_id' => 'required|max:100',
            'history_name_id' => 'required|max:100',
            'selection_parameter_id' => 'required|max:100',
            'selection_criteria_id' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $exam_history_mapping = new MhpExamHistoryMapping();
            $exam_history_mapping->examination_name_id = $request->examination_name_id;
            $exam_history_mapping->history_name_id = $request->history_name_id;
            $exam_history_mapping->selection_parameter_id = $request->selection_parameter_id;
            $exam_history_mapping->selection_criteria_id = $request->selection_criteria_id;
            $exam_history_mapping->has_extension = $request->has_extension;
            $exam_history_mapping->extension_title = $request->extension_title;
            $exam_history_mapping->multiple_extension = $request->multiple_extension;
            $exam_history_mapping->single_selection = $request->single_selection;
            $exam_history_mapping->multiple_selection = $request->multiple_selection;
            $exam_history_mapping->save();

            return response()->json([
                'status' => 200,
                'message' => 'Exam History Added Successfully',
            ]);

        }

    }

    public function edit($id)
    {
        $exam_history_mapping = MhpExamHistoryMapping::find($id);

        if ($exam_history_mapping)
        {
            return response()->json([
                'status' => 200,
                'exam_history_mapping' => $exam_history_mapping,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Exam History Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'exam_history_mapping_name' => 'required|max:100',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $exam_history_mapping = MhpExamHistoryMapping::find($id);
            $exam_history_mapping->examination_name_id = $request->examination_name_id;
            $exam_history_mapping->history_name_id = $request->history_name_id;
            $exam_history_mapping->selection_parameter_id = $request->selection_parameter_id;
            $exam_history_mapping->selection_criteria_id = $request->selection_criteria_id;
            $exam_history_mapping->has_extension = $request->has_extension;
            $exam_history_mapping->extension_title = $request->extension_title;
            $exam_history_mapping->multiple_extension = $request->multiple_extension;
            $exam_history_mapping->single_selection = $request->single_selection;
            $exam_history_mapping->multiple_selection = $request->multiple_selection;
            $exam_history_mapping->update();

            return response()->json([
                'status' => 200,
                'message' => 'Exam History Updated Successfully',
            ]);

        }
    }

    public function destroy($id)
    {
        $exam_history_mapping = MhpExamHistoryMapping::find($id);
        if ($exam_history_mapping)
        {
            if ($exam_history_mapping['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $exam_history_mapping->delete_status = $delete_status;
            $exam_history_mapping->save();

            return response()->json([
                'status' => 200,
                'message' => 'Exam History deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Exam History Found',
            ]);
        }
    }

    public function exam_history_dropdown()
    {
        $examination = MhpExamination::where('delete_status',0)->orderBy('id','desc')->get();
        $history = MhpHistory::where('delete_status',0)->orderBy('id','desc')->get();
        $selection_parameter = MhpExamHistSelectParam::where('delete_status',0)->orderBy('id','desc')->get();
        $selection_criteria = MhpSelectionCriteria::where('delete_status',0)->orderBy('id','desc')->get();
        $extension = MhpExamHistExtension::where('delete_status',0)->orderBy('id','desc')->get();
        return response([
            'status' => 200,
            'examination' => $examination,
            'history' => $history,
            'extension' => $extension,
            'selection_parameter' => $selection_parameter,
            'selection_criteria' => $selection_criteria,
        ]);
    }


}
