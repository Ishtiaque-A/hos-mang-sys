<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DoctorPayment;
use App\Models\MhpAppointmentScheduler;
use App\Models\MhpDoctorsMaster;
use PhpParser\Node\Expr\FuncCall;
use Illuminate\Support\Facades\DB;
use App\Models\OnlineAppointmentBooking;
use Carbon\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Client;

class OnlineAppointmentBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {}
    public function patient_symtoms($patient_hn_number)
    {
        return OnlineAppointmentBooking::where('patient_hn_number', $patient_hn_number)->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $inovice_number = OnlineAppointmentBooking::get()->count();

        $validator = Validator::make($request->all(), [
            'patient_hn_number' => 'required',
            'doctor_id' => 'required',
            'date' => 'required',
            'appointment_type' => 'required',
            // 'disease' => 'required',
            'payment_type' => 'required',
            'amount' => 'required',
            // 'transaction_no' => 'required | unique:online_appointment_bookings,transaction_no',
            'registration_phone_no' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $data = new OnlineAppointmentBooking();
        $data->inovice_number = $inovice_number + 1230000001;
        $data->saas_branch_id = isset($request->saas_branch_id) ? $request->saas_branch_id : null;
        $data->patient_hn_number = $request->patient_hn_number;
        $data->doctor_id = $request->doctor_id;
        $data->date =  $request->date;
        $data->time = $request->time;
        $data->appointment_type = $request->appointment_type;
        $data->calling_type = $request->calling_type;
        $data->chamber_id = $request->chamber_id;
        $data->disease = $request->disease;
        $data->payment_type = $request->payment_type;
        $data->amount = $request->amount;
        $data->transaction_no = $request->transaction_no;
        $data->transaction_phone_number = $request->transaction_phone_number;
        $data->referred_name = $request->referred_name;
        $data->shift = $request->shift;
        $data->save();

        $message = "Please wait for doctor’s confirmation. In case you have not received confirmation SMS within 6 hours. Please call doctor's contact number";
        // $url = "https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php";
        // $url .= "?masking=NOMASK&userName=fauziaali2000@gmail.com&password=80f50e35f83130f022e78a2862aab390";
        // $url .= "&MsgType=TEXT&receiver=" . $request->registration_phone_no . "&message=" . urlencode($message);
        $phone = $request->registration_phone_no;
        try {
            $countryCode = substr($phone, 0, 4);
            if ($countryCode == '+880') {

                Http::post("https://api.sms.net.bd/sendsms?api_key=Qi5AYc3ln98s422LNXhFo62RWOReTqG3eDulVr00&msg=${message}&to=${$phone}");
            } else {
                $client = new Client();

                $client->post('https://vvxw9r.api.infobip.com/sms/2/text/advanced', [
                    'headers' => [
                        'Authorization' => 'App 39e73aff5379c5e5aef2c6077b613234-063d919f-9426-4c94-abc4-ab083747787d',
                        'Content-Type' => 'application/json',
                        'Accept' => 'application/json',
                    ],
                    'json' => [
                        'messages' => [
                            [
                                'destinations' => [
                                    ['to' => $phone],
                                ],
                                'from' => '61485889521',
                                'text' => $message,
                            ],
                        ],
                    ],
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error during HTTP request(SMS): ' . $e->getMessage());
        }

        return $data;
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OnlineAppointmentBooking  $onlineAppointmentBooking
     * @return \Illuminate\Http\Response
     */

    public function payment_details($patient_hn_number)
    {
        return DoctorPayment::with('doctor', 'patientWithOnlineAppointment')->where('patient_hn_number', $patient_hn_number)->latest()->get();
    }

    public function patients_payment_details($patient_hn_number)
    {
        return OnlineAppointmentBooking::where('patient_hn_number', $patient_hn_number)->with('doctors')->latest()->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\OnlineAppointmentBooking  $onlineAppointmentBooking
     * @return \Illuminate\Http\Response
     */
    public function edit(OnlineAppointmentBooking $onlineAppointmentBooking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OnlineAppointmentBooking  $onlineAppointmentBooking
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OnlineAppointmentBooking $onlineAppointmentBooking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OnlineAppointmentBooking  $onlineAppointmentBooking
     * @return \Illuminate\Http\Response
     */
    public function destroy(OnlineAppointmentBooking $onlineAppointmentBooking)
    {
        //
    }

    public function patientLists($id)
    {
        // return 1;
        $registerNumber = OnlineAppointmentBooking::with('patients', 'doctors', 'schedule')->where('doctor_id', $id)->where('payment_confirmation', 1)->orderBy('created_at', "DESC")->get();
        return $registerNumber;
    }

    public function paymentConfirmation($id)
    {
        $todaysDate = date("Y-m-d H:i");
        $patient = OnlineAppointmentBooking::where('id', $id)->first();
        if (!$patient) {
            return response()->json(['message', "Appointment not found"]);
        }
        $patient->payment_confirmation = 1;
        $patient->save();

        $payment = new DoctorPayment();
        $payment->doctor_id = $patient->doctor_id;
        $payment->patient_hn_number = $patient->patient_hn_number;
        $payment->payment_type = 'payment';
        $payment->amount = $patient->amount;
        $payment->date =  $todaysDate;
        $payment->save();
        return response()->json(['message', "Payment accepted", 'data' => $payment, 'patient' => $patient]);
    }

    public function refund($id)
    {
        $todaysDate = date("Y-m-d");
        $patient = OnlineAppointmentBooking::where('id', $id)->where('payment_confirmation', 1)->first();
        if (!$patient) {
            return response()->json(['message', "Appointment not found"]);
        }
        $payment = new DoctorPayment();
        $payment->doctor_id = $patient->doctor_id;
        $payment->patient_hn_number = $patient->patient_hn_number;
        $payment->payment_type = 'refund';
        $payment->amount = $patient->amount;
        $payment->date = $todaysDate;
        $payment->save();
        return response()->json(['message', "Payment accepted", 'data' => $payment, 'patient' => $patient]);
    }

    public function paymentRequest($id)
    {
        // Config::set('database.connections.mysql.database', env('DB_DATABASE'));
        // app('db')->purge();

        $patientRequest = OnlineAppointmentBooking::with('patients', 'doctors')
            ->where('doctor_id', $id)
            ->where('payment_confirmation', 0)
            ->where('appointment_type', 'Telehealth')
            ->latest()->get();
        foreach ($patientRequest as $request) {
            if ($request->patients && $request->patients->patient_dob) {
                // Clean the date string by removing the extra timezone part
                $cleaned_date = preg_replace('/\s*\(.*\)$/', '', $request->patients->patient_dob);

                // Parse and format the cleaned date
                $request->patients->patient_dob = Carbon::parse($cleaned_date)->format('Y-m-d');
            }
        }
        return response()->json(['data' => $patientRequest]);
    }

    public function paymentRequest_patient($patient_hn_number, $branchId = 'null')
    {
        $data = OnlineAppointmentBooking::with('doctors')->where('patient_hn_number', $patient_hn_number);

        if ($branchId !== 'null') {
            $data->where('saas_branch_id', $branchId);
        }
        $results = $data->latest()->get();

        return response()->json(['data' => $results]);
    }


    public function paymentAllList(Request $request, $id, $limit, $page)
    {
        // $limitPerPage = $request->input('per_page', 16);
        $limitPerPage = $limit;
        // $page = $request->input('page', 1);
        if ($request->userType == 'Employee' || $request->userType == 'Super_Admin') {
            $headers = $request->header();
            $branchData = getBranchData($headers);
            $doctors = MhpDoctorsMaster::where('saas_branch_id', $branchData['branch_id'])->pluck('id')->toArray();
            $data = OnlineAppointmentBooking::with('patients', 'doctors', 'schedule')
                ->when($request->userType == 'Employee', function ($query) use ($doctors) {
                    return $query->whereIn('doctor_id', $doctors);
                })
                ->latest()
                ->paginate($limitPerPage, ['*'], 'page', $page);
            return response()->json(['data' => $data, 'meta' => [
                'pagination' => [
                    'total' => $data->total(),
                    'per_page' => $data->perPage(),
                    'current_page' => $data->currentPage(),
                    'last_page' => $data->lastPage(),
                    'from' => $data->firstItem(),
                    'to' => $data->lastItem(),
                ],
            ],]);
        }


        $data = OnlineAppointmentBooking::with('patients', 'doctors', 'schedule')->where('doctor_id', $id)->latest()->paginate($limitPerPage, ['*'], 'page', $page);
        return response()->json(['data' => $data, 'meta' => [
            'pagination' => [
                'total' => $data->total(),
                'per_page' => $data->perPage(),
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'from' => $data->firstItem(),
                'to' => $data->lastItem(),
            ],
        ],]);
    }

    public function patientAppointment($id)
    {
        $onlineAppointmentBooking = OnlineAppointmentBooking::find($id);
        $onlineAppointmentBooking->is_confirmed = 1;
        $onlineAppointmentBooking->save();
        return response()->json([
            'success' => "Appointment Successfully Added"
        ]);
    }

    public function cancelPatientAppointment($id)
    {
        $onlineAppointmentBooking = OnlineAppointmentBooking::find($id);
        $onlineAppointmentBooking->is_confirmed = 0;
        $onlineAppointmentBooking->save();

        // return $onlineAppointmentBooking;

        $appointmentCancel = MhpAppointmentScheduler::where('doctors_id', $onlineAppointmentBooking->doctor_id)->where('patient_id', $onlineAppointmentBooking->patient_id)->where('StartTime', 'LIKE', '%' . $onlineAppointmentBooking->date . '%')->first();

        if (!$appointmentCancel) {
            return response()->json(['error' => "your appointment isn't booking"]);
        }

        $appointmentCancel->delete_status = 1;
        $appointmentCancel->save();
        return response()->json([
            'success' => "Appointment Successfully Cancel",
            'data' => $appointmentCancel,
        ]);
    }

    public function serachAllPatinet($id, $search)
    {
        $data = OnlineAppointmentBooking::with('patients', 'doctors')->whereHas('patients', function ($query) use ($search) {
            $query->where('patient_first_name', 'like', '%' . $search . '%')->orWhere('patient_hn_number', 'like', '%' . $search . '%');
        })->orWhere('transaction_phone_number', 'like', '%' . $search . '%')->get();
        return response()->json([
            'data' => $data,
        ]);
    }

    public function serachPatByDate($id, $formattedDate, $endFormattedDate)
    {
        $startTime = date('Y-m-d', strtotime($formattedDate));
        $startTime = date('Y-m-d', strtotime($endFormattedDate));
        $data = OnlineAppointmentBooking::with('patients', 'doctors')->where('date', '>=', $formattedDate)->where('date', '<=', $endFormattedDate)->get();
        return response()->json([
            'data' => $data,
        ]);
    }
}
