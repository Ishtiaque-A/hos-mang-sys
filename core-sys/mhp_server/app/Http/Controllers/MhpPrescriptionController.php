<?php

namespace App\Http\Controllers;

use App\Models\MhpAppointmentScheduler;
use App\Models\MhpPatient;
use Illuminate\Http\Request;
use App\Models\MhpPatientPrescription;
use App\Models\MhpPatientsLabReportFile;
use App\Models\UploadedPrescription;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Sandy\ApiResponse\Facades\ApiResponse;

class MhpPrescriptionController extends Controller
{
    public function doctorPrescription($doctorId, $patientId)
    {
        $startDate = Carbon::now()->subMonths(3);
        $endDate = Carbon::now();

        $get_prescription_image = UploadedPrescription::with('patient', 'doctor', 'prescription')
            ->where('patient_id', $patientId)
            ->where('doctor_id', $doctorId)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->latest()->get();
        return response()->json(['success' => "Successfully get all data", $get_prescription_image]);
    }

    public function PatientPrescriptionImages($patientId)
    {
        $get_prescription_image = MhpPatientPrescription::with('patient', 'doctor')->where('patient_id', $patientId)->latest()->get();
        return response()->json(['success' => "Successfully get all data", $get_prescription_image]);
    }


    public function patientPrescription($patientId)
    {
        $startDate = Carbon::now()->subMonths(3);
        $endDate = Carbon::now();

        $get_prescription_image = UploadedPrescription::with('patient', 'doctor', 'prescription')->where('patient_id', $patientId)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->latest()->get();
        return response()->json(['success' => "Successfully get all data", $get_prescription_image]);
    }

    public function store(Request $request)
    // {
    //     $request->validate([
    //         'appointment_id' => 'required',
    //         'patient_id' => 'required',
    //         'doctor_id' => 'required',
    //         'images.*' => 'required | mimes:jpeg,png,jpg,gif,svg',
    //     ]);
    //     $patient = MhpPatient::where('id', $request->patient_id)->first();
    //     $images = [];
    //     if (is_array($request->images) && count($request->images) > 0) {
    //         foreach ($request->file('images') as $image) {
    //             $filename = time() . '' . rand(11, 99999) . '.' . $image->getClientOriginalExtension();
    //             $image->move('images/online_prescription', $filename);
    //             $images[] = [
    //                 'doctor_id' => $request->doctor_id,
    //                 'appointment_id' => $request->appointment_id,
    //                 'patient_id' => $request->patient_id,
    //                 'patient_hn' => $patient->patient_hn_number,
    //                 'saas_branch_id' => $request->saas_branch_id,
    //                 'prescription_url' => $filename,
    //                 'date' => Carbon::now(),
    //                 'created_at' => Carbon::now(),
    //             ];
    //         }
    //     } else {
    //         return response()->json(['error' => 'Image array is empty'], 503);
    //     }

    //     try {
    //         $data = new UploadedPrescription();
    //         $data->doctor_id = $request->doctor_id;
    //         $data->patient_id = $request->patient_id;
    //         $data->appointment_id = $request->appointment_id;
    //         $data->saas_branch_id = $request->saas_branch_id;
    //         $data->patient_hn = $patient->patient_hn_number;
    //         $data->save();
    //         MhpPatientPrescription::insert($images);
    //         // $appointment_completed = MhpAppointmentScheduler::findOrFail($request->appointment_id);
    //         // $appointment_completed->appointment_completed = 1;
    //         // $appointment_completed->status_color = "#0af50a";
    //         // $appointment_completed->save();

    //         return response()->json(['success' => 'Successfully appointment completed']);
    //     } catch (Exception $e) {
    //         Log::error($e);
    //         return response()->json(['error' => $e->getMessage()], 401);
    //     }
    // }
    {
        $request->validate([
            'appointment_id' => 'required',
            'patient_id' => 'required',
            'doctor_id' => 'required',
            'images.*' => 'required|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $patient = MhpPatient::where('id', $request->patient_id)->first();
        $images = [];

        if (is_array($request->images) && count($request->images) > 0) {
            foreach ($request->file('images') as $image) {
                $filename = time() . '' . rand(11, 99999) . '.' . $image->getClientOriginalExtension();
                $image->move('images/online_prescription', $filename);
                $images[] = [
                    'doctor_id' => $request->doctor_id,
                    'appointment_id' => $request->appointment_id,
                    'patient_id' => $request->patient_id,
                    'patient_hn' => $patient->patient_hn_number,
                    'saas_branch_id' => $request->saas_branch_id,
                    'prescription_url' => $filename,
                    'date' => Carbon::now(),
                    'created_at' => Carbon::now(),
                ];
            }
        } else {
            return response()->json(['error' => 'Image array is empty'], 503);
        }

        try {
            // Check if an entry already exists with the same appointment_id
            $existingEntry = UploadedPrescription::where('appointment_id', $request->appointment_id)->first();

            if (!$existingEntry) {
                $data = new UploadedPrescription();
                $data->doctor_id = $request->doctor_id;
                $data->patient_id = $request->patient_id;
                $data->appointment_id = $request->appointment_id;
                $data->saas_branch_id = $request->saas_branch_id;
                $data->patient_hn = $patient->patient_hn_number;
                $data->save();
            }
            MhpPatientPrescription::insert($images);

            return response()->json(['success' => 'Successfully appointment completed']);
        } catch (Exception $e) {
            Log::error($e);
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }
    public function upload_lab_report(Request $request)
    {

        $request->validate([
            'patient_id' => 'required',
            'name' => 'required',
            'images.*' => 'required | mimes:jpeg,png,jpg,gif,svg,pdf',
        ]);

        $images = [];
        if (is_array($request->images) && count($request->images) > 0) {
            foreach ($request->file('images') as $image) {
                $filename = time() . '' . rand(11, 99999) . '.' . $image->getClientOriginalExtension();
                $image->move('images/patients_reports', $filename);
                $images[] = [
                    'patient_id' => $request->patient_id,
                    'name' => $request->name,
                    'file' => $filename,
                    'type_of_report' => $request->type_of_report,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];
            }
        } else {
            return response()->json(['error' => 'Image array is empty'], 503);
        }

        try {
            MhpPatientsLabReportFile::insert($images);
            return response()->json(['success' => 'Successfully lab report uploaded']);
        } catch (Exception $e) {
            Log::error($e);
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }
    public function getLabReportsFromGreatDoc(Request $request)
    {
        try {
            $patientId = $request->input('patientId');
            $toDate = $request->input('toDate');
            $fromDate = $request->input('fromDate');
            $formattedToDate = $toDate ? Carbon::parse($toDate)->format('Y-m-d 23:59:59') : null;
            $formattedFromDate = $fromDate ? Carbon::parse($fromDate)->startOfDay()->addDay()->format('Y-m-d 00:00:00') : null;


            $report = MhpPatientsLabReportFile::where('patient_id', $patientId)
                ->when($formattedFromDate, function ($query, $formattedFromDate) {
                    return $query->where('created_at', '>=', $formattedFromDate);
                })
                ->when($formattedToDate, function ($query, $formattedToDate) {
                    return $query->where('created_at', '<=', $formattedToDate);
                })
                ->get();

            if ($report->isEmpty()) {
                return response()->json(['error' => 'No data found'], 404);
            }
            return response()->json($report, 200);
        } catch (\Throwable $th) {
            Log::error($th);
            return response()->json(['error' => 'Something went wrong', 'message' => $th], 500);
        }
    }

    public function getPrescriptionFromGreatDoc(Request $request)
    {
        try {
            $patientId = $request->input('patientId');
            $doctorId = $request->input('doctorId');
            $toDate = $request->input('toDate');
            $fromDate = $request->input('fromDate');
            $formattedToDate = $toDate ? Carbon::parse($toDate)->format('Y-m-d 23:59:59') : null;
            $formattedFromDate = $fromDate ? Carbon::parse($fromDate)->startOfDay()->addDay()->format('Y-m-d 00:00:00') : null;

            $prescription = MhpPatientPrescription::where('patient_id', $patientId)
                ->where('doctor_id', $doctorId)
                ->when($formattedFromDate, function ($query, $formattedFromDate) {
                    return $query->where('created_at', '>=', $formattedFromDate);
                })
                ->when($formattedToDate, function ($query, $formattedToDate) {
                    return $query->where('created_at', '<=', $formattedToDate);
                })
                ->get();

            if ($prescription->isEmpty()) {
                return response()->json(['error' => 'No data found'], 404);
            }
            return response()->json($prescription, 200);
        } catch (\Throwable $th) {
            Log::error($th);
            return response()->json(['error' => 'Something went wrong', 'message' => $th], 500);
        }
    }
    public function get_lab_report($patientId)
    {
        $groupedDataByName = MhpPatientsLabReportFile::where('patient_id', $patientId)->orderBy('id', 'desc')->get();
        // $arrayData
        return ApiResponse::success($groupedDataByName);
    }
}
