<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use App\Models\MhpHistoryExaminationStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HistoryExamStatusController extends Controller
{
    //
    public function index()
    {
        $history_exam_status = MhpHistoryExaminationStatus::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'history_exam_status' => $history_exam_status,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'history_exam_status_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $history_exam_status = new MhpHistoryExaminationStatus();
            $history_exam_status->history_exam_status_name = $request->input('history_exam_status_name');
            $history_exam_status->save();

            return response()->json([
                'status' => 200,
                'message' => 'History Examination Status Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $history_exam_status = MhpHistoryExaminationStatus::find($id);
        if ($history_exam_status) {
            return response()->json([
                'status' => 200,
                'history_exam_status' => $history_exam_status,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No History Examination Status Id Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'history_exam_status_name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $history_exam_status = MhpHistoryExaminationStatus::find($id);
            if ($history_exam_status) {
                $history_exam_status->history_exam_status_name = $request->input('history_exam_status_name');
                $history_exam_status->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'History Examination Status Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No History Examination Status Id Found',
                ]);
            }
        }

    }

    public function destroy($id)
    {
        $history_exam_status = MhpHistoryExaminationStatus::find($id);
        if ($history_exam_status)
        {
            if ($history_exam_status['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $history_exam_status->delete_status = $delete_status;
            $history_exam_status->save();
            return response()->json([
                'status' => 200,
                'message' => 'History Examination Status deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No History Examination Status Found',
            ]);
        }
    }

    public function history_exam_status_dropdown()
    {
        $history_exam_status = MhpHistoryExaminationStatus::where('delete_status',0)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'history_exam_status' => $history_exam_status,
        ]);
    }

}
