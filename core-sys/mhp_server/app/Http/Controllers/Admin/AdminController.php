<?php

namespace App\Http\Controllers\Admin;

// use Auth;
use Image;
// use Hash;
use Session;
use App\Models\User;
use App\Models\Admin;
use App\Models\MhpPatient;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\MhpPatientsVitalSign;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{


    /**
     * @Description: show all tables name in database
     */
    public function getAllTableName()
    {
        $tables = DB::select('SHOW TABLES');
        $tableNames = [];

        foreach ($tables as $table) {
            $tableNames[] = $table->{'Tables_in_' . env('DB_DATABASE')};
        }

        return ['tables' => $tableNames, 'count' => count($tableNames)];
    }

    public function updateAllTable()
    {
        $tablesData = $this->getAllTableName();
        $tables = $tablesData['tables'];
        $tableCount = $tablesData['count'];
        $tableDetails = [];
        $couldNotUpdateTable = array();
        $updateCount = 0;


        /**
         * @Description: add to all table saas_branch_id and saas_branch_name column
         */
        foreach ($tables as $table) {
            $columnNames = [];
            $columns = DB::select("SHOW COLUMNS FROM $table");
            foreach ($columns as $column) {
                $columnNames[] = $column->Field;
            }
            if (!in_array('saas_branch_id', $columnNames)) {
                DB::statement("ALTER TABLE $table ADD COLUMN saas_branch_id INT NULL DEFAULT NULL AFTER id");
                DB::statement("ALTER TABLE $table ADD COLUMN saas_branch_name VARCHAR(255) NULL DEFAULT NULL AFTER saas_branch_id");
                // $updateCount++;
            }
        }


        /**
         * @Description: generate table details who is updated or not
         */
        foreach ($tables as $tableName) {
            $columns = DB::select("SHOW COLUMNS FROM $tableName");

            $columnNames = [];
            foreach ($columns as $column) {
                $columnNames[] = $column->Field;
            }

            $tableDetails[$tableName] = $columnNames;
            if (in_array('saas_branch_id', $columnNames) && in_array('saas_branch_name', $columnNames)) {
                $updateCount++;
            } else {
                $couldNotUpdateTable[] = $tableName;
            }
        }


        return response()->json([
            'message' => 'Data inserted successfully',
            'updateCount' => $updateCount,
            'tableCount' => $tableCount,
            'tableDetails' => $tableDetails,
            'couldNotUpdateTable' => $couldNotUpdateTable,
        ]);
    }


    // public function updateAllTable()
    // {
    //     $tables = $this->getAllTableName();
    //     $tableCount = count($tables);
    //     $tableDetails = [];
    //     $updateCount = 0;
    //     foreach ($tables as $table) {
    //         $columns = DB::select("SHOW COLUMNS FROM $table");

    //         $columnNames = [];
    //         foreach ($columns as $column) {
    //             $columnNames[] = $column->Field;
    //         }

    //         $tableDetails[$table] = $columnNames;
    //         if (in_array('saas_branch_id', $columnNames) && in_array('saas_branch_name', $columnNames)) {
    //             $updateCount++;
    //         }
    //     }

    //     foreach ($tables as $table) {
    //         $columnNames = [];
    //         foreach ($columns as $column) {
    //             $columnNames[] = $column->Field;
    //         }
    //         if (!in_array('saas_branch_id', $columnNames)) {
    //             DB::statement("ALTER TABLE $table ADD COLUMN saas_branch_id INT NULL DEFAULT NULL AFTER id");
    //             DB::statement("ALTER TABLE $table ADD COLUMN saas_branch_name VARCHAR(255) NULL DEFAULT NULL AFTER saas_branch_id");
    //             $updateCount++;
    //         }
    //     }



    //     return response()->json([
    //         'message' => 'Data inserted successfully',
    //         'updateCount' => $updateCount,
    //         'tableCount' => $tableCount,
    //         'tableDetails' => $tableDetails,
    //     ]);
    // }
    public function mims_products_info(Request $request)
    {
        $tokenCredentials =  $request->validate([
            'mims_token' => 'required|string',
            'guid' => 'required',
        ]);

        if ("eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSIkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ" === $tokenCredentials['mims_token']) {
            $res = Http::get('https://mims.macrohealthplus.org/generic/' . $tokenCredentials['guid']);

            return $res;
        }

        return response()->json([
            'message' => 'Token not valid',
        ], 503);
    }

    public function login_with_saas(Request $request)
    {

        $credentials = $request->only('email', 'password');
        try {
            $response = Http::post(env('SAAS_URL') . '/login', $credentials);
            // $response = Http::post('http://127.0.0.1:8000/api/v1' . '/login', $credentials);
            // return $response;
            if ($response->status() === 200) {
                if ($response['code'] === 200) {

                    Config::set('database.connections.mysql.database', $response['data']['user']['organization']['db_name']);
                    app('db')->purge();
                    $localUser =  User::where('saas_user_id', $response['data']['user']['id'])->first();
                    if ($localUser) {
                        if (isset($request->deviceToke) && $request->deviceToke !== null) {
                            $localUser->deviceToke = $request->deviceToke;
                            $localUser->save();
                        }
                        if ($localUser->user_type === 'empty') {
                            return response()->json([
                                'message' => 'Ask admin to assign role',
                            ], 401);
                        } else {
                            $user = new \stdClass();
                            $user->id =  $localUser->id;
                            $user->email =  $localUser->email;
                            $user->mobile =  $localUser->mobile;
                            $user->user_id =  $localUser->user_id;
                            $user->user_type =  $localUser->user_type;
                            $user->organization_name =  $response['data']['user']['organization']['name'];
                            $user->organization_id =  $response['data']['user']['organization']['id'];
                            $user->organization_mobile = $response['data']['user']['organization']['mobile'];
                            $user->organization_email = $response['data']['user']['organization']['email'];
                            $user->organization_address = $response['data']['user']['organization']['address'];
                            $user->organization_logo = $response['data']['user']['organization']['logo'];
                            $user->branch_id = $response['data']['user']['branch_id'];
                            $user->branch_name = $response['data']['user']['branch_name'];
                            $user->s_uid = $response['data']['user']['id'];
                            $user->bs_type = $response['data']['user']['organization']['business_type'];
                            $user->name = $response['data']['user']['name'];
                            return response()->json([
                                'message' => 'User Logged in successfully',
                                'access_token' => $response['data']['user']['token'],
                                'user' => $user,
                            ], 201);
                        }
                    }
                    Artisan::call('cache:clear');
                    Artisan::call('config:clear');
                } else {
                    return response()->json(['error' => $response['message']], 404);
                }
            } else {
                return response()->json(['error' => 'API call failed'], 400);
            }
        } catch (\Exception $th) {
            return response()->json(['error' => 'Server is not responding' . $th], 400);
        }
    }
    // public function login_with_saas_app(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');
    //     try {
    //         $response = Http::post(env('SAAS_URL') . '/login', $credentials);
    //         // return $response;
    //         if ($response->status() === 200) {
    //             if ($response['code'] === 200) {

    //                 Config::set('database.connections.mysql.database', $response['data']['user']['organization']['db_name']);
    //                 app('db')->purge();
    //                 $localUser =  User::where('saas_user_id', $response['data']['user']['id'])->first();



    //                 if ($localUser) {
    //                     if (isset($request->deviceToke) && $request->deviceToke !== null) {
    //                         $localUser->deviceToke = $request->deviceToke;
    //                         $localUser->save();
    //                     }
    //                     if ($localUser->user_type === 'empty') {
    //                         return response()->json([
    //                             'message' => 'Ask admin to assign role',
    //                         ], 401);
    //                     } else {
    //                         $user = new \stdClass();
    //                         $user->id =  $localUser->id;
    //                         $user->email =  $localUser->email;
    //                         $user->mobile =  $localUser->mobile;
    //                         $user->user_id =  $localUser->user_id;
    //                         $user->user_type =  $localUser->user_type;
    //                         $user->organization_name =  $response['data']['user']['organization']['name'];
    //                         $user->organization_mobile = $response['data']['user']['organization']['mobile'];
    //                         $user->organization_email = $response['data']['user']['organization']['email'];
    //                         $user->organization_address = $response['data']['user']['organization']['address'];
    //                         $user->organization_logo = $response['data']['user']['organization']['logo'];
    //                         $user->branch_id = $response['data']['user']['branch_id'];
    //                         $user->branch_name = $response['data']['user']['branch_name'];
    //                         $user->s_uid = $response['data']['user']['id'];
    //                         $user->bs_type = $response['data']['user']['organization']['bs_type'];

    //                         return response()->json([
    //                             'message' => 'User Logged in successfully',
    //                             'access_token' => $response['data']['user']['token'],
    //                             'user' => $user,
    //                         ], 201);
    //                     }
    //                 }
    //                 Artisan::call('cache:clear');
    //                 Artisan::call('config:clear');
    //             } else {
    //                 return response()->json(['error' => $response['message']], 404);
    //             }
    //         } else {
    //             return response()->json(['error' => 'API call failed'], 400);
    //         }
    //     } catch (\Exception $th) {
    //         return response()->json(['error' => 'Server is not responding' . $th->getMessage()], 400);
    //     }
    // }
    public function register_from_saas(Request $request)
    {

        $tokenCredentials = $request->validate([
            'token' => 'required|string',
        ]);

        if (env('SECRET_KEY') === $tokenCredentials['token']) {
            try {
                // Validate the remaining credentials
                $credentials = $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => 'required|email',
                    'db_name' => 'required',
                    'user_type' => 'required',
                    'saas_user_id' => 'required',
                    'mobile' => 'string',
                ]);

                // Dynamically set the database name and purge the connection
                Config::set('database.connections.mysql.database', $credentials['db_name']);
                app('db')->purge();

                // Create the user
                $user = new User();
                $user->name = $credentials['name'];
                $user->email = $credentials['email'];
                $user->mobile = $credentials['mobile'];
                $user->db_name = $credentials['db_name'];
                $user->saas_branch_id = $request->branch_id ?? null;
                $user->saas_branch_name = $request->branch_name ?? null;
                $user->user_type = $credentials['user_type'] === 'admin' ? 'Super_Admin' : 'empty';
                $user->saas_user_id = (int) $credentials['saas_user_id'];
                $user->save();

                // Return success response
                return response()->json([
                    'message' => 'User created successfully',
                    'user' => $user
                ], 200);
            } catch (\Exception $e) {
                // Log the error details
                Log::error('Error creating user:', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ]);

                // Return error response
                return response()->json([
                    'message' => 'An error occurred while creating the user.',
                ], 500);
            }
        } else {
            Log::error('Token is not valid');
            return response()->json([
                'message' => 'Token is not valid',
            ], 400);
        }
    }
    // public function register_from_saas(Request $request)
    // {
    //     $tokenCredentials =  $request->validate([
    //         'token' => 'required|string',
    //     ]);
    //     if (env('SECRET_KEY') === $tokenCredentials['token']) {

    //         $credentials =  $request->validate([
    //             'name' => 'required|string|max:255',
    //             'email' => 'required|email',
    //             'db_name' => 'required',
    //             'user_type' => 'required',
    //             'saas_user_id' => 'required',
    //             'mobile' => 'string',

    //         ]);
    //         Config::set('database.connections.mysql.database', $credentials['db_name']);
    //         app('db')->purge();

    //         $user = new User();
    //         $user->name = $credentials['name'];
    //         $user->email = $credentials['email'];
    //         $user->mobile = $credentials['mobile'];
    //         $user->db_name = $credentials['db_name'];

    //         $user->saas_branch_id = isset($request->branch_id) ? $request->branch_id : null;
    //         $user->saas_branch_name = isset($request->branch_name) ? $request->branch_name : null;
    //         $user->user_type = $credentials['user_type'] === 'admin' ? 'Super_Admin' : 'empty';
    //         $user->saas_user_id = (int)$credentials['saas_user_id'];
    //         $user->save();
    //         return response()->json([
    //             'message' => 'User created successfully',
    //             'user' => $user
    //         ], 200);
    //     } else {
    //         return response()->json([
    //             'message' => 'token is not valid',
    //         ], 400);
    //     }
    // }


    public function getUser($email)
    {

        $user =  User::where("email", $email)->first();

        if (!$user) {
            return response([
                'message' => 'Invalid Credentials'
            ], 401);
        } else {
            return response([
                'message' => 'Logged in'
            ], 200);
        }
    }
    public function labUser()
    {

        $user =  User::whereIn("user_type", ["Employee", "Doctor"])->get();


        return response([
            'message' => 'Users',
            'users' => $user
        ], 200);
    }

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required |unique:users|email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error_msg' => $validator->messages(),
            ]);
        } else {
            $data = new User();
            $data->name = $request->name;
            $data->email = $request->email;
            $data->password = Hash::make($request->password);
            $data->user_type = $request->user_type;
            $data->user_id = $request->user_id;
            $data->save();

            return response()->json([
                'status' => 200,
                'message' => 'User Registration Completed',
            ]);
        }
    }

    // ------------------ [ User Detail ] ---------------------
    public function userDetail($email)
    {
        $user = array();
        if ($email != "") {
            $user = User::where("email", $email)->first();
            return $user;
        }
    }



    public function login(Request $request)
    {

        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        //Check email

        // $user =  User::where("email", $request->email)->where("password", $request->password)->first();

        $user =  User::where("email", $request->email)->first();

        if (!$user) {
            return response([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        $check = Hash::check($request->password, $user->password);

        //Check Password
        if (!$check) {
            return response([
                'message' => 'Invalid Credentials'
            ], 401);
        }
        $response = [
            'message' => 'User Logged in sucessfully',
            'user' => $user
        ];

        return response($response, 201);
    }



    public function login_doctor(Request $request)
    {

        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user =  User::where("email", $request->email)->where('user_type', 'Doctor')->first();

        if (!$user) {
            return response([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        $check = Hash::check($request->password, $user->password);

        //Check Password
        if (!$check) {
            return response([
                'message' => 'Invalid Credentials'
            ], 401);
        }
        $response = [
            'message' => 'User Logged in sucessfully',
            'user' => $user
        ];

        return response($response, 201);
    }


    public function updatePassword(Request $request)
    {
        $credentials = $this->validate($request, [
            'current_password' => 'required',
            'new_password' => 'required|min:8',
            'new_password_confirmation' => 'required|min:8',
        ]);
        $bearerToken = $request->bearerToken();
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $bearerToken
        ])->post(env('SAAS_URL') . '/auth/user/update/password', $credentials);
        return response($response->json(), $response->status());
    }



    public function user_list()
    {
        $users = User::orderBy('id', 'desc')->get();
        return response()->json([
            'users' => $users,
        ]);
    }

    public function user_list_by_type($type)
    {
        $users = User::where('user_type', $type)->whereNotNull('user_id')->get();

        return response()->json([
            'users' => $users,
        ]);
    }
    public function user_type_update(Request $request)
    {

        $user = User::find($request->id);
        $user->user_email = $request->user_email;
        $user->user_type = $request->user_type;
        $user->user_id = $request->user_id;
        $user->save();
        return response()->json([
            'user' => $user,
        ]);
    }

    public function patient_registration(Request $request)
    {
        $request->validate([
            'app_token' => 'required'
        ]);


        if (env('SECRET_KEY') === $request->app_token) {

            $validator = Validator::make($request->all(), [
                'patient_first_name' => 'required',
                'patient_last_name' => 'required',
                'password' => 'required|min:8',
                'patient_mobile_phone' => 'required|min:8|unique:users,email',
                'patient_dob' => 'required',
                'patient_birth_sex_id' => 'required',
                // 'patient_address1' => 'required',
                // 'ptn_blood_group_id' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 400,
                    'msg' => $validator->errors(),
                ]);
            }

            $dataPatient = MhpPatient::latest()->first();
            $patient_hn = '';
            $client = new \GuzzleHttp\Client();
            $res = $client->request('GET', env('SAAS_URL') . '/get/patient/hn');
            $data = json_decode($res->getBody()->getContents());
            $patient_hn = $data->hn_number;

            if ($files = $request->file('image')) {
                $names = $files->getClientOriginalName();
                $name = rand(111, 99999) . $names;
                $files->move('images/files/', $name);
            } else {
                $name = "";
            }
            $patient = new MhpPatient();
            $patient->patient_hn_number = $patient_hn;
            $patient->patient_first_name = $request->patient_first_name;
            $patient->patient_middle_name = '';
            $patient->ptn_blood_group_id = $request->ptn_blood_group_id;
            $patient->patient_last_name = $request->patient_last_name;
            $patient->patient_mobile_phone = $request->patient_mobile_phone;
            $patient->patient_birth_sex_id = $request->patient_birth_sex_id;
            $patient->patient_address1 = $request->patient_address1;
            $patient->patient_images = $name;
            $patient->patient_dob = $request->patient_dob;
            $patient->patient_status = 1;
            $patient->patient_email = $request->patient_email;
            $patient->save();

            $tokenPatent = Str::random(40);

            $user = new User();
            $user->name = $request->patient_first_name . ' ' . $patient->patient_last_name;
            $user->email = $patient->patient_mobile_phone;
            $user->password = Hash::make($request->password);
            $user->user_type = 'patient';
            $user->user_id = $patient->id;
            $user->remember_token = $tokenPatent;
            $user->patient_hn_number = $patient_hn;
            $user->dob = $patient->patient_dob;
            $user->organization_id = 79;
            $user->regFrom = 'app';
            $user->db_name = $request->headers->get('databaseName');

            // $res = $client->request(
            //     'POST',
            //     env('SAAS_URL') . '/store/patient/hn',
            //     [
            //         'headers' => [
            //             "Accept" => "application/json",
            //         ],
            //         'form_params' => [
            //             'hn' => $patient_hn,
            //             'id' => $patient->id,
            //         ]
            //     ],
            // );
            $user->save();


            $vsArray = [
                (object)['name' => 'Blood sugar', 'value' => '10', 'desc' => 'Blood sugar', 'units_id' => 'mmol/L', 'icon' => '85492blood sugar=1.jpg'],
                (object)['name' => 'Blood pressure', 'value' => '120/80', 'desc' => 'Blood pressure', 'units_id' => 'mm Hg', 'icon' => '66037Blood pressure-1.jpg'],
                (object)['name' => 'BMI', 'value' => '18.5', 'desc' => 'BMI', 'units_id' => 'Kg/m2', 'icon' => '27013BMI body mass index-1.jpg'],
                (object)['name' => 'Height', 'value' => '170', 'desc' => 'Height', 'units_id' => 'cm', 'icon' => '56529height-1.jpg'],
                (object)['name' => 'Head Circumferences', 'value' => '70', 'desc' => 'Head Circumferences', 'units_id' => 'cm', 'icon' => '82832head circumstance-1.jpg'],
                (object)['name' => 'Oxygen Saturation', 'value' => '98', 'desc' => 'Oxygen Saturation', 'units_id' => '%', 'icon' => '33006oxygen saturation-1.jpg'],
                (object)['name' => 'Weight', 'value' => '71', 'desc' => 'Weight', 'units_id' => 'Kg', 'icon' => '9988weight-1.jpg'],
                (object)['name' => 'Temparature', 'value' => '98', 'desc' => 'Temparature', 'units_id' => '°F', 'icon' => '72886Temperature-1.jpg'],
                (object)['name' => 'Waist circumferences', 'value' => '100', 'desc' => 'Waist circumferences', 'units_id' => 'cm', 'icon' => '61346waist circumstances-1.jpg'],

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


            //     $message = "Remember your user ID and password for future use";
            //     $url = "https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php";
            //     $url .= "?masking=NOMASK&userName=fauziaali2000@gmail.com&password=80f50e35f83130f022e78a2862aab390";
            //     $url .= "&MsgType=TEXT&receiver=" . $patient->patient_mobile_phone . "&message=" . urlencode($message);

            //      try {
            //     Http::get($url);
            // } catch (\Exception $e) {
            //     Log::error('Error during HTTP request(SMS): ' . $e->getMessage());
            // }

            return response()->json([
                'message' => 'User Registration Completed',
                'token' => $tokenPatent,
                'data' =>  $user,
                'patient' =>  $patient,

            ], 201);
        } else {
            return response()->json([
                'message' => 'Unauthenticated ',
            ], 401);
        }
    }

    public function login_patient(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);



        $user =  User::where("email", $request->email)->where('user_type', 'Patient')->first();
        if (!$user) {
            return response([
                'message' => 'Invalid Credentials'
            ], 401);
        }
        $check = Hash::check($request->password, $user->password);
        if (!$check) {
            return response([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        $tokenPatent = Str::random(40);
        $user->remember_token = $tokenPatent;
        $user->deviceToke = $request->deviceToke;

        $user->login_status = 1;
        $user->last_login_logout_time = Carbon::now();

        $user->save();

        $response = [
            'message' => 'User Logged in sucessfully',
            'token' => $tokenPatent,
            'user' => $user
        ];

        return response($response, 201);
    }

    public function patient_logout(Request $request)
    {
        $user = User::find($request->id);
        $user->login_status = 0;
        $user->last_login_logout_time = Carbon::now();
        $user->save();

        return response()->json(['message' => 'Logout successfully',], 201);
    }
    public function patient_password_update(Request $request)
    {

        $request->validate([
            'phone_number' =>  [
                'required',
                'string',
                'max:16',
            ],
            'password' => 'required|min:8',
        ]);

        $user =  User::where("email", $request->input('phone_number'))->where('user_type', 'Patient')->first();
        if (!$user) {
            return response([
                'message' => 'User not found !'
            ], 401);
        }
        $user->password = Hash::make($request->password);
        $user->save();

        return response(['message' => 'Password update sucessfully',], 201);
    }

    public function patient_info_update(Request $request, $id)
    {
        $patient = MhpPatient::find($id);

        if (!$patient) {
            return response()->json(['Patient records not available.'], 404);
        }
        $patient->patient_first_name = $request->patient_first_name;
        $patient->patient_middle_name = '';
        $patient->ptn_blood_group_id = $request->ptn_blood_group_id;
        $patient->patient_last_name = $request->patient_last_name;
        $patient->patient_birth_sex_id = $request->patient_birth_sex_id;
        $patient->patient_address1 = $request->patient_address1;

        if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999) . $names;
            $files->move('images/files/', $name);

            $patient->patient_images = $name;
        }

        $patient->patient_dob = $request->patient_dob;
        $patient->patient_status = 1;
        $patient->patient_email = $request->patient_email;
        $patient->save();


        $user = User::where('user_id', $patient->id)->first();
        $user->name = $request->patient_first_name . ' ' . $patient->patient_last_name;
        $user->save();

        return response()->json(['Patient record update sucessfully.'], 201);
    }
    public function test()
    {
        return now();
    }
}
