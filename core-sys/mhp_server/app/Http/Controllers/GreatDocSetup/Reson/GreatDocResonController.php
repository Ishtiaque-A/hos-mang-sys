<?php

namespace App\Http\Controllers\GreatDocSetup\Reson;

use App\Http\Controllers\Controller;
use App\Models\MhpAppointmentScheduler;
use Illuminate\Http\Request;
use App\Models\MhpGreatDocReson;
use DB;

class GreatDocResonController extends Controller
{

    public function index($id)
    {
        $todaysDate = date("Y-m-d");
        // $checkUpdate=(date('Y-m-d', strtotime('-1 day', strtotime($todaysDate))));

        $allReasons = MhpGreatDocReson::where('created_at', 'LIKE', '%' . $todaysDate . '%')->where('patient_id', $id)->get();
        return response()->json([
            'status' => 200,
            'allReasons' => $allReasons
        ]);
    }

    public function reson_for_visit($id)
    {

        $allReasons = MhpGreatDocReson::where('patient_id', $id)->get();
        return response()->json([
            'status' => 200,
            'allReasons' => $allReasons
        ]);
    }



    public function store(Request $request)
    {
        $reson = new MhpGreatDocReson();
        $reson->reson_name = $request->reson_name;
        $reson->code = $request->code;
        $reson->appointment_id = $request->appointment_id;
        $reson->reson_for_name  = $request->reson_for_name;
        $reson->reson_further_details = $request->reson_further_details;
        $reson->patient_id = $request->patient_id;
        $reson->nurse_id = $request->nurse_id;
        $reson->category_name = $request->category_name;
        $reson->last_check_up_date = $request->last_check_up_date;
        $reson->date = date("Y-m-d");
        $reson->save();
        $resonfor =  MhpGreatDocReson::where('patient_id', $request->patient_id)
            ->where('date', date("Y-m-d"))
            ->get();
        return response()->json([
            'status' => 200,
            'message' => 'Reason Added Successfully',
            "resonfor" => $resonfor
        ]);
    }
    public function saveReasonFromNurse(Request $request)
    {
        $checkNow = date("Y-m-d");
        $appointment = MhpAppointmentScheduler::where('StartTime', 'LIKE', '%' . $checkNow . '%')
            ->where('patient_id', $request->patient_id)
            ->where('delete_status', 0)->get();
        if (count($appointment) > 0) {
            foreach ($appointment as $key => $value) {
                $reson = new MhpGreatDocReson();
                $reson->reson_name = $request->reson_name;
                $reson->code = $request->code;
                $reson->appointment_id = $value->id;
                $reson->reson_for_name  = $request->reson_for_name;
                $reson->reson_further_details = $request->reson_further_details;
                $reson->patient_id = $request->patient_id;
                $reson->nurse_id = $request->nurse_id;
                $reson->category_name = $request->category_name;
                $reson->last_check_up_date = $request->last_check_up_date;
                $reson->date = date("Y-m-d");
                $reson->save();
            }
        }

        $resonfor =  MhpGreatDocReson::where('patient_id', $request->patient_id)
            ->where('date', date("Y-m-d"))
            ->get();
        return response()->json([
            'status' => 200,
            'message' => 'Reason Added Successfully',
            "resonfor" => $resonfor
        ]);
    }

    public function deleteReasonForVisit(Request $request, $id)
    {
        $deleteData = MhpGreatDocReson::find($id);
        $deleteData->delete();
        return response()->json([
            'status' => 200
        ]);
    }

    public function editReasonForVisit($id)
    {
        $edit_reason = MhpGreatDocReson::find($id);
        return response()->json([
            'status' => 200,
            'edit_reason' => $edit_reason
        ]);
    }
    public function updateReasonForVisit(Request $request, $id)
    {
        $update_reson = MhpGreatDocReson::find($id);
        $update_reson->reson_name = $request->reson_name;
        $update_reson->reson_for_name  = $request->reson_for_name;
        $update_reson->reson_further_details = $request->reson_further_details;
        $update_reson->patient_id = $request->patient_id;
        $update_reson->nurse_id = $request->nurse_id;
        $update_reson->category_name = $request->category_name;
        $update_reson->last_check_up_date = $request->last_check_up_date;
        $update_reson->update();

        return response()->json([
            'status' => 200,
            'message' => 'Reason Updated Successfully',
            'update_reson' => $update_reson
        ]);
    }
}
