<?php

namespace App\Http\Controllers;

use App\Models\MhpAppointmentScheduler;
use App\Models\MhpDoctorsMaster;
use App\Models\MhpPatient;
use App\Models\MhpPatientRequest;
use App\Models\OnlineAppointmentBooking;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function getPatientList(Request $request)
    {
        $organization_id = $request->organization ?? null;
        $branch = $request->branch ?? null;
        $search = $request->search ?? null;
        $page = $request->page ?? 1;
        $per_page = $request->per_page ?? 10;
        $start_date = $request->start_date ? Carbon::parse($request->start_date) : null;
        $end_date = $request->end_date ? Carbon::parse($request->end_date) : null;

        $data = User::where('user_type', 'patient')
            ->with('latestComment', 'isConnectedWithDoctor')
            ->when($branch, function ($query) use ($branch) {
                return $query->where('saas_branch_id', $branch);
            })
            ->when($organization_id, function ($query) use ($organization_id) {
                return $query->where('organization_id', $organization_id);
            })
            ->when($search, function ($query) use ($search) {
                return $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('mobile', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('patient_hn_number', 'like', '%' . $search . '%');
            })
            ->when($start_date, function ($query) use ($start_date) {
                return $query->whereDate('created_at', '>=', $start_date);
            })
            ->when($end_date, function ($query) use ($end_date) {
                return $query->whereDate('created_at', '<=', $end_date);
            })
            ->orderBy('id', 'desc')
            ->paginate($per_page, ['*'], 'page', $page);

        return response()->json($data);
    }

    public function getPatientSummary(Request $request)
    {
        $organization_id = $request->organization ?? null;
        $branch = $request->branch ?? null;
        $registeredPatient = User::where('user_type', 'patient')
            ->when($branch, function ($query) use ($branch) {
                return $query->where('saas_branch_id', $branch);
            })
            ->when($organization_id, function ($query) use ($organization_id) {
                return $query->where('organization_id', $organization_id);
            })
            ->count();
        $registeredGd = User::where(['user_type' => 'patient', 'regFrom' => 'greatDoc'])
            ->when($branch, function ($query) use ($branch) {
                return $query->where('saas_branch_id', $branch);
            })
            ->when($organization_id, function ($query) use ($organization_id) {
                return $query->where('organization_id', $organization_id);
            })
            ->count();
        $registeredApp = User::where(['user_type' => 'patient', 'regFrom' => 'app'])
            ->when($branch, function ($query) use ($branch) {
                return $query->where('saas_branch_id', $branch);
            })
            ->when($organization_id, function ($query) use ($organization_id) {
                return $query->where('organization_id', $organization_id);
            })
            ->count();


        $registeredPatientIds = User::where('user_type', 'patient')
            ->when($branch, function ($query) use ($branch) {
                return $query->where('saas_branch_id', $branch);
            })
            ->pluck('user_id');

        $connectWithDoctor = MhpPatientRequest::whereIn('patient_id', $registeredPatientIds)
            ->when($branch, function ($query) use ($branch) {
                return $query->where('saas_branch_id', $branch);
            })->distinct('patient_id')->count();
        $nonConnectWithDoctor = $registeredPatient - $connectWithDoctor > 0 ? $registeredPatient - $connectWithDoctor : 0;
        return response()->json([
            'registeredPatient' => $registeredPatient,
            'connectWithDoctor' => $connectWithDoctor,
            'nonConnectWithDoctor' => $nonConnectWithDoctor,
            'registeredGd' => $registeredGd,
            'registeredApp' => $registeredApp,
        ]);
    }
    public function getPatientAndDoctorList(Request $request)
    {
        $organization_id = $request->organization ?? null;
        $branch = $request->branch ?? null;
        $patients = MhpPatient::when($branch, function ($query) use ($branch) {
            return $query->where('saas_branch_id', $branch);
        })->get();
        $doctors = MhpDoctorsMaster::when($branch, function ($query) use ($branch) {
            return $query->where('saas_branch_id', $branch);
        })->get();
        return response()->json([
            'patients' => $patients,
            'doctors' => $doctors,
        ]);
    }
    public function getAppointmentSummary(Request $request)
    {
        $organization_id = $request->organization ?? null;
        $branch = $request->branch ?? null;
        $totalAppointment = OnlineAppointmentBooking::when($branch, function ($query) use ($branch) {
            return $query->where('saas_branch_id', $branch);
        })->count();
        $unConfirmedAppointment = OnlineAppointmentBooking::whereNull('reschedule_id')
            ->when($branch, function ($query) use ($branch) {
                return $query->where('saas_branch_id', $branch);
            })->count();
        $confirmedAppointment = OnlineAppointmentBooking::whereNotNull('reschedule_id')
            ->when($branch, function ($query) use ($branch) {
                return $query->where('saas_branch_id', $branch);
            })->count();
        return response()->json([
            'totalAppRequest' => $totalAppointment,
            'confirmAppointment' => $confirmedAppointment,
            'unConfirmedAppointment' => $unConfirmedAppointment,
        ]);
    }
    public function getAppointmentRequestList(Request $request)
    {
        $organization_id = $request->organization ?? null;
        $branch = $request->branch ?? null;
        $patient = $request->patient ?? null;
        $doctor = $request->doctor ?? null;
        $page = $request->page ?? 1;
        $per_page = $request->per_page ?? 10;
        $start_date = $request->start_date ? Carbon::parse($request->start_date) : null;
        $end_date = $request->end_date ? Carbon::parse($request->end_date) : null;
        $data = OnlineAppointmentBooking::with('patients', 'doctors', 'appointment', 'consult_comment', 'appointment_comment')
            ->when($branch, function ($query) use ($branch) {
                return $query->where('saas_branch_id', $branch);
            })
            ->when($patient, function ($query) use ($patient) {
                return $query->where('patient_hn_number', $patient);
            })
            ->when($doctor, function ($query) use ($doctor) {
                return $query->where('doctors_id', $doctor);
            })
            ->when($start_date, function ($query) use ($start_date) {
                return $query->whereDate('created_at', '>=', $start_date);
            })
            ->when($end_date, function ($query) use ($end_date) {
                return $query->whereDate('created_at', '<=', $end_date);
            })
            ->orderBy('id', 'desc')
            ->paginate($per_page, ['*'], 'page', $page);
        return response()->json($data);
    }
    public function appointmentList(Request $request)
    {
        $data = MhpAppointmentScheduler::where(['doctors_id' => $request->doctor, 'patient_id' => $request->patient])
            ->orderBy('id', 'desc')->get();
        return response()->json($data);
    }
}
