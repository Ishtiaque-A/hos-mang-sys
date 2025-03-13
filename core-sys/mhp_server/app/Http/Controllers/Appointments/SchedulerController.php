<?php

namespace App\Http\Controllers\Appointments;

// use Auth;
use DateTime;
use DateTimeZone;
use Carbon\Carbon;
use App\Models\MhpTimeSetup;
use Illuminate\Http\Request;
use App\Models\DoctorPayment;
use App\Models\MhpDoctorsMaster;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\MhpAccountsInvoice;
use App\Models\MhpAppointment;
use App\Models\MhpAppointmentScheduler;
use App\Models\MhpPatient;
use App\Models\MhpPrescriptionsList;
use App\Models\OnlineAppointmentBooking;
// use Facade\FlareClient\Http\Client;
use Illuminate\Support\Carbon as SupportCarbon;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use Mpdf\Tag\Tr;
use Sandy\ApiResponse\Facades\ApiResponse;

// use Illuminate\Support\Carbon;

class SchedulerController extends Controller
{
    public function adminSummaryDetails($id)
    {
        $doctors = MhpDoctorsMaster::where('saas_branch_id', $id)->get();

        $data = collect($doctors)->map(function ($doctor) {
            $doctor['total_appointment'] = MhpAppointmentScheduler::where('doctors_id', $doctor['id'])->count();
            $doctor['total_prescription'] = MhpPrescriptionsList::where('doctor_id', $doctor['id'])->count();
            return $doctor;
        });
        return response()->json($data, 200);
    }
    public function adminSummaryDetailsForChart(Request $request)
    {
        $branchData = getBranchData($request->header());
        if ($branchData['super_admin'] == false) {
            return response()->json([
                'message' => 'You are not authorized to access this route',
            ], 401);
        } else {
            $currentYear = Carbon::now()->format('Y');
            $transactions = [
                ['name' => 'Jan', 'data' => 0],
                ['name' => 'Feb', 'data' => 0],
                ['name' => 'Mar', 'data' => 0],
                ['name' => 'Apr', 'data' => 0],
                ['name' => 'May', 'data' => 0],
                ['name' => 'Jun', 'data' => 0],
                ['name' => 'Jul', 'data' => 2],
                ['name' => 'Aug', 'data' => 0],
                ['name' => 'Sep', 'data' => 0],
                ['name' => 'Oct', 'data' => 5],
                ['name' => 'Nov', 'data' => 0],
                ['name' => 'Dec', 'data' => 0],
            ];
            $resData = [
                'appointment_model' => [
                    'total_appointment' => 0,
                    "data" => []
                ],
                'prescription_model' => [
                    'total_prescription' => 0,
                    "data" => []
                ],
                'invoice_model' => [
                    'total_invoice' => 0,
                    "data" => []
                ],
                'doctor_model' => [
                    'total_doctor' => 0,
                    "data" => []
                ]
            ];
            $selectedBranches = $request->branches;
            if ($selectedBranches) {
                $resData['appointment_model']['total_appointment'] = MhpAppointmentScheduler::whereIn('saas_branch_id', $selectedBranches)->whereYear('created_at', $currentYear)->count();
                $resData['prescription_model']['total_prescription'] = MhpPrescriptionsList::whereIn('saas_branch_id', $selectedBranches)->whereYear('created_at', $currentYear)->count();
                $resData['invoice_model']['total_invoice'] = MhpAccountsInvoice::whereIn('saas_branch_id', $selectedBranches)->whereYear('created_at', $currentYear)->count();
                $resData['doctor_model']['total_doctor'] = MhpDoctorsMaster::whereIn('saas_branch_id', $selectedBranches)->whereYear('created_at', $currentYear)->count();
                $resData['appointment_model']['data'] = collect($transactions)->map(function ($transaction) use ($selectedBranches, $currentYear) {
                    $transaction['data'] = MhpAppointmentScheduler::whereIn('saas_branch_id', $selectedBranches)->whereYear('created_at', $currentYear)->whereMonth('created_at', Carbon::parse($transaction['name'])->format('m'))->count();
                    return $transaction;
                });
                $resData['prescription_model']['data'] = collect($transactions)->map(function ($transaction) use ($selectedBranches, $currentYear) {
                    $transaction['data'] = MhpPrescriptionsList::whereIn('saas_branch_id', $selectedBranches)->whereYear('created_at', $currentYear)->whereMonth('created_at', Carbon::parse($transaction['name'])->format('m'))->count();
                    return $transaction;
                });
                $resData['invoice_model']['data'] = collect($transactions)->map(function ($transaction) use ($selectedBranches, $currentYear) {
                    $transaction['data'] = MhpAccountsInvoice::whereIn('saas_branch_id', $selectedBranches)->whereYear('created_at', $currentYear)->whereMonth('created_at', Carbon::parse($transaction['name'])->format('m'))->count();
                    return $transaction;
                });
                $resData['doctor_model']['data'] = collect($transactions)->map(function ($transaction) use ($selectedBranches, $currentYear) {
                    $transaction['data'] = MhpDoctorsMaster::whereIn('saas_branch_id', $selectedBranches)->whereYear('created_at', $currentYear)->whereMonth('created_at', Carbon::parse($transaction['name'])->format('m'))->count();
                    return $transaction;
                });
                return response()->json($resData, 200);
            }

            $resData['appointment_model']['total_appointment'] = MhpAppointmentScheduler::whereYear('created_at', $currentYear)->count();
            $resData['prescription_model']['total_prescription'] = MhpPrescriptionsList::whereYear('created_at', $currentYear)->count();
            $resData['invoice_model']['total_invoice'] = MhpAccountsInvoice::whereYear('created_at', $currentYear)->count();
            $resData['doctor_model']['total_doctor'] = MhpDoctorsMaster::whereYear('created_at', $currentYear)->count();
            $resData['appointment_model']['data'] = collect($transactions)->map(function ($transaction) use ($selectedBranches, $currentYear) {
                $transaction['data'] = MhpAppointmentScheduler::whereYear('created_at', $currentYear)->whereMonth('created_at', Carbon::parse($transaction['name'])->format('m'))->count();
                return $transaction;
            });
            $resData['prescription_model']['data'] = collect($transactions)->map(function ($transaction) use ($selectedBranches, $currentYear) {
                $transaction['data'] = MhpPrescriptionsList::whereYear('created_at', $currentYear)->whereMonth('created_at', Carbon::parse($transaction['name'])->format('m'))->count();
                return $transaction;
            });
            $resData['invoice_model']['data'] = collect($transactions)->map(function ($transaction) use ($selectedBranches, $currentYear) {
                $transaction['data'] = MhpAccountsInvoice::whereYear('created_at', $currentYear)->whereMonth('created_at', Carbon::parse($transaction['name'])->format('m'))->count();
                return $transaction;
            });
            $resData['doctor_model']['data'] = collect($transactions)->map(function ($transaction) use ($selectedBranches, $currentYear) {
                $transaction['data'] = MhpDoctorsMaster::whereYear('created_at', $currentYear)->whereMonth('created_at', Carbon::parse($transaction['name'])->format('m'))->count();
                return $transaction;
            });
            return response()->json($resData, 200);
        }
    }
    public function adminSummaryData(Request $request)
    {
        $header = $request->header();
        $token = $header['authorization'][0];
        $url = env('SAAS_URL') . '/auth/branch/service/find-branch-by-organizationId';

        $client = new Client();
        $response = $client->request('GET', $url, [
            'headers' => [
                'Accept'        => 'application/json',
                'Authorization' => $token,
            ]
        ]);
        $statusCode = $response->getStatusCode();
        $allBranch = json_decode($response->getBody(), true);
        $allBranchData = $allBranch['data'];
        $data = collect($allBranchData)->map(function ($branch) {
            $branch['total_appointment'] = MhpAppointmentScheduler::where('saas_branch_id', $branch['id'])->count();
            $branch['total_doctor'] = MhpDoctorsMaster::where('saas_branch_id', $branch['id'])->count();
            $branch['total_prescription'] = MhpPrescriptionsList::where('saas_branch_id', $branch['id'])->count();
            $branch['total_invoice'] = MhpAccountsInvoice::where('saas_branch_id', $branch['id'])->count();
            return $branch;
        });



        return response()->json($data, $statusCode);
    }
    public function countAppointment(Request $request)

    {
        $currentMonth = Carbon::now()->format('m');

        $header = $request->header();
        $branchData = getBranchData($header);
        $allAppointmentCount = 0;
        $todayAppointmentCount = 0;
        $user_id = $request->header('user-id');

        if ($branchData['super_admin'] == false) {
            $allAppointmentCount = MhpAppointmentScheduler::where('doctors_id', $user_id)->whereMonth('created_at', $currentMonth)->count();
            $todayAppointmentCount = MhpAppointmentScheduler::where('doctors_id', $user_id)->whereDate('created_at', Carbon::today())->count();
        } else {
            $allAppointmentCount = MhpAppointmentScheduler::whereMonth('created_at', $currentMonth)->count();
            $todayAppointmentCount = MhpAppointmentScheduler::whereDate('created_at', Carbon::today())->count();
        }
        return response()->json([
            'allAppointmentCount' => $allAppointmentCount,
            'todayAppointmentCount' => $todayAppointmentCount,
        ], 200);
    }
    //
    public function save_scheduler(Request $request)
    {


        // return $request->all();

        //     Carbon::createFromFormat('Y-m-d H:i:s', $some_date, 'UTC')
        // ->setTimezone('America/Los_Angeles')

        $patientData = new MhpAppointmentScheduler();
        $patientData->patient_name = $request->patient_name;
        $patientData->doctors_id = $request->doctors_id;
        $patientData->patient_id = $request->patient_id;
        $patientData->patient_mobile = $request->patient_mobile;
        $patientData->notes = $request->notes;
        $patientData->StartTime = date('Y-m-d H:i:s', strtotime($request->StartTime));
        $patientData->EndTime = date('Y-m-d H:i:s', strtotime($request->EndTime));
        $patientData->Subject = $request->Subject;
        $patientData->status_color = $request->statusColor;
        $patientData->app_type = $request->app_type;
        $patientData->status_name = $request->statusName;

        $header = $request->header();
        $branchData = getBranchData($header);
        if ($branchData['super_admin'] == false) {
            $patientData->saas_branch_id = $branchData['branch_id'];
            $patientData->saas_branch_name = $branchData['branch_name'];
        }
        // if ( $request->patient_id != null){
        //     $patientData->status_color = "#e6f2e9";
        // }
        $patientData->save();
        return response()->json([
            'status' => 200,
            'message' => 'Scheduler Added Successfully',
            'saveData' => $patientData,

        ]);
    }

    public function appointment_completed($scheduleId)
    {
        $data = MhpAppointmentScheduler::find($scheduleId);
        $data->appointment_completed = 1;
        $data->status_color = "#0af50a";
        $data->save();
        return response()->json([
            'message' => 'Appointment complete successfully'
        ], 201);
    }

    public function save_online_appointment_scheduler(Request $request)
    {
        $dateString = $request->date . ' ' . $request->startTime;

        $validator = Validator::make(['date' => $dateString], [
            'date' => 'required|date_format:Y-m-d g:i a',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid date format!'

            ], 501);
        }
        $dateTime = DateTime::createFromFormat('Y-m-d g:i a', $dateString);
        $time24h = $dateTime->format('Y-m-d H:i:s');
        $date = $dateTime->format('d-m-Y');
        $time = $dateTime->format('g:i a');


        $headers  = $request->header();
        $branchData = getBranchData($headers);
        $patient = OnlineAppointmentBooking::find($request->appID);

        $patientData = new MhpAppointmentScheduler();
        if ($branchData['super_admin'] == false) {
            $patientData->saas_branch_id = $branchData['branch_id'];
            $patientData->saas_branch_name = $branchData['branch_name'];
        }
        $patientData->patient_name = $request->patient_name;
        $patientData->doctors_id = $request->doctors_id;
        $patientData->patient_id = $request->patientId;
        $patientData->patient_mobile = $request->patientMobile;
        $patientData->StartTime = date('Y-m-d H:i:s', strtotime($time24h));
        $patientData->EndTime = date('Y-m-d H:i:s', strtotime($time24h . ' + 10 minutes'));
        $patientData->status_name = $request->app_type === "Telehealth" ? "Arrived" : null;
        $patientData->status_color = $request->app_type === "Telehealth" ? "#ff7345" : "#020131";
        $patientData->app_type = $request->app_type === "Telehealth" ? "Telehealth" : "Chamber";
        $patientData->media = "App";
        $patientData->notes = $patient->disease;
        $patientData->save();


        $patient->payment_confirmation = 1;
        $patient->reschedule_id = $patientData->id;
        $patient->date = $request->date;
        if ($branchData['super_admin'] == false) {
            $patient->saas_branch_id = $branchData['branch_id'];
            $patient->saas_branch_name = $branchData['branch_name'];
        }

        $patient->save();

        $todaysDate = date("Y-m-d H:i:s");
        $payment = new DoctorPayment();
        if ($branchData['super_admin'] == false) {
            $payment->saas_branch_id = $branchData['branch_id'];
            $payment->saas_branch_name = $branchData['branch_name'];
        }
        $payment->doctor_id = $patient->doctor_id;
        $payment->patient_hn_number = $patient->patient_hn_number;
        $payment->payment_type = 'payment';
        $payment->amount = $patient->amount;
        $payment->date =  $todaysDate;
        $payment->transcition_number =  $patient->transaction_no;
        $payment->payment_method =  $patient->payment_type;
        $payment->phone_number =  $patient->transaction_phone_number;
        $payment->save();

        // Generate the SMS message
        $message = $patient->appointment_type == "Telehealth" ? "Your payment has been received. Appointment time: $date at $time ." : "Your appointment request accepted. Appointment time: $date at $time . Please come to chamber timely";
        $number = $request->patientMobile;
        try {
            // $response = Http::post(env('SAAS_URL') . '/auth/sms/send-sms', $data);
            Http::post("https://api.sms.net.bd/sendsms?api_key=Qi5AYc3ln98s422LNXhFo62RWOReTqG3eDulVr00&msg=${message}&to=${number}");
        } catch (\Throwable $th) {
            Log::error($th);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Scheduler Added Successfully',
            'data' => $patientData

        ]);
    }

    public function update_shedule_data(Request $request, $id)
    {
        //        return $request->all();
        $reschedule = false;
        $patientData = MhpAppointmentScheduler::find($id);
        if ($patientData->StartTime != date('Y-m-d H:i:s', strtotime($request->StartTime))) {
            $reschedule = true;
        }
        $patientData->patient_name = $request->patient_name;
        $patientData->patient_id = $request->patientID;
        $patientData->doctors_id = $request->doctors_id;
        $patientData->patient_mobile = $request->patient_mobile;
        $patientData->notes = $request->notes;
        $patientData->StartTime = date('Y-m-d H:i:s', strtotime($request->StartTime));
        $patientData->EndTime = date('Y-m-d H:i:s', strtotime($request->EndTime));
        $patientData->Subject = $request->Subject;
        $patientData->status_color = $request->CategoryColor;
        $patientData->status_name = $request->statusName;
        $patientData->reschedule_time =  date('Y-m-d H:i:s', strtotime($request->StartTime));
        $doctorName = $request->doctor_name;
        $patientData->update();
        if ($reschedule) {
            $startTime = Carbon::parse($request->StartTime);
            $formattedDate = $startTime->format('d-m-Y');
            $formattedTime = $startTime->format('h:i A');

            // Generate the SMS message
            $message = "Dear Patient, Your appointment is rescheduled to Dr. {$doctorName} on {$formattedDate} at {$formattedTime}. Thanks.";
            $number = $patientData->patient_mobile;
            try {
                // $response = Http::post(env('SAAS_URL') . '/auth/sms/send-sms', $data);
                Http::post("https://api.sms.net.bd/sendsms?api_key=Qi5AYc3ln98s422LNXhFo62RWOReTqG3eDulVr00&msg=${message}&to=${number}");
            } catch (\Throwable $th) {
                Log::error($th);
            }
        }
        return response()->json([
            'status' => 200,
            'message' => 'Scheduler Update Successfully',
            'updatedData' => $patientData,
            'sms' => $request->doctor_name

        ]);
    }

    public function delete_shedule_data($id)
    {
        //        return $request->all();

        $patientData = MhpAppointmentScheduler::find($id);
        $patientData->delete_status = 1;
        $patientData->save();

        return response()->json([
            'status' => 200,
            'message' => 'Scheduler Soft Delete Successfully',
            'updatedData' => $patientData

        ]);
    }




    public function scheduler()
    {
        $schedule = MhpAppointmentScheduler::where('delete_status', 0)->get();

        return response()->json([
            'scheduleData' => $schedule
        ]);
    }
    public function scheduler_by_doctor($docId)
    {
        $schedule = MhpAppointmentScheduler::where('doctors_id', $docId)->where('delete_status', 0)->get();
        return response()->json([
            'scheduleData' => $schedule
        ]);
    }

    public function GDPatientAppointmentToday($docId)
    {
        $result = MhpAppointmentScheduler::where('patient_id', '!=', 'null')
            ->where('status_name', '!=', 'null')
            ->Where('status_name', '!=', 'notattend')
            ->where('status_name', '!=', 'Unavilable')
            ->where('app_type', '!=', 'IPD')
            ->where('doctors_id', $docId)
            ->with('patientAppionment')
            ->where('appointment_completed', 0)
            ->where('delete_status', 0)
            ->where('StartTime', 'LIKE', '%' . date("Y-m-d") . '%')
            ->with('patients')
            ->with('doctors')
            ->orderBy('StartTime', 'ASC')
            ->get();


        return response()->json([
            'status' => 200,
            'message' => 'Todays Appointments',
            'GDPatientAppointmentToday' => $result

        ]);
    }
    public function GDPatientAppointmentTodayTelehealth($docId)
    {
        $result = MhpAppointmentScheduler::where('patient_id', '!=', 'null')
            ->where('status_name', '!=', 'null')
            ->Where('status_name', '!=', 'notattend')
            ->where('status_name', '!=', 'Unavilable')
            ->where('doctors_id', $docId)
            ->with('patientAppionment')
            ->where('appointment_completed', 0)
            ->where('delete_status', 0)
            ->where('StartTime', 'LIKE', '%' . date("Y-m-d") . '%')
            ->where('app_type', 'Telehealth')
            ->with('patients')
            ->with('onlineApp')
            ->with('doctors')
            ->orderBy('StartTime', 'ASC')
            ->get();


        return response()->json([
            'status' => 200,
            'message' => 'Todays Appointments',
            'GDPatientAppointmentToday' => $result

        ]);
    }

    public function patientAppointmentToday($patientId)
    {
        $result = MhpAppointmentScheduler::where('doctors_id', '!=', 'null')
            ->where('status_name', '!=', 'null')
            ->Where('status_name', '!=', 'notattend')
            ->where('status_name', '!=', 'Unavilable')
            ->where('patient_id', $patientId)
            ->with('patientAppionment')
            ->with('doctors')
            ->where('delete_status', 0)
            ->where('StartTime', 'LIKE', '%' . date("Y-m-d") . '%')
            ->orderBy('StartTime', 'ASC')
            ->get();

        return response()->json([
            'status' => 200,
            'message' => 'Todays Appointments',
            'GDPatientAppointmentToday' => $result

        ]);
    }

    public function GDPatientAppointmentUpcommig($id)
    {

        // $todaysDate = date("Y-m-d");
        // $upto1days = date('Y-m-d', strtotime($todaysDate . ' + 24 hours'));
        // $upto2days = date('Y-m-d', strtotime($todaysDate . ' + 2 days'));
        // $upto3days = date('Y-m-d', strtotime($todaysDate . ' + 3 days'));
        // $result = MhpAppointmentScheduler::where('doctors_id', $id)
        //     ->where('delete_status', 0)
        //     ->where('StartTime', 'LIKE', '%' . $upto1days . '%')
        //     ->orwhere('StartTime', 'LIKE', '%' . $upto2days . '%')
        //     ->orwhere('StartTime', 'LIKE', '%' . $upto3days . '%')
        //     ->with('patientAppionment')
        //     ->with('doctors')
        //     ->orderBy('StartTime', 'ASC')
        //     ->get();

        $todaysDate = date("Y-m-d");
        $tommrrow = date('Y-m-d', strtotime($todaysDate . ' + 1 days'));
        $upto4days = date('Y-m-d', strtotime($todaysDate . ' + 5 days'));

        $result = MhpAppointmentScheduler::where('doctors_id', $id)
            ->whereBetween('StartTime', [$tommrrow, $upto4days])
            ->with('patientAppionment')
            ->with('doctors')
            ->orderBy('StartTime', 'ASC')
            ->where('delete_status', 0)
            ->get();

        return response()->json([
            'status' => 200,
            'message' => 'Upcoming Appointments',
            'upcomingAppointments' => $result

        ]);
    }


    public function PatientAppointmentUpcoming($patientId, $branchId = 'null')
    {

        $todaysDate = date("Y-m-d");

        $upto1days = date('Y-m-d', strtotime($todaysDate . ' + 24 hours'));

        $data = MhpAppointmentScheduler::where('patient_id', $patientId)
            ->where('StartTime', '>', $upto1days)
            ->where('delete_status', 0)
            ->with('patientAppionment')
            ->with('doctors')
            ->orderBy('StartTime', 'ASC');


        if ($branchId !== 'null') {
            $data->where('saas_branch_id', $branchId);
        }
        $results = $data->get();

        return response()->json([
            'status' => 200,
            'message' => 'Upcoming Appointments',
            'upcomingAppointments' => $results

        ]);
    }


    //billing functions start

    public function billingPatient(Request $request)
    {
        $checkNow = now()->format('Y-m-d');
        $checkUpdate = now()->subDay()->format('Y-m-d');

        $branchData = getBranchData($request->header());

        $query = MhpAppointmentScheduler::query();

        if ($branchData['super_admin'] == false) {
            $query->where('saas_branch_id', $branchData['branch_id']);
        }

        $billingPatients = $query->with('patientAppionment')
            ->whereDate('StartTime', $checkNow)
            ->where('delete_status', 0)
            ->get();

        return response()->json([
            'status' => 200,
            'billingPatients' =>  $billingPatients
        ]);
    }
    public function  billingPatientSearch($id)
    {
        $billing_patientDetails = MhpPatient::find($id);
        return response()->json([
            'status' => 200,
            'billing_patientDetails' => $billing_patientDetails
        ]);
    }



    public function upcomingDrAppointment($id)
    {

        $checkNow = date("Y-m-d");
        // $checkUpdate=(date('Y-m-d', strtotime('-1 day', strtotime($checkNow))));

        $result = MhpAppointmentScheduler::where('StartTime', '>', $checkNow)->where('doctors_id', $id)->count();

        return response()->json([
            'status' => 200,
            'totalUpcomingAppointment' => $result

        ]);
    }

    public function updateSheduleData(Request $request)
    {
        $dateString = $request->rescheduleAppDate . ' ' . $request->rescheduleTime;

        $validator = Validator::make(['date' => $dateString], [
            'date' => 'required|date_format:Y-m-d g:i a',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid date format!'

            ], 501);
        }
        $dateTime = DateTime::createFromFormat('Y-m-d g:i a', $dateString);
        $time24h = $dateTime->format('Y-m-d H:i:s');
        $forMessagedate = $dateTime->format('d-m-Y');
        $forMessagetime = $dateTime->format('g:i a');

        $patientData = MhpAppointmentScheduler::where('id', $request->rescheduleId)->first();
        $patientData->StartTime = date('Y-m-d H:i:s', strtotime($time24h));
        $patientData->reschedule_time = date('Y-m-d H:i:s', strtotime($time24h));
        $patientData->EndTime = date('Y-m-d H:i:s', strtotime($time24h . ' + 10 minutes'));
        $patientData->save();

        $patient = OnlineAppointmentBooking::find($request->appID);
        $patient->date = $request->rescheduleAppDate;
        $patient->save();
        $doctor = MhpDoctorsMaster::find($patient->doctor_id);
        $message = $patient->appointment_type == "Telehealth" ? "Dear Patient,Your appointment is rescheduled to Dr. $doctor->fullName on $forMessagedate at $forMessagetime . Please login the App at least 10 minutes before the appointment time." : "Dear Patient,Your appointment is rescheduled to Dr. $doctor->fullName on $forMessagedate at $forMessagetime .";
        $url = "https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php";
        $url .= "?masking=NOMASK&userName=fauziaali2000@gmail.com&password=80f50e35f83130f022e78a2862aab390";
        $url .= "&MsgType=TEXT&receiver=" . $patientData->patient_mobile . "&message=" . urlencode($message);

        try {
            Http::get($url);
        } catch (\Exception $e) {
            Log::error('Error during HTTP request(SMS): ' . $e->getMessage());
        }

        return response()->json([
            'status' => 200,
            'message' => 'Scheduler Updated Successfully',
            'saveData' => $patientData

        ]);
    }

    public function doctorTotalPatients($id)
    {


        $totalPatients = MhpAppointmentScheduler::where('doctors_id', $id)->where('delete_status', 0)->distinct('patient_id')->count('patient_id');
        return response()->json([
            'status' => 200,
            'totalPatients' => $totalPatients

        ]);
    }




    ///////////////////////////////mobile api///////////////////////////////


    //appointment api doctor site
    public function todaysDoctorAppointment($id)
    {
        $checkNow = date("Y-m-d");
        $checkUpdate = (date('Y-m-d', strtotime('-1 day', strtotime($checkNow))));


        $result = DB::table('mhp_appointment_schedulers')->leftJoin('mhp_doctors_masters', 'mhp_doctors_masters.id', '=', 'mhp_appointment_schedulers.doctors_id')->leftJoin('doc_specialists', 'mhp_doctors_masters.specialists_id', '=', 'doc_specialists.id')->leftJoin('mhp_patients', 'mhp_patients.id', '=', 'mhp_appointment_schedulers.patient_id')->leftJoin('mhp_media_type_onlines', 'mhp_media_type_onlines.id', '=', 'mhp_appointment_schedulers.mediaType_online')->where('mhp_appointment_schedulers.StartTime', 'LIKE', '%' . $checkUpdate . '%')->where('mhp_appointment_schedulers.doctors_id', $id)->where('mhp_appointment_schedulers.delete_status', 0)->select('mhp_appointment_schedulers.*', 'mhp_doctors_masters.*', 'mhp_patients.*', 'mhp_media_type_onlines.name as media_typeOnline_name', 'mhp_media_type_onlines.media_link as media_link')->get();


        $totalTodaysAppointment = MhpAppointmentScheduler::where('StartTime', 'LIKE', '%' . $checkUpdate . '%')->where('doctors_id', $id)->where('mhp_appointment_schedulers.delete_status', 0)->count();


        return response()->json([
            'status' => 200,
            'message' => 'Todays Doctor Appointments',
            'todaysDoctorAppointments' => $result,
            'totalTodaysAppointment' => $totalTodaysAppointment,

        ]);
    }

    public function upcomingDoctorAppointment($id, $date = null)
    {

        if ($date) {
            $result = MhpAppointmentScheduler::where('doctors_id', $id)
                ->where('appointment_completed', 0)
                ->where('delete_status', 0)
                ->where('StartTime', 'LIKE', '%' . $date . '%')
                ->where('app_type', 'Telehealth')
                ->with('patients')
                ->with('doctors')
                ->with('onlineApp')
                ->orderBy('StartTime', 'ASC')
                ->get();

            // $result = DB::table('mhp_appointment_schedulers')->leftJoin('mhp_doctors_masters', 'mhp_doctors_masters.id', '=', 'mhp_appointment_schedulers.doctors_id')->leftJoin('doc_specialists', 'mhp_doctors_masters.specialists_id', '=', 'doc_specialists.id')->leftJoin('mhp_patients', 'mhp_patients.id', '=', 'mhp_appointment_schedulers.patient_id')->leftJoin('mhp_media_type_onlines', 'mhp_media_type_onlines.id', '=', 'mhp_appointment_schedulers.mediaType_online')
            // ->leftJoin('mhp_birth_sexes','mhp_patients.patient_birth_sex_id','=','mhp_birth_sexes.id')
            // ->where('mhp_appointment_schedulers.StartTime', 'LIKE', '%' . $date . '%')
            // ->where('mhp_appointment_schedulers.appointment_completed', 0)
            // ->where('mhp_appointment_schedulers.delete_status', 0)
            // ->leftJoin('ptn_blood_groups','mhp_patients.ptn_blood_group_id','=','ptn_blood_groups.id')->leftJoin('mhp_titles','mhp_doctors_masters.title','=','mhp_titles.id')->where('mhp_appointment_schedulers.doctors_id', $id)->where('mhp_appointment_schedulers.delete_status', 0)->select('mhp_appointment_schedulers.*', 'mhp_doctors_masters.*', 'mhp_patients.*','mhp_media_type_onlines.name as media_typeOnline_name','mhp_birth_sexes.*','ptn_blood_groups.*','mhp_titles.*')->get();



            return response()->json([
                'status' => 200,
                'message' => 'Upcoming Doctor Appointments',
                'upcomingDoctorAppointments' => $result

            ]);
        } else {
            $todaysDate = date("Y-m-d H:i:s");
            $result = MhpAppointmentScheduler::where('doctors_id', $id)
                ->where('appointment_completed', 0)
                ->where('delete_status', 0)
                ->where('StartTime', '>', $todaysDate)
                ->where('app_type', 'Telehealth')
                ->with('patients')
                ->with('doctors')
                ->with('onlineApp')
                ->orderBy('StartTime', 'ASC')
                ->get();

            // $result = DB::table('mhp_appointment_schedulers')->leftJoin('mhp_doctors_masters', 'mhp_doctors_masters.id', '=', 'mhp_appointment_schedulers.doctors_id')->leftJoin('doc_specialists', 'mhp_doctors_masters.specialists_id', '=', 'doc_specialists.id')->leftJoin('mhp_patients', 'mhp_patients.id', '=', 'mhp_appointment_schedulers.patient_id')->leftJoin('mhp_media_type_onlines', 'mhp_media_type_onlines.id', '=', 'mhp_appointment_schedulers.mediaType_online')
            // ->leftJoin('mhp_birth_sexes','mhp_patients.patient_birth_sex_id','=','mhp_birth_sexes.id')
            // ->where('mhp_appointment_schedulers.StartTime', 'LIKE', '%' . $date . '%')
            // ->where('mhp_appointment_schedulers.appointment_completed', 0)
            // ->where('mhp_appointment_schedulers.delete_status', 0)
            // ->leftJoin('ptn_blood_groups','mhp_patients.ptn_blood_group_id','=','ptn_blood_groups.id')->leftJoin('mhp_titles','mhp_doctors_masters.title','=','mhp_titles.id')->where('mhp_appointment_schedulers.doctors_id', $id)->where('mhp_appointment_schedulers.delete_status', 0)->select('mhp_appointment_schedulers.*', 'mhp_doctors_masters.*', 'mhp_patients.*','mhp_media_type_onlines.name as media_typeOnline_name','mhp_birth_sexes.*','ptn_blood_groups.*','mhp_titles.*')->get();



            return response()->json([
                'status' => 200,
                'message' => 'Upcoming Doctor Appointments',
                'upcomingDoctorAppointments' => $result

            ]);
        }
    }



    public function alldoctorList()
    {
        $allDoctors = DB::table('mhp_doctors_masters')->where('delete_status', 0)->get();

        return response()->json(['status' => 200, 'allDoctors' => $allDoctors]);
    }


    //appointment api patient site
    public function completedPatientAppointment($id)
    {
        $checkNow = date("Y-m-d");
        $checkUpdate = (date('Y-m-d', strtotime('-1 day', strtotime($checkNow))));


        $result = DB::table('mhp_appointment_schedulers')->leftJoin('mhp_doctors_masters', 'mhp_doctors_masters.id', '=', 'mhp_appointment_schedulers.doctors_id')->leftJoin('doc_specialists', 'mhp_doctors_masters.specialists_id', '=', 'doc_specialists.id')->leftJoin('mhp_patients', 'mhp_patients.id', '=', 'mhp_appointment_schedulers.patient_id')->leftJoin('mhp_media_type_onlines', 'mhp_media_type_onlines.id', '=', 'mhp_appointment_schedulers.mediaType_online')->where('mhp_appointment_schedulers.StartTime', '<', $checkUpdate)->where('mhp_appointment_schedulers.patient_id', $id)->where('mhp_appointment_schedulers.delete_status', 0)->select('mhp_appointment_schedulers.*', 'mhp_doctors_masters.*', 'mhp_patients.*', 'mhp_media_type_onlines.name as media_typeOnline_name')->get();


        $totalCompletedLists = MhpAppointmentScheduler::where('patient_id', $id)->where('StartTime', '<', $checkUpdate)->where('delete_status', 0)->count();

        return response()->json([
            'status' => 200,
            'message' => 'Completed Patient Appointments',
            'completedPatientAppointments' => $result,
            'totalCompletedLists' => $totalCompletedLists

        ]);
    }

    public function upcomingPatientAppointment($id)
    {

        $checkNow = date("Y-m-d");
        // $checkUpdate=(date('Y-m-d', strtotime('-1 day', strtotime($checkNow))));
        $todaysDate = date("Y-m-d");

        $upto1days = date('Y-m-d', strtotime($todaysDate . ' + 24 hours'));

        $upto2days = date('Y-m-d', strtotime($todaysDate . ' + 2 days'));
        $upto3days = date('Y-m-d', strtotime($todaysDate . ' + 3 days'));

        $result = DB::table('mhp_appointment_schedulers')->leftJoin('mhp_doctors_masters', 'mhp_doctors_masters.id', '=', 'mhp_appointment_schedulers.doctors_id')->leftJoin('doc_specialists', 'mhp_doctors_masters.specialists_id', '=', 'doc_specialists.id')->leftJoin('mhp_patients', 'mhp_patients.id', '=', 'mhp_appointment_schedulers.patient_id')->leftJoin('mhp_media_type_onlines', 'mhp_media_type_onlines.id', '=', 'mhp_appointment_schedulers.mediaType_online')
            ->where('mhp_appointment_schedulers.StartTime', 'LIKE', '%' . $upto1days . '%')
            ->orwhere('mhp_appointment_schedulers.StartTime', 'LIKE', '%' . $upto2days . '%')
            ->orwhere('mhp_appointment_schedulers.StartTime', 'LIKE', '%' . $upto3days . '%')
            ->where('mhp_appointment_schedulers.patient_id', $id)->where('mhp_appointment_schedulers.delete_status', 0)->select('mhp_appointment_schedulers.*', 'mhp_doctors_masters.*', 'mhp_patients.*', 'mhp_media_type_onlines.name as media_typeOnline_name')->get();

        $totalUpcomingLists = MhpAppointmentScheduler::where('patient_id', $id)->where('StartTime', '>', $checkNow)->where('delete_status', 0)->count();
        return response()->json([
            'status' => 200,
            'message' => 'Upcoming PatientAppointments',
            'upcomingPatientAppointments' => $result,
            'totalUpcomingLists' => $totalUpcomingLists

        ]);
    }


    public function todaysPatientAppointment($id, $branchId = 'null')
    {
        $checkNow = date("Y-m-d");
        $checkUpdate = (date('Y-m-d'));


        // $data = DB::table('mhp_appointment_schedulers')
        //     ->leftJoin('mhp_doctors_masters', 'mhp_doctors_masters.id', '=', 'mhp_appointment_schedulers.doctors_id')
        //     ->leftJoin('doc_specialists', 'mhp_doctors_masters.specialists_id', '=', 'doc_specialists.id')
        //     ->leftJoin('mhp_patients', 'mhp_patients.id', '=', 'mhp_appointment_schedulers.patient_id')
        //     ->leftJoin('mhp_media_type_onlines', 'mhp_media_type_onlines.id', '=', 'mhp_appointment_schedulers.mediaType_online')
        //     ->leftJoin('mhp_titles', 'mhp_doctors_masters.title', '=', 'mhp_titles.id')
        //     ->where('mhp_appointment_schedulers.StartTime', 'LIKE', '%' . $checkUpdate . '%')
        //     ->where('mhp_appointment_schedulers.patient_id', $id)
        //     ->where('mhp_appointment_schedulers.appointment_completed', 0)
        //     ->where('mhp_appointment_schedulers.delete_status', 0)->select('mhp_appointment_schedulers.*', 'mhp_doctors_masters.*', 'mhp_patients.*', 'mhp_media_type_onlines.name as media_typeOnline_name', 'mhp_titles.*');

        $data =  MhpAppointmentScheduler::where('patient_id', $id)
            ->with('patientAppionment')
            ->where('appointment_completed', 0)
            ->where('delete_status', 0)
            ->where('StartTime', 'LIKE', '%' . date("Y-m-d") . '%')
            ->with('patients')
            ->with('doctors')
            ->orderBy('StartTime', 'ASC');

        if ($branchId !== 'null') {
            $data->where('saas_branch_id', $branchId);
        }
        $results = $data->get();

        return response()->json([
            'status' => 200,
            'message' => 'Todays Patient Appointments',
            'todaysPatientAppointments' => $results

        ]);
    }

    public function cancelPatientAppointmentReason(Request $request, $pId, $dId)
    {

        $notes = $request->notes;
        $result = MhpAppointmentScheduler::where('patient_id', $pId)->where('doctors_id', $dId)->update(array('notes' =>  $notes, 'delete_status' => 1));

        return response()->json([
            'status' => 200,
            'message' => 'Cancel Patients Appointment Reasons Updated',
            'result' => $result,

        ]);
    }

    public function cancelPatientAppointment($id)
    {

        $result = DB::table('mhp_appointment_schedulers')
            ->leftJoin('mhp_doctors_masters', 'mhp_doctors_masters.id', '=', 'mhp_appointment_schedulers.doctors_id')
            ->leftJoin('doc_specialists', 'mhp_doctors_masters.specialists_id', '=', 'doc_specialists.id')
            ->leftJoin('mhp_patients', 'mhp_patients.id', '=', 'mhp_appointment_schedulers.patient_id')
            ->leftJoin('mhp_media_type_onlines', 'mhp_media_type_onlines.id', '=', 'mhp_appointment_schedulers.mediaType_online')
            ->where('mhp_appointment_schedulers.patient_id', $id)
            ->where('mhp_appointment_schedulers.delete_status', 1)->select('mhp_appointment_schedulers.*', 'mhp_doctors_masters.*', 'mhp_patients.*', 'mhp_media_type_onlines.name as media_typeOnline_name')->paginate(1);



        return response()->json([
            'status' => 200,
            'message' => 'Cancel Patients Appointments',
            'cancelPatientAppointments' => $result

        ]);
    }

    public function patientAppointmentBook(Request $request)
    {

        // return $request->all();
        $patientData = new MhpAppointmentScheduler();
        $patientData->patient_name = $request->patient_name;
        $patientData->doctors_id = $request->doctors_id;
        $patientData->patient_id = $request->patient_id;
        $patientData->patient_mobile = $request->patient_mobile;
        $patientData->notes = $request->notes;
        $patientData->StartTime = $request->StartTime;
        $patientData->EndTime = $request->EndTime;
        $patientData->Subject = $request->Subject;
        $patientData->status_color = $request->statusColor;
        $patientData->mediaType_online = $request->mediaType_online;
        $patientData->media = $request->media;
        $patientData->save();
        return response()->json([
            'status' => 200,
            'message' => 'Patient Appointment book Added Successfully',


        ]);
    }

    public function reschedulePatientAppointmentBook(Request $request, $patientId)
    {

        MhpAppointmentScheduler::where('patient_id', $patientId)
            ->update([
                'patient_name' => $request->patient_name,
                'doctors_id' => $request->doctors_id,
                'patient_id' => $request->patient_id,
                'patient_mobile' => $request->patient_mobile,
                'notes' => $request->notes,
                'StartTime' => $request->StartTime,
                'reschedule_time' => $request->StartTime,
                'EndTime' => $request->EndTime,
                'Subject' => $request->Subject,
                'status_color' => $request->statusColor,
                'mediaType_online' => $request->mediaType_online,
                'media' => $request->media,
            ]);

        return response()->json([
            'status' => 200,
            'message' => 'Patient Appointment book Rescheduled Successfully',


        ]);
    }


    public function queue_number($docId, $appoitmentId)
    {
        $result = MhpAppointmentScheduler::where('patient_id', '!=', 'null')
            ->where('status_name', '!=', 'null')
            ->Where('status_name', '!=', 'notattend')
            ->where('status_name', '!=', 'Unavilable')
            ->where('doctors_id', $docId)
            ->where('appointment_completed', 0)
            ->where('delete_status', 0)
            ->where('StartTime', 'LIKE', '%' . date("Y-m-d") . '%')
            ->where('app_type', 'Telehealth')
            ->orderBy('StartTime', 'ASC')
            ->get()->toArray();
        $index = $this->findIndexByName($result, $appoitmentId);

        if ($index !== -1) {
            return ApiResponse::success($index);
        } else {
            return ApiResponse::success("Not found");
        }
    }
    function findIndexByName($array, $appoitmentId)
    {

        foreach ($array as $index => $data) {
            if ($data['id'] == $appoitmentId) {

                return $index;
            }
        }
        return -1; // Return -1 if name is not found
    }
    public function allApointmentList($id)
    {
        $todaysDate = date("Y-m-d");

        $checkUpdate = (date('Y-m-d', strtotime('-1 day', strtotime($todaysDate))));

        // $doctorInfo=DB::table('mhp_doctors_masters')->leftJoin('users','users.user_id','=','mhp_doctors_masters.id')->leftJoin('doc_specialists','doc_specialists.id','=','mhp_doctors_masters.specialists_id')->where('mhp_doctors_masters.delete_status',0)->where('mhp_doctors_masters.id',$id)->first();

        $doctorInfo = DB::table('mhp_doctors_masters')->leftJoin('doc_specialists', 'doc_specialists.id', '=', 'mhp_doctors_masters.specialists_id')->where('mhp_doctors_masters.delete_status', 0)->where('mhp_doctors_masters.id', $id)->first();




        //table data all appointment todays patients list
        $allAppointment = DB::table('mhp_appointment_schedulers')
            ->leftJoin('mhp_patients', 'mhp_patients.id', '=', 'mhp_appointment_schedulers.patient_id')
            ->leftJoin('mhp_usual_providers', 'mhp_usual_providers.id', '=', 'mhp_patients.patient_usual_provider_id')
            ->leftJoin('mhp_birth_sexes', 'mhp_birth_sexes.id', '=', 'mhp_patients.patient_birth_sex_id')
            ->leftJoin('mhp_statuses', 'mhp_statuses.id', '=', 'mhp_patients.patient_status')
            ->where('mhp_appointment_schedulers.doctors_id', $id)
            ->select('mhp_appointment_schedulers.*', 'mhp_patients.patient_hn_number', 'mhp_patients.patient_usual_provider_id', 'mhp_patients.patient_images', 'mhp_usual_providers.usual_provider_name', 'mhp_birth_sexes.birth_sex_name')
            ->where('mhp_appointment_schedulers.StartTime', 'LIKE', '%' . $checkUpdate . '%')
            ->where('mhp_appointment_schedulers.delete_status', 0)->get();

        return response()->json(['status' => 200, 'allAppointment' => $allAppointment, 'doctorInfo' => $doctorInfo]);
    }


    public function allAppointListDoctor()
    {
        // $allAppointmentDoctors=DB::table('mhp_doctors_masters')->leftJoin('users','users.user_id','=','mhp_doctors_masters.id')->where('mhp_doctors_masters.delete_status' ,0)->get();


        $allAppointmentDoctors = DB::table('mhp_doctors_masters')->where('mhp_doctors_masters.delete_status', 0)->get();




        return response()->json(['status' => 200, 'allAppointmentDoctors' => $allAppointmentDoctors]);
    }
    public function startConsultaion($id)
    {
        $result = MhpAppointmentScheduler::find($id);
        $result->consultaion_start = now();
        $result->save();

        return response()->json([
            'status' => 200,
            'message' => 'Start Consultation Successfully',
        ]);
    }
    public function endConsultaion($id)
    {
        $result = MhpAppointmentScheduler::find($id);
        $result->consultation_end_time = now();
        $result->save();

        return response()->json([
            'status' => 200,
            'message' => 'End Consultation Successfully',
        ]);
    }
}
