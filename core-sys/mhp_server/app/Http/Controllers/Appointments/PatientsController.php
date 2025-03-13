<?php

namespace App\Http\Controllers\Appointments;

use App\Models\MhpStatus;
use App\Models\MhpPatient;
use App\Models\MhpBirthSex;
use App\Models\MhpVitalSign;
use Illuminate\Http\Request;
use App\Models\DoctorPayment;
use App\Models\MhpOccupation;
use App\Models\MhpTobaccoType;
use App\Models\MhpDoctorsMaster;
use Illuminate\Support\Facades\DB;
use App\Models\MhpAdviceSuggestion;
use App\Http\Controllers\Controller;
use App\Models\MhpPatientsVitalSign;
use App\Models\MhpTobaccoCostAmount;
use App\Models\MhpOccupationalHazards;
use App\Models\MhpAppointmentScheduler;
use App\Models\MhpCurrentSmokingHistory;
use App\Models\MhpPastAlcoholConsumption;
use App\Models\MhpPatientRequest;
use Illuminate\Support\Facades\Validator;
use App\Models\MhpPatientsOccupationDetails;
use App\Models\MhpPatientsFamilySocialHistoryAlcohol;
use App\Models\MhpPatientsFamilySocialHistoryTobacco;
use App\Models\PatientOrganization;
use App\Models\User;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class PatientsController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_first_name' => 'required',
            'patient_mobile_phone' => 'required',
            'patient_birth_sex_id' => 'required',
            'patient_status' => 'required',
            'patient_dob' => 'required',
        ]);
        $branchData = getBranchData($request->header());
        $createUser = false;
        if ($request->createUser === "true") {
            Config::set('database.connections.mysql.database', 'mhpdemocom');
            app('db')->purge();
            $user =  User::where("email", $request->patient_mobile_phone)->where('user_type', 'Patient')->first();
            if ($user) {
                return response([
                    'message' => 'The mobile number is already registered!'
                ], 403);
            } else {
                $createUser = true;
            }
        }
        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {

            if ($files = $request->file('image')) {
                $names = $files->getClientOriginalName();
                $name = rand(111, 99999) . $names;
                $files->move('images/files/', $name);
            } else {
                $name = "";
            }

            // dynamic db set 
            $response = Http::withHeaders([
                'Authorization' => $request->header('Authorization'),
                'Content-Type' => 'application/json', // Set the appropriate content type for your request body
            ])->get(env('SAAS_URL') . '/auth/auth-check');

            if ($response['status'] === 'success') {
                $db = $response['data']['user']['organization']['db_name'];
                Config::set('database.connections.mysql.database', $db);
                app('db')->purge();

                $patients = new MhpPatient();

                $patient_hn = 'HN-100001';
                $client = new \GuzzleHttp\Client();
                $token = $request->header('Authorization');

                if ($request->patient_hn_number) {
                    $patient_hn = $request->patient_hn_number;
                } else {
                    $res = $client->request('GET', env('SAAS_URL') . '/get/patient/hn', [
                        'headers' => [
                            'Authorization' => $token,
                        ],
                    ]);
                    $data = json_decode($res->getBody()->getContents());
                    $patient_hn = $data->hn_number;
                }

                $patients->patient_hn_number = $patient_hn;
                $patients->patient_title_id = $request->patient_title_id;
                $patients->patient_first_name = $request->patient_first_name;
                $patients->patient_nid = $request->patient_nid;
                $patients->patient_bcid = $request->patient_bcid;
                $patients->ptn_blood_group_id = $request->ptn_blood_group_id;
                $patients->patient_last_name = $request->patient_last_name;
                $patients->patient_contact_via = $request->patient_contact_via;
                $patients->patient_mobile_phone = $request->patient_mobile_phone;
                $patients->patient_head_of_family = $request->patient_head_of_family;
                $patients->patient_emergency_contact = $request->patient_emergency_contact;
                $patients->patient_dob = $request->patient_dob;
                $patients->patient_email = $request->patient_email;
                $patients->patient_birth_sex_id = $request->patient_birth_sex_id;
                $patients->patient_individual_health_identifier_no = $request->patient_individual_health_identifier_no;
                $patients->patient_religion_id = $request->patient_religion_id;
                $patients->patient_usual_provider_id = $request->patient_usual_provider_id;
                $patients->patient_ethnicity_id = $request->patient_ethnicity_id;
                $patients->patient_parent_id = $request->patient_parent_id;
                $patients->patient_address1 = $request->patient_address1;
                $patients->patient_address2 = $request->patient_address2;
                $patients->patient_usual_visit_type_id = $request->patient_usual_visit_type_id;
                $patients->patient_usual_account = $request->patient_usual_account;
                $patients->patient_deceased_date = $request->patient_deceased_date;
                $patients->patient_next_of_kin = $request->patient_next_of_kin;
                $patients->patient_medical_record_no = $request->patient_medical_record_no;
                $patients->patient_city_id = $request->patient_city_id;
                $patients->patient_safety_net_no = $request->patient_safety_net_no;
                $patients->patient_postal_code = $request->patient_postal_code;
                $patients->patient_health_inc_fund = $request->patient_health_inc_fund;
                $patients->patient_health_inc_no = $request->patient_health_inc_no;
                $patients->patient_expire_date = $request->patient_expire_date;
                $patients->patient_medical_no = $request->patient_medical_no;
                $patients->patient_occupation_id = $request->patient_occupation_id;
                $patients->patient_hcc_no = $request->patient_hcc_no;
                $patients->patient_general_notes = $request->patient_general_notes;
                $patients->patient_appointment_notes = $request->patient_appointment_notes;

                $patients->patient_images = $name;

                $patients->patient_middle_name = $request->patient_middle_name;
                $patients->patient_preferred_name = $request->patient_preferred_name;
                $patients->patient_home_phone = $request->patient_home_phone;
                $patients->patient_work_phone = $request->patient_work_phone;
                $patients->patient_status = $request->patient_status;
                $patients->patient_state_id = $request->patient_state_id;
                $patients->patient_passport = $request->patient_passport;
                $patients->age = $request->age;
                $patients->day = $request->day;
                $patients->month = $request->month;

                if ($branchData['super_admin'] == false) {
                    $patients->saas_branch_id = $branchData['branch_id'];
                    $patients->saas_branch_name = $branchData['branch_name'];
                    $patients->doctor_id = $request->header('user-id');
                } else {
                    $patients->saas_branch_id = $request->saas_branch_id;
                    $patients->saas_branch_name = $request->saas_branch_name;
                }
                $patients->save();

                // $res = $client->request(
                //     'POST',
                //     env('SAAS_URL') . '/store/patient/hn',
                //     [
                //         'headers' => [
                //             'Authorization' => $token,
                //             "Accept" => "application/json",
                //         ],
                //         'form_params' => [
                //             'hn' => $patient_hn,
                //             'id' => $patients->id,
                //         ]
                //     ],
                // );
                $data = json_decode($res->getBody()->getContents());
                if (isset($branchData['B2C']) && $branchData['B2C']) {
                    $patient_request = new MhpPatientRequest();
                    $patient_request->patient_id = $patients->id;
                    $patient_request->doctors_master_id = $request->doctor_id;
                    $patient_request->status = 1;
                    $patient_request->save();
                }
            }

            if ($createUser == true) {
                Config::set('database.connections.mysql.database', 'mhpdemocom');
                app('db')->purge();
                $tokenPatent = Str::random(40);
                $fullName = $patients->patient_first_name;

                if (isset($patients->patient_middle_name)) {
                    $fullName .= ' ' . $patients->patient_middle_name;
                }

                if (isset($patients->patient_last_name)) {
                    $fullName .= ' ' . $patients->patient_last_name;
                }
                $user = new User();
                $user->name = $fullName;
                $user->email = $patients->patient_mobile_phone;
                $pass =  Str::startsWith($patients->patient_mobile_phone, ['+88', '+61'])
                    ? substr($patients->patient_mobile_phone, 3)
                    : $patients->patient_mobile_phone;
                $user->password = Hash::make($pass);
                $user->user_type = 'patient';
                $user->user_id = $patients->id;
                $user->remember_token = $tokenPatent;
                $user->patient_hn_number = $patient_hn;
                $user->db_name = 'mhpdemocom';
                $user->regFrom = 'greatDoc';
                $user->dob = $patients->patient_dob;
                $user->organization_id = $request->organization_id;
                $user->save();

                $phoneNumber = substr($patients->patient_mobile_phone, 3);
                $message = "Dear " . $patients->patient_first_name . ",Your Digi Patient account is created. Your mobile number is: " . $patients->patient_mobile_phone . " and Password is: " . $patients->patient_mobile_phone . " Thank you for registering with us. ";
                $sms = Http::post("https://api.sms.net.bd/sendsms?api_key=Qi5AYc3ln98s422LNXhFo62RWOReTqG3eDulVr00&msg=${message}&to=${phoneNumber}");
                $vsArray = [
                    (object)['name' => 'BLOOD SUGAR', 'value' => '10', 'desc' => 'BLOOD SUGAR', 'units_id' => 'mmol/L', 'icon' => '85492blood sugar=1.jpg'],
                    (object)['name' => 'BLOOD PRESSURE', 'value' => '120/80', 'desc' => 'BLOOD PRESSURE', 'units_id' => 'mm Hg', 'icon' => '66037Blood pressure-1.jpg'],
                    (object)['name' => 'BMI', 'value' => '18.5', 'desc' => 'BMI', 'units_id' => 'Kg/m2', 'icon' => '27013BMI body mass index-1.jpg'],
                    (object)['name' => 'HEIGHT', 'value' => '170', 'desc' => 'HEIGHT', 'units_id' => 'cm', 'icon' => '56529height-1.jpg'],
                    (object)['name' => 'HEAD CIRCUMSTANCES', 'value' => '70', 'desc' => 'HEAD CIRCUMSTANCES', 'units_id' => 'cm', 'icon' => '82832head circumstance-1.jpg'],
                    (object)['name' => 'OXYGEN SATUARATION', 'value' => '98', 'desc' => 'OXYGEN SATUARATION', 'units_id' => '%', 'icon' => '33006oxygen saturation-1.jpg'],
                    (object)['name' => 'WEIGHT', 'value' => '71', 'desc' => 'WEIGHT', 'units_id' => 'Kg', 'icon' => '9988weight-1.jpg'],
                    (object)['name' => 'TEMPERATURE', 'value' => '98', 'desc' => 'TEMPERATURE', 'units_id' => '°F', 'icon' => '72886Temperature-1.jpg'],
                    (object)['name' => 'WAIST CIRCUMSTANCES', 'value' => '100', 'desc' => 'WAIST CIRCUMSTANCES', 'units_id' => 'cm', 'icon' => '61346waist circumstances-1.jpg'],

                ];

                foreach ($vsArray as $item) {
                    $vitalSign = new MhpPatientsVitalSign();
                    $vitalSign->patient_id = $user->user_id;
                    $vitalSign->name = $item->name;
                    $vitalSign->value = $item->value;
                    $vitalSign->desc = $item->desc;
                    $vitalSign->last_check_up_date = Carbon::now();
                    $vitalSign->icon = $item->icon;
                    $vitalSign->units_id = $item->units_id;
                    $vitalSign->save();
                }

                $clinic = new PatientOrganization();
                $clinic->patient_id =  $patients->id;
                $clinic->organization_id = $request->organization_id;
                $clinic->save();
            }
            return response()->json([
                'status' => 200,
                'message' => 'Patients Added Successfully',
                'patients' => $patients,
                'data' => $data
            ]);
        }
    }

    public function patients_hn_number(Request $request)
    {
        $token = $request->header('Authorization');
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET', env('SAAS_URL') . '/get/patient/hn', [
            'headers' => [
                'Authorization' => $token,
            ],
        ]);
        $data = json_decode($res->getBody()->getContents());
        return response()->json([
            'status' => 200,
            'hn_number' => $data->hn_number,
        ]);
    }
    public function index(Request $request)
    {
        $branchData = getBranchData($request->header());
        $statuses = MhpStatus::where('delete_status', 0)->get();
        $genders = MhpBirthSex::where('delete_status', 0)->get();
        $query = MhpPatient::query();
        if ($branchData['super_admin'] == false) {
            if ($branchData['B2C']) {
                $req = MhpPatientRequest::where('doctors_master_id', $branchData['user_id'])->distinct()->pluck('patient_id');
                $query->whereIn('id', $req);
            } else {
                $query->where('saas_branch_id', $branchData['branch_id']);
            }
        }
        $query->with('title', 'patient_birth_sex', 'statuses', 'usual_provider', 'blood_group')->where('delete_status', 0);
        $patients = $query->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'patients' => $patients,
            'statuses' => $statuses,
            'genders' => $genders,
        ]);
    }

    public function patient_list_for_lab()
    {
        // $branchData = getBranchData($request->header());
        $statuses = MhpStatus::where('delete_status', 0)->get();
        $genders = MhpBirthSex::where('delete_status', 0)->get();
        $query = MhpPatient::query();
        // if ($branchData['super_admin'] == false) {
        //     if ($branchData['B2C']) {
        //         $req = MhpPatientRequest::where('doctors_master_id', $branchData['user_id'])->distinct()->pluck('patient_id');
        //         $query->whereIn('id', $req);
        //     } else {
        //         $query->where('saas_branch_id', $branchData['branch_id']);
        //     }
        // }
        $query->with('title', 'patient_birth_sex', 'statuses', 'usual_provider', 'blood_group')->where('delete_status', 0);
        $patients = $query->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'patients' => $patients,
            'statuses' => $statuses,
            'genders' => $genders,
        ]);
    }

    public function findPatientByDoctorId($id, Request $request)
    {
        $branchData = getBranchData($request->header());
        $statuses = MhpStatus::where('delete_status', 0)->get();
        $genders = MhpBirthSex::where('delete_status', 0)->get();
        $query  = MhpPatient::query();
        if ($branchData['super_admin'] == false) {
            if ($branchData['B2C']) {
                $query->where('doctor_id', $branchData['user_id']);
            } else {
                $query->where('saas_branch_id', $branchData['branch_id']);
            }
        }
        $patients = $query->with('title', 'patient_birth_sex', 'statuses', 'usual_provider', 'blood_group')->where('delete_status', 0)->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'patients' => $patients,
            'statuses' => $statuses,
            'genders' => $genders,

        ]);
    }

    public function patients_by_doctor(Request $request, $id)
    {
        $branchData = getBranchData($request->header());
        $query = MhpPatient::query();
        if ($branchData['super_admin'] == false) {
            if ($branchData['B2C']) {
                $query->where('doctor_id', $branchData['user_id']);
            } else {
                $query->where('saas_branch_id', $branchData['branch_id']);
            }
        }
        $patients = $query->with('statuses', 'patient_birth_sex')->orderBy('id', 'DESC')->get();
        // $patient_list = MhpPatient::with('statuses', 'patient_birth_sex')->where('saas_branch_id', $id)->orderBy('id', 'DESC')->get();
        return response()->json([
            'success' => "Success",
            'data' => $patients,
        ], 200);
    }

    public function patient_list()
    {
        $patient_list = MhpPatient::with('statuses', 'patient_birth_sex')->orderBy('id', 'DESC')->get();
        return response()->json([
            'success' => "Success",
            'data' => $patient_list,
        ], 200);
    }
    public function destroy($id)
    {
        $occupational_hazards = MhpPatient::find($id);
        if ($occupational_hazards) {
            if ($occupational_hazards['delete_status'] == 0) {
                $delete_status = 1;
            } else {
                $delete_status = 0;
            }
            $occupational_hazards->delete_status = $delete_status;
            $occupational_hazards->save();
            return response()->json([
                'status' => 200,
                'message' => 'Patients deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Patients Found',
            ]);
        }
    }

    public function edit($id)
    {
        $patient = MhpPatient::with('patient_birth_sex')->find($id);
        return response()->json([
            'status' => 200,
            'patient' => $patient,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'patient_hn_number' => 'required',
            'patient_first_name' => 'required',
            'patient_last_name' => 'required',
            'patient_mobile_phone' => 'required',
            'patient_birth_sex_id' => 'required',
            'patient_status' => 'required',
            'patient_dob' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {

            $patients = MhpPatient::find($id);

            if ($files = $request->file('image')) {
                $names = $files->getClientOriginalName();
                $name = rand(111, 99999) . $names;
                $files->move('images/files/', $name);
            }
            $branchData = getBranchData($request->header());
            if ($branchData['super_admin']) {
                $patients->saas_branch_id = $request->saas_branch_id;
                $patients->saas_branch_name = $request->saas_branch_name;
            }
            $patients->patient_hn_number = $request->patient_hn_number;
            $patients->patient_title_id = $request->patient_title_id;
            $patients->patient_first_name = $request->patient_first_name;
            $patients->patient_nid = $request->patient_nid;
            $patients->patient_bcid = $request->patient_bcid;
            $patients->ptn_blood_group_id = $request->ptn_blood_group_id;
            $patients->patient_last_name = $request->patient_last_name;
            $patients->patient_contact_via = $request->patient_contact_via;
            $patients->patient_mobile_phone = $request->patient_mobile_phone;
            $patients->patient_head_of_family = $request->patient_head_of_family;
            $patients->patient_emergency_contact = $request->patient_emergency_contact;
            $patients->patient_dob = $request->patient_dob;
            $patients->patient_email = $request->patient_email;
            $patients->patient_birth_sex_id = $request->patient_birth_sex_id;
            $patients->patient_individual_health_identifier_no = $request->patient_individual_health_identifier_no;
            $patients->patient_religion_id = $request->patient_religion_id;
            $patients->patient_usual_provider_id = $request->patient_usual_provider_id;
            $patients->patient_ethnicity_id = $request->patient_ethnicity_id;
            $patients->patient_parent_id = $request->patient_parent_id;
            $patients->patient_address1 = $request->patient_address1;
            $patients->patient_address2 = $request->patient_address2;
            $patients->patient_usual_visit_type_id = $request->patient_usual_visit_type_id;
            $patients->patient_usual_account = $request->patient_usual_account;
            $patients->patient_deceased_date = $request->patient_deceased_date;
            $patients->patient_next_of_kin = $request->patient_next_of_kin;
            $patients->patient_medical_record_no = $request->patient_medical_record_no;
            $patients->patient_city_id = $request->patient_city_id;
            $patients->patient_safety_net_no = $request->patient_safety_net_no;
            $patients->patient_postal_code = $request->patient_postal_code;
            $patients->patient_health_inc_fund = $request->patient_health_inc_fund;
            $patients->patient_health_inc_no = $request->patient_health_inc_no;
            $patients->patient_expire_date = $request->patient_expire_date;
            $patients->patient_medical_no = $request->patient_medical_no;
            $patients->patient_occupation_id = $request->patient_occupation_id;
            $patients->patient_hcc_no = $request->patient_hcc_no;
            $patients->patient_general_notes = $request->patient_general_notes;

            $patients->patient_appointment_notes = $request->patient_appointment_notes;
            if ($files != null) {
                $patients->patient_images = $name;
            }

            $patients->patient_middle_name = $request->patient_middle_name;
            $patients->patient_preferred_name = $request->patient_preferred_name;
            $patients->patient_home_phone = $request->patient_home_phone;
            $patients->patient_work_phone = $request->patient_work_phone;
            $patients->patient_status = $request->patient_status;
            $patients->patient_state_id = $request->patient_state_id;
            $patients->patient_passport = $request->patient_passport;
            $patients->age = $request->age;


            $patients->save();
            return response()->json([
                'status' => 200,
                'message' => 'Patients Updated Successfully',
            ]);
        }
    }

    public function update_patients_app(Request $request, $patietnId)
    {

        $patients = MhpPatient::find($patietnId);


        if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999) . $names;
            $files->move('images/files/', $name);
        }
        $patients->patient_first_name = $request->patient_first_name;
        $patients->ptn_blood_group_id = $request->ptn_blood_group_id;
        $patients->patient_last_name = $request->patient_last_name;
        $patients->patient_birth_sex_id = $request->patient_birth_sex_id;
        $patients->patient_address1 = $request->patient_address1;
        if ($files != null) {
            $patients->patient_images = $name;
        }
        $patients->patient_dob = $request->patient_dob;
        $patients->save();

        return response()->json([
            'status' => 200,
            'message' => 'Patients Updated Successfully',
            'data' => $patients
        ]);
    }


    public function lactation_update(Request $request, $id)
    {
        //    return $request->all();
        $patients = MhpPatient::find($id);
        $patients->lactation = $request->lactation;
        $patients->save();
        return response()->json([
            'status' => 200,
            'message' => 'Patients Lactation Updated Successfully',
        ]);
    }

    public function search($name)
    {
        // $result = MhpPatient::with('title', 'religion', 'ethnicity', 'occupation', 'contact_via', 'patient_birth_sex', 'statuses', 'city', 'state', 'usual_provider', 'usual_account', 'blood_group')
        //      ->where('id', $name)
        //     ->orWhere('patient_hn_number', 'LIKE', '%' . $name . '%')
        //     ->orWhere('patient_mobile_phone', 'LIKE', '%' . $name . '%')
        //      ->orWhere('patient_dob', 'LIKE', '%' . $name . '%')
        //     ->where('delete_status', 0)
        //     ->get();

        $result = MhpPatient::with('title', 'religion', 'ethnicity', 'occupation', 'contact_via', 'patient_birth_sex', 'statuses', 'city', 'state', 'usual_provider', 'usual_account', 'blood_group')
            ->where('delete_status', 0)
            ->where(function ($query) use ($name) {
                $query->where('id', $name)
                    ->orWhere('patient_hn_number', 'LIKE', '%' . $name . '%')
                    ->orWhere('patient_mobile_phone', 'LIKE', '%' . $name . '%')
                    ->orWhere('patient_dob', 'LIKE', '%' . $name . '%');
            })
            ->get();

        if (count($result)) {
            return Response()->json($result);
        } else {
            return response()->json(['Result' => 'No Data not found'], 404);
        }
    }
    public function search_for_doctor(Request $request, $name)
    {
        $branchData = getBranchData($request->header());
        $patient_request = MhpPatientRequest::where('doctors_master_id', $branchData['user_id'])->distinct()->pluck('patient_id');
        $result = MhpPatient::with('title', 'religion', 'ethnicity', 'occupation', 'contact_via', 'patient_birth_sex', 'statuses', 'city', 'state', 'usual_provider', 'usual_account', 'blood_group')
            ->where('delete_status', 0)
            ->when(!$branchData['super_admin'] && $branchData['B2C'], function ($q) use ($patient_request) {
                return $q->whereIn('id', $patient_request);
            })
            ->when(!$branchData['super_admin'] && $branchData['B2B'], function ($q) use ($branchData) {
                return $q->where('saas_branch_id', $branchData['branch_id']);
            })
            ->where(function ($query) use ($name) {
                $query->where('id', $name)
                    ->orWhere('patient_hn_number', 'LIKE', '%' . $name . '%')
                    ->orWhere('patient_mobile_phone', 'LIKE', '%' . $name . '%')
                    ->orWhere('patient_dob', 'LIKE', '%' . $name . '%');
            })
            ->get();

        if (count($result)) {
            return Response()->json($result);
        } else {
            return response()->json(['Result' => 'No Data not found'], 404);
        }
    }

    public function search_by_id($id)
    {
        $patient = MhpPatient::with('title', 'religion', 'ethnicity', 'occupation', 'contact_via', 'patient_birth_sex', 'statuses', 'city', 'state', 'usual_provider', 'usual_account', 'blood_group')
            ->where('delete_status', 0)
            ->where('id', $id)->first();


        $vsArray = [];

        $bpArray = [];
        $vsSetup = MhpVitalSign::get();
        $uniqueDates = MhpPatientsVitalSign::where('patient_id', $id)->select(DB::raw('DATE(created_at) as date'))
            ->distinct()
            ->orderBy('date', 'desc')
            ->get();
        $vitalWithUniqueDates = [];
        foreach ($uniqueDates as $date) {
            $dateVs = MhpPatientsVitalSign::where('patient_id', $id)->whereDate('created_at', $date->date)->get();
            $newVs = [];
            foreach ($vsSetup as $vs) {
                $exist = $dateVs->where('name', $vs->name)->first();
                if ($exist) {
                    $vt = new \stdClass();
                    $vt->name = $vs->name;
                    $vt->value = $exist->value;
                    $vt->unit = $exist->units_id;
                    $newVs[] = $vt;
                } else {
                    $v = new \stdClass();
                    $v->name = $vs->name;
                    $v->value = null;
                    $v->unit = $vs->units_id;
                    $newVs[] = $v;
                }
            }
            $vitalWithUniqueDates[] = [
                'date' => $date->date,
                'vital_signs' => $newVs,
            ];
        }

        $data =  MhpPatientsVitalSign::where('patient_id', $id)->where('name', 'blood presure')->orderBy('id', 'desc')->get();

        foreach ($data as $d) {

            $sd_bp = $d->value;

            $str = explode("/", $sd_bp);

            $s_bp = $str[0];
            $d_bp = $str[1];

            $obj1 = new \stdClass();
            $obj1->name = $d->name;
            $obj1->systolic = (int)$s_bp;
            $obj1->diastolic = (int)$d_bp;
            $obj1->icon = $d->icon;
            $obj1->created_at = $d->created_at;
            array_push($bpArray, $obj1);
        }

        foreach ($vsSetup as $value) {
            $data =  MhpPatientsVitalSign::where('patient_id', $id)->where('name', '!=', 'blood presure')->where('name', $value->name)->orderBy('id', 'desc')->get();

            // $name = $value->name;

            if (count($data) > 0) {
                $name = "patientsVs";
                $obj1 = new \stdClass();
                $obj1->$name = $data;
                array_push($vsArray, $obj1);
            }


            // if (count($data) > 0) {
            //     array_push($vsArray, $data);
            // }


        }

        $vital_signs = MhpPatientsVitalSign::where('patient_id', $id)->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => 200,
            'patient' => $patient,
            'vital_signs' => $vital_signs,
            'vsArray' => $vsArray,
            'bpArray' => $bpArray,
            'dateVitalSign' => $vitalWithUniqueDates,
        ]);
    }

    public function patients_family_social($id)
    {

        $alcohols = MhpPatientsFamilySocialHistoryAlcohol::where('patients_id', $id)->orderBy('id', 'desc')->first();
        $occupation_details = MhpPatientsOccupationDetails::where('patients_id', $id)->orderBy('id', 'desc')->first();
        $social_tobacco = MhpPatientsFamilySocialHistoryTobacco::where('patients_id', $id)->orderBy('id', 'desc')->first();

        return response()->json([
            'status' => 200,
            'alcohols' => $alcohols,
            'occupation_details' => $occupation_details,
            'social_tobacco' => $social_tobacco,
        ]);
    }

    public function Add_family_details(Request $request, $id)
    {
        $alcohle = new MhpPatientsFamilySocialHistoryAlcohol();
        $alcohle->patients_id = $id;
        $alcohle->is_drinker = $request->is_drinker;
        $alcohle->days_per_week = $request->days_per_week;
        $alcohle->standard_drinks_per_day = $request->standard_drinks_per_day;
        $alcohle->past_alc_consumption = $request->past_alc_consumption;
        $alcohle->year_started = $request->year_started;
        $alcohle->year_stopped = $request->year_stopped;
        $alcohle->comments = $request->comments;
        $alcohle->save();

        $tobaco = new MhpPatientsFamilySocialHistoryTobacco();
        $tobaco->patients_id = $id;
        $tobaco->current_smoking_history = $request->current_smoking_history;
        $tobaco->tobacco_year_started = $request->tobacco_year_started;
        $tobaco->tobacco_year_stopped = $request->tobacco_year_stopped;
        $tobaco->is_fresho_leaf = $request->is_fresho_leaf;
        $tobaco->amount_per_day = $request->amount_per_day;
        $tobaco->is_cessation_advice = $request->is_cessation_advice;
        $tobaco->advice_suggestion = $request->advice_suggestion;
        $tobaco->comments_tobacco = $request->comments_tobacco;
        $tobaco->save();

        $ocupation = new MhpPatientsOccupationDetails();
        $ocupation->patients_id = $id;
        $ocupation->occupation_id = $request->occupation_id;
        $ocupation->occupation_details = $request->occupation_details;
        $ocupation->employee_id = $request->employee_id;
        $ocupation->year_commented = $request->year_commented;
        $ocupation->year_ceased = $request->year_ceased;
        $ocupation->occupational_hazards_exposer = $request->occupational_hazards_exposer;
        $ocupation->extra_details = $request->extra_details;

        $ocupation->merital_status_id = $request->merital_status_id;
        $ocupation->father_status = $request->father_status;
        $ocupation->father_death_year = $request->father_death_year;
        $ocupation->father_medical_history = $request->father_medical_history;
        $ocupation->father_cause_of_death = $request->father_cause_of_death;
        $ocupation->mother_status = $request->mother_status;
        $ocupation->mother_death_year = $request->mother_death_year;
        $ocupation->mother_medical_history = $request->mother_medical_history;
        $ocupation->mother_cause_of_death = $request->mother_cause_of_death;

        $ocupation->save();


        return response()->json([
            'status' => 200,
            'message' => 'Additional Details Saved Successfully',
            'res' => $ocupation
        ]);
    }

    public function Update_family_details(Request $request, $id)
    {
        // return $request->all();
        $alcohle = MhpPatientsFamilySocialHistoryAlcohol::where('patients_id', $id)->orderBy('id', 'desc')->first();
        $alcohle->patients_id = $id;
        $alcohle->is_drinker = $request->is_drinker;
        $alcohle->days_per_week = $request->days_per_week;
        $alcohle->standard_drinks_per_day = $request->standard_drinks_per_day;
        $alcohle->past_alc_consumption = $request->past_alc_consumption;
        $alcohle->year_started = $request->year_started;
        $alcohle->year_stopped = $request->year_stopped;
        $alcohle->comments = $request->comments;
        $alcohle->update();

        $tobaco = MhpPatientsFamilySocialHistoryTobacco::where('patients_id', $id)->orderBy('id', 'desc')->first();
        $tobaco->patients_id = $id;
        $tobaco->current_smoking_history = $request->current_smoking_history;
        $tobaco->date_started = $request->date_started;
        $tobaco->tobacco_year_started = $request->tobacco_year_started;
        $tobaco->tobacco_year_stopped = $request->tobacco_year_stopped;
        $tobaco->is_fresho_leaf = $request->is_fresho_leaf;
        $tobaco->amount_per_day = $request->amount_per_day;
        $tobaco->is_cessation_advice = $request->is_cessation_advice;
        $tobaco->advice_suggestion = $request->advice_suggestion;
        $tobaco->comments_tobacco = $request->comments_tobacco;
        $tobaco->update();

        $ocupation = MhpPatientsOccupationDetails::where('patients_id', $id)->orderBy('id', 'desc')->first();
        $ocupation->patients_id = $id;
        $ocupation->occupation_id = $request->occupation_id;
        $ocupation->occupation_details = $request->occupation_details;
        $ocupation->employee_id = $request->employee_id;
        $ocupation->year_commented = $request->year_commented;
        $ocupation->year_ceased = $request->year_ceased;
        $ocupation->occupational_hazards_exposer = $request->occupational_hazards_exposer;
        $ocupation->extra_details = $request->extra_details;

        $ocupation->merital_status_id = $request->merital_status_id;
        $ocupation->father_status = $request->father_status;
        $ocupation->father_death_year = $request->father_death_year;
        $ocupation->father_medical_history = $request->father_medical_history;
        $ocupation->father_cause_of_death = $request->father_cause_of_death;
        $ocupation->mother_status = $request->mother_status;
        $ocupation->mother_death_year = $request->mother_death_year;
        $ocupation->mother_medical_history = $request->mother_medical_history;
        $ocupation->mother_cause_of_death = $request->mother_cause_of_death;
        $ocupation->update();


        return response()->json([
            'status' => 200,
            'message' => 'Additional Details Update Successfully',
            'dataPa' => $ocupation
        ]);
    }

    public function patients_additional_dropdown()
    {
        $occupation = MhpOccupation::where('delete_status', 0)->get();
        $doctors = MhpDoctorsMaster::where('delete_status', 0)->get();
        $occupationalhazards = MhpOccupationalHazards::where('delete_status', 0)->get();
        $currentsmokinghistory = MhpCurrentSmokingHistory::where('delete_status', 0)->get();
        $tobaccotype = MhpTobaccoType::where('delete_status', 0)->get();
        $tobaccoamountcost = MhpTobaccoCostAmount::where('delete_status', 0)->get();
        $advicesuggestion = MhpAdviceSuggestion::where('delete_status', 0)->get();
        $pastalcconsumption = MhpPastAlcoholConsumption::where('delete_status', 0)->get();

        return response()->json([
            'status' => 200,
            'occupation' => $occupation,
            'doctors' => $doctors,
            'occupationalhazards' => $occupationalhazards,
            'currentsmokinghistory' => $currentsmokinghistory,
            'tobaccotype' => $tobaccotype,
            'tobaccoamountcost' => $tobaccoamountcost,
            'advicesuggestion' => $advicesuggestion,
            'pastalcconsumption' => $pastalcconsumption,
        ]);
    }

    public function patients_profile($id)
    {
        // $patients_details = MhpPatient::with('title', 'religion', 'ethnicity', 'occupation', 'contact_via', 'patient_birth_sex', 'statuses', 'city', 'state', 'usual_provider', 'usual_account', 'blood_group', 'vital_sign')->where('id', $id)->first();
        // $patients_details->patient_dob = date('Y-m-d', $patients_details->patient_dob);
        $patients_details = MhpPatient::with('title', 'religion', 'ethnicity', 'occupation', 'contact_via', 'patient_birth_sex', 'statuses', 'city', 'state', 'usual_provider', 'usual_account', 'blood_group', 'vital_sign')->where('id', $id)->first();

        if ($patients_details && $patients_details->patient_dob) {
            // Clean the date string by removing the extra timezone part
            $cleaned_date = preg_replace('/\s*\(.*\)$/', '', $patients_details->patient_dob);

            // Now parse and format the cleaned date
            $patients_details->patient_dob = Carbon::parse($cleaned_date)->format('Y-m-d');
        }
        $appointments = MhpAppointmentScheduler::with('doctors')->where('patient_id', $id)->get();
        return response()->json([
            'status' => 200,
            'patients_details' =>  $patients_details,
            'appointments' =>  $appointments,
        ]);
    }

    public function update_img(Request $request, $id)
    {

        $patients = MhpPatient::find($id);

        if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999) . $names;
            $files->move('images/files/', $name);
        }
        $patients->patient_images = $name;

        $patients->save();
        return response()->json([
            'status' => 200,
            'message' => 'Patients Image Updated Successfully',
        ]);
    }

    //mobile api patient profile function


    // public function getProfile($id){

    //     $patientProfile=DB::table('mhp_patients')->leftJoin('mhp_usual_providers','mhp_patients.patient_usual_provider_id','=','mhp_usual_providers.id')->where('mhp_patients.id',$id)->where('mhp_patients.delete_status',0)->first();
    //     // dd($patientProfile);
    //     return response()->json([
    //         'status' => 200,
    //         'patientProfile' => $patientProfile,
    //     ]);
    // }

    //mobile api patient search function

    public function getALlPatient($id)
    {

        $search_patients = DB::table('mhp_patients')->where('patient_hn_number', 'LIKE', '%' . $id . '%')->orWhere('patient_title_id', 'LIKE', '%' . $id . '%')->orWhere('patient_nid', 'LIKE', '%' . $id . '%')->orWhere('patient_first_name', 'LIKE', '%' . $id . '%')->orWhere('patient_middle_name', 'LIKE', '%' . $id . '%')->orWhere('patient_last_name', 'LIKE', '%' . $id . '%')->orWhere('patient_mobile_phone', 'LIKE', '%' . $id . '%')->orWhere('patient_email', 'LIKE', '%' . $id . '%')->orWhere('patient_health_inc_no', 'LIKE', '%' . $id . '%')->orWhere('patient_medical_no', 'LIKE', '%' . $id . '%')->orWhere('patient_hcc_no', 'LIKE', '%' . $id . '%')->get();

        return response()->json([
            'status' => 200,
            'search_patients' => $search_patients,
        ]);
    }



    public function search_by_phone_or_hin()
    {


        $checkNow = date("Y-m-d");

        $appointmentPatient = MhpAppointmentScheduler::where('StartTime', 'LIKE', '%' . $checkNow . '%')
            ->where('delete_status', 0)->pluck('patient_id')->toArray();

        $patient = MhpPatient::with('title', 'religion', 'ethnicity', 'occupation', 'contact_via', 'patient_birth_sex', 'statuses', 'city', 'state', 'usual_provider', 'usual_account', 'blood_group')
            ->whereIn('id', $appointmentPatient)
            ->where('delete_status', 0)->get();

        return response()->json([
            'status' => 200,
            'data' => 'found',
            'patient' => $patient,
            // 'patient_id'=>$patient->id,
            // 'todaysPatientAppointments' => $todaysAppointment,
        ]);
    }

    public function app_token(Request $request, $id)
    {
        $patient = MhpPatient::find($id);

        if (!$patient) {
            return response()->json([
                "status" => 404,
                "message" => "Patient Not Found",
            ]);
        }

        $patient->app_token = $request->token;
        $patient->save();

        return response()->json([
            "status" => 200,
            "message" => "Token Updated",
            "patient" => $patient
        ]);
    }

    public function patientTotalPayment($patient_hn_number)
    {
        $total_patient_payment_lists = DoctorPayment::with('doctor')->where('patient_hn_number', $patient_hn_number)->latest()->get();
        return response()->json([
            'success' => $total_patient_payment_lists
        ]);
    }

    public function saveFromGreatDoc(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_first_name' => 'required',
            'patient_mobile_phone' => 'required',
            'patient_birth_sex_id' => 'required',
            'patient_status' => 'required',
            'patient_dob' => 'required',
        ]);
        $branchData = getBranchData($request->header());
        $createUser = false;
        if ($request->createUser === "true") {
            Config::set('database.connections.mysql.database', 'mhpdemocom');
            app('db')->purge();
            $user =  User::where("email", $request->patient_mobile_phone)->where('user_type', 'Patient')->first();
            if ($user) {
                return response([
                    'message' => 'The mobile number is already registered!'
                ], 403);
            } else {
                $createUser = true;
            }
        }
        if ($validator->fails()) {
            return response()->json([
                "errors" => $validator->messages(),
            ], 402);
        } else {

            if ($files = $request->file('image')) {
                $names = $files->getClientOriginalName();
                $name = rand(111, 99999) . $names;
                $files->move('images/files/', $name);
            } else {
                $name = "";
            }

            // dynamic db set 
            $response = Http::withHeaders([
                'Authorization' => $request->header('Authorization'),
                'Content-Type' => 'application/json', // Set the appropriate content type for your request body
            ])->get(env('SAAS_URL') . '/auth/auth-check');

            if ($response['status'] === 'success') {
                $db = $response['data']['user']['organization']['db_name'];
                Config::set('database.connections.mysql.database', $db);
                app('db')->purge();

                $patients = new MhpPatient();

                $patient_hn = '';
                $client = new \GuzzleHttp\Client();
                $token = $request->header('Authorization');

                if ($request->patient_hn_number) {
                    $patient_hn = $request->patient_hn_number;
                } else {
                    $res = $client->request('GET', env('SAAS_URL') . '/get/patient/hn', [
                        'headers' => [
                            'Authorization' => $token,
                        ],
                    ]);
                    $data = json_decode($res->getBody()->getContents());
                    $patient_hn = $data->hn_number;
                }

                $patients->patient_hn_number = $patient_hn;
                $patients->patient_title_id = $request->patient_title_id;
                $patients->patient_first_name = $request->patient_first_name;
                $patients->patient_nid = $request->patient_nid;
                $patients->patient_bcid = $request->patient_bcid;
                $patients->ptn_blood_group_id = $request->ptn_blood_group_id;
                $patients->patient_last_name = $request->patient_last_name;
                $patients->patient_contact_via = $request->patient_contact_via;
                $patients->patient_mobile_phone = $request->patient_mobile_phone;
                $patients->patient_head_of_family = $request->patient_head_of_family;
                $patients->patient_emergency_contact = $request->patient_emergency_contact;
                $patients->patient_dob = $request->patient_dob;
                $patients->patient_email = $request->patient_email;
                $patients->patient_birth_sex_id = $request->patient_birth_sex_id;
                $patients->patient_individual_health_identifier_no = $request->patient_individual_health_identifier_no;
                $patients->patient_religion_id = $request->patient_religion_id;
                $patients->patient_usual_provider_id = $request->patient_usual_provider_id;
                $patients->patient_ethnicity_id = $request->patient_ethnicity_id;
                $patients->patient_parent_id = $request->patient_parent_id;
                $patients->patient_address1 = $request->patient_address1;
                $patients->patient_address2 = $request->patient_address2;
                $patients->patient_usual_visit_type_id = $request->patient_usual_visit_type_id;
                $patients->patient_usual_account = $request->patient_usual_account;
                $patients->patient_deceased_date = $request->patient_deceased_date;
                $patients->patient_next_of_kin = $request->patient_next_of_kin;
                $patients->patient_medical_record_no = $request->patient_medical_record_no;
                $patients->patient_city_id = $request->patient_city_id;
                $patients->patient_safety_net_no = $request->patient_safety_net_no;
                $patients->patient_postal_code = $request->patient_postal_code;
                $patients->patient_health_inc_fund = $request->patient_health_inc_fund;
                $patients->patient_health_inc_no = $request->patient_health_inc_no;
                $patients->patient_expire_date = $request->patient_expire_date;
                $patients->patient_medical_no = $request->patient_medical_no;
                $patients->patient_occupation_id = $request->patient_occupation_id;
                $patients->patient_hcc_no = $request->patient_hcc_no;
                $patients->patient_general_notes = $request->patient_general_notes;
                $patients->patient_appointment_notes = $request->patient_appointment_notes;
                $patients->age = $request->age;
                $patients->day = $request->day;
                $patients->month = $request->month;

                $patients->patient_images = $name;

                $patients->patient_middle_name = $request->patient_middle_name;
                $patients->patient_preferred_name = $request->patient_preferred_name;
                $patients->patient_home_phone = $request->patient_home_phone;
                $patients->patient_work_phone = $request->patient_work_phone;
                $patients->patient_status = $request->patient_status;
                $patients->patient_state_id = $request->patient_state_id;
                $patients->patient_passport = $request->patient_passport;

                if ($branchData['super_admin'] == false) {
                    $patients->saas_branch_id = $branchData['branch_id'];
                    $patients->saas_branch_name = $branchData['branch_name'];
                    $patients->doctor_id = $request->header('user-id');
                } else {
                    $patients->saas_branch_id = $request->saas_branch_id;
                    $patients->saas_branch_name = $request->saas_branch_name;
                }
                $patients->save();

                // $res = $client->request(
                //     'POST',
                //     env('SAAS_URL') . '/store/patient/hn',
                //     [
                //         'headers' => [
                //             'Authorization' => $token,
                //             "Accept" => "application/json",
                //         ],
                //         'form_params' => [
                //             'hn' => $patient_hn,
                //             'id' => $patients->id,
                //         ]
                //     ],
                // );
                $data = json_decode($res->getBody()->getContents());
                if (isset($branchData['B2C']) && $branchData['B2C']) {
                    $patient_request = new MhpPatientRequest();
                    $patient_request->patient_id = $patients->id;
                    $patient_request->doctors_master_id = $request->doctor_id;
                    $patient_request->status = 1;
                    $patient_request->save();
                }

                $scheduler = new MhpAppointmentScheduler();
                $scheduler->patient_name = $request->patient_first_name;
                $scheduler->doctors_id = $request->doctor_id;
                $scheduler->patient_id = $patients->id;
                $scheduler->patient_mobile = $request->patient_mobile_phone;
                $scheduler->notes = null;
                $scheduler->StartTime = date('Y-m-d H:i:s');
                $scheduler->EndTime = date('Y-m-d H:i:s', strtotime('+10 minutes'));
                $scheduler->Subject = null;
                $scheduler->status_color = "#020131";
                $scheduler->app_type = "Chamber";
                $scheduler->status_name = "Arrived";

                $header = $request->header();
                $branchData = getBranchData($header);
                if ($branchData['super_admin'] == false) {
                    $scheduler->saas_branch_id = $branchData['branch_id'];
                    $scheduler->saas_branch_name = $branchData['branch_name'];
                }
                // if ( $request->patient_id != null){
                //     $patientData->status_color = "#e6f2e9";
                // }

                $scheduler->save();
            }
            // dynamic db set 


            if ($createUser == true) {
                Config::set('database.connections.mysql.database', 'mhpdemocom');
                app('db')->purge();
                $tokenPatent = Str::random(40);

                $user = new User();
                $user->name = $patients->patient_first_name;
                $user->email = $patients->patient_mobile_phone;
                $pass =  Str::startsWith($patients->patient_mobile_phone, ['+88', '+61'])
                    ? substr($patients->patient_mobile_phone, 3)
                    : $patients->patient_mobile_phone;
                $user->password = Hash::make($pass);
                $user->user_type = 'patient';
                $user->user_id = $patients->id;
                $user->remember_token = $tokenPatent;
                $user->patient_hn_number = $patient_hn;
                $user->db_name = 'mhpdemocom';
                $user->regFrom = 'greatDoc';
                $user->dob = $patients->patient_dob;
                $user->organization_id = $request->organization_id;
                $user->save();
                $phoneNumber = substr($patients->patient_mobile_phone, 3);
                $message = "Dear " . $patients->patient_first_name . ",Your Digi Patient account is created. Your mobile number is: " . $patients->patient_mobile_phone . " and Password is: " . $patients->patient_mobile_phone . " Thank you for registering with us. ";
                $sms_res = Http::post("https://api.sms.net.bd/sendsms?api_key=Qi5AYc3ln98s422LNXhFo62RWOReTqG3eDulVr00&msg=${message}&to=${phoneNumber}");

                $vsArray = [
                    (object)['name' => 'BLOOD SUGAR', 'value' => '10', 'desc' => 'BLOOD SUGAR', 'units_id' => 'mmol/L', 'icon' => '85492blood sugar=1.jpg'],
                    (object)['name' => 'BLOOD PRESSURE', 'value' => '120/80', 'desc' => 'BLOOD PRESSURE', 'units_id' => 'mm Hg', 'icon' => '66037Blood pressure-1.jpg'],
                    (object)['name' => 'BMI', 'value' => '18.5', 'desc' => 'BMI', 'units_id' => 'Kg/m2', 'icon' => '27013BMI body mass index-1.jpg'],
                    (object)['name' => 'HEIGHT', 'value' => '170', 'desc' => 'HEIGHT', 'units_id' => 'cm', 'icon' => '56529height-1.jpg'],
                    (object)['name' => 'HEAD CIRCUMSTANCES', 'value' => '70', 'desc' => 'HEAD CIRCUMSTANCES', 'units_id' => 'cm', 'icon' => '82832head circumstance-1.jpg'],
                    (object)['name' => 'OXYGEN SATURATION', 'value' => '98', 'desc' => 'OXYGEN SATUARATION', 'units_id' => '%', 'icon' => '33006oxygen saturation-1.jpg'],
                    (object)['name' => 'WEIGHT', 'value' => '71', 'desc' => 'WEIGHT', 'units_id' => 'Kg', 'icon' => '9988weight-1.jpg'],
                    (object)['name' => 'TEMPERATURE', 'value' => '98', 'desc' => 'TEMPERATURE', 'units_id' => '°F', 'icon' => '72886Temperature-1.jpg'],
                    (object)['name' => 'WAIST CIRCUMSTANCES', 'value' => '100', 'desc' => 'WAIST CIRCUMSTANCES', 'units_id' => 'cm', 'icon' => '61346waist circumstances-1.jpg'],

                ];

                foreach ($vsArray as $item) {
                    $vitalSign = new MhpPatientsVitalSign();
                    $vitalSign->patient_id = $user->user_id;
                    $vitalSign->name = $item->name;
                    $vitalSign->value = $item->value;
                    $vitalSign->desc = $item->desc;
                    $vitalSign->last_check_up_date = Carbon::now();
                    $vitalSign->icon = $item->icon;
                    $vitalSign->units_id = $item->units_id;
                    $vitalSign->save();
                }

                $clinic = new PatientOrganization();
                $clinic->patient_id =  $patients->id;
                $clinic->organization_id = $request->organization_id;
                $clinic->save();
            }

            return response()->json([
                'status' => 200,
                'message' => 'Patients Added Successfully',
                'patients' => $patients,
                'data' => $data
            ]);
        }
    }







    public function storeForLab(Request $request)
    {

        $patients = new MhpPatient();

        $patient_hn = '';
        $client = new \GuzzleHttp\Client();
        $token = $request->header('Authorization');

        $res = $client->request('GET', env('SAAS_URL') . '/get/patient/hn', [
            'headers' => [
                'Authorization' => $token,
            ],
        ]);
        $data = json_decode($res->getBody()->getContents());
        $patient_hn = $data->hn_number;



        if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999) . $names;
            $files->move('images/files/', $name);
        } else {
            $name = "";
        }

        $patients->patient_hn_number = $patient_hn;
        $patients->patient_title_id = $request->patient_title_id;
        $patients->patient_first_name = $request->patient_first_name;
        $patients->patient_nid = $request->patient_nid;
        $patients->patient_bcid = $request->patient_bcid;
        $patients->ptn_blood_group_id = $request->ptn_blood_group_id;
        $patients->patient_last_name = $request->patient_last_name;
        $patients->patient_contact_via = $request->patient_contact_via;
        $patients->patient_mobile_phone = $request->patient_mobile_phone;
        $patients->patient_head_of_family = $request->patient_head_of_family;
        $patients->patient_emergency_contact = $request->patient_emergency_contact;
        $patients->patient_dob = $request->patient_dob;
        $patients->patient_email = $request->patient_email;
        $patients->patient_birth_sex_id = $request->patient_birth_sex_id;
        $patients->patient_individual_health_identifier_no = $request->patient_individual_health_identifier_no;
        $patients->patient_religion_id = $request->patient_religion_id;
        $patients->patient_usual_provider_id = $request->patient_usual_provider_id;
        $patients->patient_ethnicity_id = $request->patient_ethnicity_id;
        $patients->patient_parent_id = $request->patient_parent_id;
        $patients->patient_address1 = $request->patient_address1;
        $patients->patient_address2 = $request->patient_address2;
        $patients->patient_usual_visit_type_id = $request->patient_usual_visit_type_id;
        $patients->patient_usual_account = $request->patient_usual_account;
        $patients->patient_deceased_date = $request->patient_deceased_date;
        $patients->patient_next_of_kin = $request->patient_next_of_kin;
        $patients->patient_medical_record_no = $request->patient_medical_record_no;
        $patients->patient_city_id = $request->patient_city_id;
        $patients->patient_safety_net_no = $request->patient_safety_net_no;
        $patients->patient_postal_code = $request->patient_postal_code;
        $patients->patient_health_inc_fund = $request->patient_health_inc_fund;
        $patients->patient_health_inc_no = $request->patient_health_inc_no;
        $patients->patient_expire_date = $request->patient_expire_date;
        $patients->patient_medical_no = $request->patient_medical_no;
        $patients->patient_occupation_id = $request->patient_occupation_id;
        $patients->patient_hcc_no = $request->patient_hcc_no;
        $patients->patient_general_notes = $request->patient_general_notes;
        $patients->patient_appointment_notes = $request->patient_appointment_notes;

        $patients->age = $request->age;
        $patients->day = $request->day;
        $patients->month = $request->month;

        $patients->patient_images = $name;

        $patients->patient_middle_name = $request->patient_middle_name;
        $patients->patient_preferred_name = $request->patient_preferred_name;
        $patients->patient_home_phone = $request->patient_home_phone;
        $patients->patient_work_phone = $request->patient_work_phone;
        $patients->patient_status = $request->patient_status;
        $patients->patient_state_id = $request->patient_state_id;
        $patients->patient_passport = $request->patient_passport;
        $branchData = getBranchData($request->header());

        if ($branchData['super_admin'] == false) {
            $patients->saas_branch_id = $branchData['branch_id'];
            $patients->saas_branch_name = $branchData['branch_name'];
            $patients->doctor_id = $request->header('user-id');
        } else {
            $patients->saas_branch_id = $request->saas_branch_id;
            $patients->saas_branch_name = $request->saas_branch_name;
        }
        $patients->save();

        // $res = $client->request(
        //     'POST',
        //     env('SAAS_URL') . '/store/patient/hn',
        //     [
        //         'headers' => [
        //             'Authorization' => $token,
        //             "Accept" => "application/json",
        //         ],
        //         'form_params' => [
        //             'hn' => $patient_hn,
        //             'id' => $patients->id,
        //         ]
        //     ],
        // );

        $data = json_decode($res->getBody()->getContents());

        return response()->json([
            'status' => 200,
            'message' => 'Patients Added Successfully',
            'patients' => $patients,
            'data' => $data
        ]);
    }
}
