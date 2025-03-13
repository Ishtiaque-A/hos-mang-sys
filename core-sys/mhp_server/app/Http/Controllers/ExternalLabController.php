<?php

namespace App\Http\Controllers;

use App\Models\MhpAppointmentScheduler;
use App\Models\MhpDoctorsMaster;
use App\Models\MhpLabDocInboxFile;
use App\Models\MhpLabModule;
use App\Models\MhpPatient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ExternalLabController extends Controller
{
    public function organization_list()
    {

        $response = Http::get(env('SAAS_URL') . '/organization-list');
        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json(['error' => 'Failed to retrieve organization list'], $response->status());
        }
    }
    public function findBranch($id)
    {
        // return $id;
        $response = Http::get(env('SAAS_URL') . '/branch-public' . '/' . $id);
        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json([
                'error' => 'Failed to retrieve branch list', 'res' => $response->getBody()
            ], $response->status());
        }
    }
    public function doctor_info($id)
    {
        $data = MhpDoctorsMaster::with('specialist', 'academic')->where('dr_identity_no', $id)
            // ->select('dr_identity_no', 'dr_given_name','dr_middle_name','dr_last_name')
            ->first();
        if ($data) {
            return response()->json($data);
        }
        return response()->json(['error' => 'Doctor Not Found'], 404);
    }
    public function patient_info($id)
    {
        $data = MhpPatient::with('blood_group', 'patient_birth_sex')->where('patient_hn_number', $id)
            ->select('patient_last_name', 'patient_middle_name', 'patient_first_name', 'patient_birth_sex_id', 'ptn_blood_group_id', 'patient_dob')
            ->first();
        if ($data) {
            return response()->json($data);
        }
        return response()->json(['error' => 'Patient Not Found'], 404);
    }

    public function ex_lab_file_upload(Request $request)
    {
        // return $request->titles;
        $doctor = MhpDoctorsMaster::where('dr_identity_no', $request->doctor_id)->first();
        if (!$doctor) {
            return response()->json(['message' => "Doctor Not Found",], 404);
        }
        $patient = MhpPatient::where('patient_hn_number', $request->patient_hn)->first();
        if (!$patient) {
            return response()->json(['message' => "Patient Not Found",], 404);
        }
        $appointment = MhpAppointmentScheduler::where('doctors_id', $doctor->id)
            ->where('patient_id', $patient->id)
            ->first();
        if (!$appointment) {
            return response()->json(['message' => "Appointment Not Found",], 404);
        }
        try {
            $lab_module = new MhpLabModule();
            $lab_module->patient_id = $patient->id;
            $lab_module->doctor_id = $doctor->id;
            if ($request->saas_branch_id && $request->saas_branch_name) {
                $lab_module->saas_branch_id = $request->saas_branch_id;
                $lab_module->saas_branch_name = $request->saas_branch_name;
            }
            $lab_module->lab_name = $request->lab_name;
            $lab_module->center_id = $request->center_id;
            $lab_module->remarks = $request->remarks;
            $lab_module->report_file = "external";
            $lab_module->report_support_file = $request->report_type;
            $lab_module->remarks = $request->remarks;
            $lab_module->status = 'Unread';
            $lab_module->save();
            $titles = json_decode($request->titles);
            $images = [];
            if (is_array($request->images) && count($request->images) > 0) {
                foreach ($request->file('images') as $key => $image) {
                    $filename = time() . '' . rand(11, 99999) . '.' . $image->getClientOriginalExtension();
                    $image->move('images/external_lab', $filename);
                    $images[] = [
                        'message_id' => $lab_module->id,
                        'file_name' => $filename,
                        'title' => $titles[$key],
                    ];
                }
            } else {
                return response()->json(['error' => 'Image array is empty'], 503);
            }
            try {
                MhpLabDocInboxFile::insert($images);
                return response()->json(['success' => 'Successfully lab report uploaded']);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 401);
            }
            // }
            return response()->json(['status' => 200, 'message' => 'Report Sent Successfully']);
        } catch (\Exception $e) {
            // Handle the exception here
            return response()->json(['status' => 500, 'message' => 'An error occurred: ' . $e->getMessage()]);
        }
    }
}
