<?php

namespace App\Http\Controllers\LabModule;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLabModule;
use App\Models\MhpRadiologyCenter;
use App\Models\MhpRadiologyTestName;
use App\Models\LabTestName;
use App\Models\DoctorInbox;
use Illuminate\Support\Facades\Validator;
use DB;
use App\Mail\LabToDoctor;
use App\Models\MhpLabDocInboxFile;
use Illuminate\Support\Facades\Mail;

use function PHPUnit\Framework\isNull;

class LabModuleController extends Controller
{


    public function store(Request $request)
    {
        $alreadyExist = MhpLabModule::where('report_id', $request->report_id)->first();
        if (!$alreadyExist) {
            $lab_module = new MhpLabModule();
            if ($request->hasFile('report_support_file')) {
                $file = $request->file('report_support_file');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('lab_modules/', $filename);
                $lab_module->report_support_file = $filename;
            }
            $lab_module->report_file = 'internal';
            $lab_module->patient_id = $request->patient_id;
            $lab_module->doctor_id = $request->doctor_id;
            $lab_module->report_id = $request->report_id;
            $lab_module->lab_name = $request->lab_name;
            $lab_module->center_id = $request->center_id;
            $lab_module->status = $request->status;
            $lab_module->report_description = $request->report_description;
            $lab_module->remarks = $request->remarks;
            $lab_module->save();
            return response()->json(['status' => 200, 'message' => 'Test Sent Successfully']);
        }
        return response()->json(['status' => 403, 'message' => 'Test Already Sent']);
    }



    public function allTestNameSearchById($id)
    {
        $test_names = LabTestName::where('test_type_id', $id)->get();

        return response()->json([
            'status' => 200,
            'test_names' => $test_names,
        ]);
    }
    public function labModuleSearchById($id)
    {

        $patient_labs = DB::table('mhp_lab_modules')->leftJoin('mhp_lab_test_types', 'mhp_lab_modules.test_type_id', 'mhp_lab_test_types.id')->leftJoin('lab_test_names', 'lab_test_names.id', 'mhp_lab_modules.test_name_id')->select('mhp_lab_test_types.name', 'lab_test_names.test_name', 'mhp_lab_modules.*')->where('patient_id', $id)->get();

        return response()->json([
            'status' => 200,
            'patient_labs' => $patient_labs,
        ]);
    }

    public function destroy($id)
    {

        $del_slots = MhpLabModule::find($id);

        $del_slots->delete();
        return response()->json([
            'status' => 200,

        ]);
    }

    public function patientLabWithDoctor($doctorId)
    {


        // $doc_labs_patient=DB::table('mhp_lab_modules')
        // ->leftJoin('mhp_patients','mhp_patients.id','mhp_lab_modules.patient_id')
        // ->where('mhp_lab_modules.reference_id',$doctorId)
        // ->select('mhp_patients.patient_preferred_name','mhp_patients.patient_address1','mhp_patients.patient_images','mhp_lab_modules.date','mhp_patients.id as patient_id','mhp_lab_modules.id as lab_id')
        // ->distinct('mhp_lab_modules.patient_id')
        // ->get();

        $doc_labs_patient = DB::table('mhp_lab_modules')
            ->leftJoin('mhp_patients', 'mhp_patients.id', 'mhp_lab_modules.patient_id')
            ->where('mhp_lab_modules.doctor_id', $doctorId)
            ->select('mhp_patients.patient_first_name', 'mhp_patients.patient_middle_name', 'mhp_patients.patient_last_name', 'mhp_patients.patient_address1', 'mhp_patients.patient_images', 'mhp_patients.id as patient_id')
            ->distinct('mhp_lab_modules.patient_id')
            ->where('mhp_lab_modules.status', 'Unread')
            // ->orderBy('mhp_lab_modules.id', 'desc')
            ->get();

        return response()->json([
            'status' => 200,
            'doc_labs_patient' => $doc_labs_patient,
        ]);
    }
    public function patientLabReport($doctorId, $patientId)
    {

        $patient_labs = MhpLabModule::with('patient', 'reports', 'doctor', 'files')
            ->where('status', 'Unread')
            ->where('patient_id', $patientId)
            ->where('doctor_id', $doctorId)
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'status' => 200,
            'patient_labs' => $patient_labs,
        ]);
    }
    public function patientLabReportGreatDoc($doctorId, $patientId)
    {

        $patient_labs = MhpLabModule::with('patient', 'reports', 'doctor', 'files')
            ->where('patient_id', $patientId)
            ->where('doctor_id', $doctorId)
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'status' => 200,
            'patient_labs' => $patient_labs,
        ]);
    }
    public function patientLabReportDischarge($doctorId, $patientId)
    {

        $patient_labs = MhpLabModule::where('patient_id', $patientId)
            ->where('doctor_id', $doctorId)
            ->pluck('id')->toArray();
        $files = MhpLabDocInboxFile::whereIn('message_id', $patient_labs)->get();
        return response()->json([
            'status' => 200,
            'patient_labs' => $files,
        ]);
    }

    //save doctor inbox

    public function saveDoctorInbox(Request $request)
    {
        $save_dr_inbox = MhpLabModule::find($request->id);
        $save_dr_inbox->result = $request->result;
        $save_dr_inbox->action_taken = $request->action_taken;
        $save_dr_inbox->status = 'seen';

        $save_dr_inbox->save();

        return response()->json(['status' => 200, 'message' => 'Report Saved Successfully']);
    }


    ///mail to doctor

    public function mail()
    {
        Mail::to('therichposts@gmail.com')->send(new PaymentDone());
        return response()->json(["message" => "Email sent successfully."]);
    }
}
