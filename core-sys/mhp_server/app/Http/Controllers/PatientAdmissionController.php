<?php

namespace App\Http\Controllers;

use App\Models\MhpAppointmentScheduler;
use App\Models\PatientAdmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PatientAdmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = PatientAdmission::with('patient', 'specialist', 'department', 'doctor')
            ->orderBy('admission_date', 'desc')
            ->get();
        return response()->json([
            'status' => 'success',
            'message' => 'Applications retrieved successfully',
            'data' => $data
        ]);
    }

    public function show($id)
    {
        try {
            $data = PatientAdmission::with('patient', 'specialist', 'department', 'doctor')->findOrFail($id);

            return response()->json([
                'status' => 200,
                'message' => 'Patient admission retrieved successfully',
                'data' => $data,

            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve patient admission',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $data = new PatientAdmission();

            $data->patient_id = $request->patient_id;
            $data->status = $request->status;
            $data->PRN = $request->PRN;
            $data->specialist_id = $request->specialist_id;
            $data->department_id = $request->department_id;
            $data->doctor_id = $request->doctor_id;
            $data->block = $request->block;
            $data->level = $request->level;
            $data->unit = $request->unit;
            $data->admission_date = $request->admission_date;
            $data->ward = $request->ward;
            $data->bed = $request->bed;
            $data->cabin = $request->cabin;
            $data->note = $request->note;
            $data->reason_for_admission = $request->reason_for_admission;
            $data->referred_by = $request->referred_by;
            $data->paying = $request->paying;
            $data->nonpaying = $request->nonpaying;
            $data->save();

            return response()->json([
                'message' => 'Admission Added Successfully',
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to add admission',
                'error' => $e->getMessage()
            ], 500);
        }
        //
    }



    public function update(Request $request, $id)
    {
        try {
            $data = PatientAdmission::find($id);
            if (!$data) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Patient admission not found',
                ], 404);
            }
            $data->patient_id = $request->patient_id;
            $data->specialist_id = $request->specialist_id;
            $data->department_id = $request->department_id;
            $data->doctor_id = $request->doctor_id;
            $data->block = $request->block;
            $data->level = $request->level;
            $data->unit = $request->unit;
            $data->admission_date = $request->admission_date;
            $data->ward = $request->ward;
            $data->bed = $request->bed;
            $data->cabin = $request->cabin;
            $data->note = $request->note;
            $data->reason_for_admission = $request->reason_for_admission;
            $data->referred_by = $request->referred_by;
            $data->paying = $request->paying;
            $data->nonpaying = $request->nonpaying;
            $data->save();
            return response()->json([
                'message' => 'Admission Updated Successfully',
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update admission',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function destroy($id)
    {
        try {
            // Find the record by ID
            $patientAdmission = PatientAdmission::findOrFail($id);

            // Delete the record
            $patientAdmission->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Patient admission deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete patient admission',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getPatientAdmission($id)
    {
        $patientAdmission = PatientAdmission::where('patient_id', $id)
            ->where('status', '0')
            ->first();
        return response()->json([
            'status' => 'success',
            'message' => 'Patient admission retrieved successfully',
            'data' => $patientAdmission
        ]);
    }
    public function searchAdmission($param)
    {
        $patientAdmissions = DB::table('patient_admissions')
            ->join('mhp_patients', 'patient_admissions.patient_id', '=', 'mhp_patients.id')
            ->where(function ($query) use ($param) {
                $query->where('patient_hn_number', 'LIKE', '%' . $param . '%')
                    ->orWhere('patient_mobile_phone', 'LIKE', '%' . $param . '%')
                    ->orWhere('patient_dob', 'LIKE', '%' . $param . '%');
            })
            ->where('patient_admissions.status', 0)
            ->select(
                'patient_admissions.*',
                'mhp_patients.patient_first_name',
                'mhp_patients.patient_middle_name',
                'mhp_patients.patient_last_name',
                'mhp_patients.patient_hn_number',
                'mhp_patients.patient_dob',
                'mhp_patients.patient_mobile_phone'
            )
            ->get();


        // Append full name
        $patientAdmissions->transform(function ($admission) {
            $admission->fullName = $admission->patient_first_name;

            if (!empty($admission->patient_middle_name)) {
                $admission->fullName .= ' ' . $admission->patient_middle_name;
            }
            if (!empty($admission->patient_last_name)) {
                $admission->fullName .= ' ' . $admission->patient_last_name;
            }

            return $admission;
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Patient admission retrieved successfully',
            'data' => $patientAdmissions
        ]);
    }

    public function ipdAppointment(Request $request)
    {
        try {

            $scheduler = new MhpAppointmentScheduler();
            $scheduler->patient_name = $request->patient_name;
            $scheduler->doctors_id = $request->doctors_id;
            $scheduler->patient_id = $request->patient_id;
            $scheduler->patient_mobile = $request->patient_mobile;
            $scheduler->notes = null;
            $scheduler->StartTime = date('Y-m-d H:i:s');
            $scheduler->EndTime = date('Y-m-d H:i:s', strtotime('+10 minutes'));
            $scheduler->Subject = null;
            $scheduler->status_color = "#020131";
            $scheduler->app_type = "IPD";
            $scheduler->status_name = "Arrived";
            $scheduler->save();
            return response()->json([
                'status' => 200,
                'message' => 'Patient appointment successfully',
                'data' => $scheduler,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to make appointment',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function getIpdAppointment($id)
    {
        $patientAdmission = MhpAppointmentScheduler::where('doctors_id', $id)
            ->where('app_type', 'IPD')
            ->where('status_name', 'Arrived')
            ->with('patients')
            ->with('doctors')
            ->get();
        return response()->json([
            'status' => 'success',
            'message' => 'Patient admission retrieved successfully',
            'data' => $patientAdmission
        ]);
    }
}
