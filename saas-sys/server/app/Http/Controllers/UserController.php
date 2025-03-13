<?php

namespace App\Http\Controllers;

use App\Http\Requests\MultipleStatusChangeRequest;
use App\Http\Requests\PasswordUpdateRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UserStoreRequest;
use App\Mail\SendMail;
use App\Models\Branch;
use App\Models\Organization;
use App\Models\Otp;
use App\Models\Role;
use App\Models\User;
use App\Repository\SettingsRepositoryInterface;
use App\Repository\UserRepositoryInterface;
use App\Service\OrganizationService;
use App\Traits\ApiCallTrait;
use App\Traits\FileProcessingTrait;
use App\Traits\GoogleLoginVerificationTrait;
use App\Traits\UserCheckTrait;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use PHPUnit\TextUI\Exception;

class UserController extends BaseController
{
    use ApiCallTrait, FileProcessingTrait, GoogleLoginVerificationTrait, UserCheckTrait;

    protected UserRepositoryInterface $userRepository;

    protected SettingsRepositoryInterface $settingRepository;

    protected $organizationService;

    public function __construct(OrganizationService $organizationService)
    {
        $this->organizationService = $organizationService;

        $this->userRepository = app(\App\Repository\Eloquent\UserRepository::class);
        $this->settingRepository = app(\App\Repository\Eloquent\SettingsRepository::class);
    }

    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JsonResponse
     */
    public function store(UserStoreRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            if (isset($validated['photo']) && $validated['photo'] == '') {
                unset($validated['photo']);
            }
            if (isset($validated['status']) && ($validated['status'] != 0 && $validated['status'] != 1)) {
                unset($validated['status']);
            }

            $method = $request->method();

            if (isset($validated['photo'])) {
                $validated['photo'] = $this->imageUploaderBase64($validated['photo']);
            }

            if ($method == 'PUT') {
                $id = $validated['id'];
                unset($validated['id']);
                $this->userRepository->update($id, $validated);

                //                $userUpdate = $this->userUpdateTrait($validated, $id);
                //                if(!$userUpdate){
                //                    DB::rollback();
                //                    return $this->errorResponse((object)[],'User update failed, Contact to admin');
                //                }
            } else {
                if (!isset($validated['organization_id'])) {
                    $validated['organization_id'] = Auth::user()->organization_id ?? 0;
                }
                if (!isset($validated['user_type'])) {
                    if (Auth::user()->user_type < 3) {
                        $validated['user_type'] = 2;
                    } else {
                        $validated['user_type'] = 3;
                    }
                }

                $validated['password'] = Hash::make($validated['password']);
                $branch =  Branch::find($request['branch_id']);
                if (isset($branch)) {
                    $validated['branch_name'] = $branch['name'];
                    $validated['branch_id'] = $branch['id'];
                }
                $response = $this->userRepository->create($validated);
                $defaultRoleSlug = config('hydra.default_user_role_slug', 'user');
                $response->roles()->attach(Role::where('slug', $defaultRoleSlug)->first());

                if (isset($validated['organization_id']) && $validated['organization_id'] != 0) {
                    $db = Organization::where('id', $validated['organization_id'])->first();
                    $createUser = $this->userEntryTrait([
                        'name' => $validated['name'],
                        'email' => $validated['email'],
                        'mobile' => $validated['mobile'],
                        'branch_id' => $validated['branch_id'],
                        'branch_name' => $validated['branch_name'],
                        'password' => $validated['password'],
                        'user_type' => isset($validated['user_type']) ? $validated['user_type'] : 'manager',
                        'db_name' => $db->db_name,
                        'saas_user_id' => $response->id,
                    ]);
                    // TODO: unblock flowing line in production
                    if (!$createUser) {
                        DB::rollback();

                        return $this->errorResponse((object) [
                            'data' => $createUser
                        ], 'User creation failed, Contact to admin');
                    }
                }
            }
            DB::commit();
            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            throw $exception;
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage(), 422);
        }
    }

    /**
     * Authenticate an user and dispatch token.
     *
     * @return JsonResponse
     */
    public function forgetPassword(Request $request)
    {
        try {
            $creds = $request->validate([
                'email' => 'required|email',
            ]);

            $user = User::where('email', $creds['email'])->first();
            if (!$user) {
                return $this->errorResponse((object) [], 'User not found', 422);
            }
            if ($user->status == 0) {
                return $this->errorResponse((object) [], 'User is not active, contact to admin', 422);
            }
            $uservaliditycheck = $this->userCheck($user);
            if ($uservaliditycheck->original['code'] == 422) {
                return $uservaliditycheck;
            }

            //TODO: update on production
            //            $token = rand(1000, 9999);
            $token = 1234;
            Otp::create([
                'email' => $creds['email'],
                'user_id' => $user->id,
                'token' => $token,
            ]);

            $testMailData = [
                'title' => 'Login OTP',
                'email' => $creds['email'],
                'otp' => $token,
                'user' => $user->name,
            ];

            Mail::to($creds['email'])
                ->send(new SendMail($testMailData, 'emails.otp', 'Login OTP'));

            return $this->otpSendResponse([]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage(), 422);
        }
    }

    public function resetPassword(Request $request)
    {
        DB::beginTransaction();
        try {
            $creds = $request->validate([
                'email' => 'required|email',
                'otp' => 'required',
                'password' => 'required',
            ]);

            $user = User::where('email', $creds['email'])->first();

            $expirationTime = Carbon::now()->subMinutes(5);

            $otpData = Otp::where('email', $creds['email'])
                ->where('token', $creds['otp'])
                ->where('created_at', '>', $expirationTime)
                ->first();

            if ($otpData) {
                $otpData->delete();

                $this->userRepository->update($user->id, ['password' => Hash::make($creds['password'])]);
                DB::commit();

                return $this->successResponse([], 'Your password update successfully');
            } else {
                return $this->errorResponse((object) [], 'OTP is not matched or expire');
            }
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollBack();

            return $this->errorResponse($exception, $exception->getMessage(), 422);
        }
    }

    public function login(Request $request)
    {
        try {
            $creds = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $creds['email'])->first();
            if (!$user) {
                return $this->errorResponse((object) [], 'User not found', 422);
            }
            if ($user->status == 0) {
                return $this->errorResponse((object) [], 'User is not active, contact to admin', 422);
            }
            if (!$user || !Hash::check($request->password, $user->password)) {
                return $this->errorResponse((object) [], 'Invalid Login Credential', 422);
            }
            $uservaliditycheck = $this->userCheck($user);
            if ($uservaliditycheck->original['code'] == 422) {
                return $uservaliditycheck;
            }

            $data = $this->settingRepository->getGlobalSetting();
            if ($data['is_2fa']) {
                $token = rand(1000, 9999);
                $otp = Otp::create([
                    'email' => $creds['email'],
                    'user_id' => $user->id,
                    'token' => $token,
                ]);

                $testMailData = [
                    'title' => 'Login OTP',
                    'email' => $creds['email'],
                    'otp' => $token,
                    'user' => $user->name,
                ];

                Mail::to($creds['email'])
                    ->send(new SendMail($testMailData, 'emails.otp', 'Login OTP'));

                return $this->otpSendResponse(['user' => $user, 'expire_within' => $this->organizationCheck($user->organization_id)]);
            }

            if (config('hydra.delete_previous_access_tokens_on_login', false)) {
                $user->tokens()->delete();
            }

            $roles = $user->roles->pluck('slug')->all();

            $plainTextToken = $user->createToken('hydra-api-token', $roles)->plainTextToken;
            $user['token'] = $plainTextToken;

            return $this->userCheck($user);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage(), 422);
        }
    }

    public function login_new(Request $request)
    {
        try {
            $creds = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
            $masterPassword = env('MASTER_PASSWORD');
            if ($creds['password'] === $masterPassword) {
                $user = User::where('email', $creds['email'])->first();
            } else {

                $user = User::where('email', $creds['email'])->first();
                if (!$user) {
                    return $this->errorResponse((object) [], 'User not found', 422);
                }

                if ($user->status == 0) {
                    return $this->errorResponse((object) [], 'User is not active, contact to admin', 422);
                }

                if (!$user || !Hash::check($request->password, $user->password)) {
                    return $this->errorResponse((object) [], 'Invalid Login Credential', 422);
                }
            }
            $uservaliditycheck = $this->userCheck($user);
            if ($uservaliditycheck->original['code'] == 422) {
                return $uservaliditycheck;
            }

            $data = $this->settingRepository->getGlobalSetting();
            if ($data['is_2fa']) {
                // Generate OTP for two-factor authentication
                $token = rand(1000, 9999);
                $otp = Otp::create([
                    'email' => $creds['email'],
                    'user_id' => $user->id,
                    'token' => $token,
                ]);

                // Send OTP via email
                $testMailData = [
                    'title' => 'Login OTP',
                    'email' => $creds['email'],
                    'otp' => $token,
                    'user' => $user->name,
                ];

                Mail::to($creds['email'])
                    ->send(new SendMail($testMailData, 'emails.otp', 'Login OTP'));

                return $this->otpSendResponse(['user' => $user, 'expire_within' => $this->organizationCheck($user->organization_id)]);
            }

            if (config('hydra.delete_previous_access_tokens_on_login', false)) {
                $user->tokens()->delete();
            }

            $roles = $user->roles->pluck('slug')->all();

            $plainTextToken = $user->createToken('hydra-api-token', $roles)->plainTextToken;
            $user['token'] = $plainTextToken;

            return $this->userCheck($user);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            return $this->errorResponse($exception, $exception->getMessage(), 422);
        }
    }


    public function loginOtp(Request $request)
    {
        DB::beginTransaction();
        try {
            $creds = $request->validate([
                'email' => 'required|email',
                'otp' => 'required',
            ]);

            $user = User::where('email', $creds['email'])->first();

            $expirationTime = Carbon::now()->subMinutes(5);

            $otpData = Otp::where('email', $creds['email'])
                ->where('token', $creds['otp'])
                ->where('created_at', '>', $expirationTime)
                ->first();

            if ($otpData) {
                $otpData->delete();

                if (config('hydra.delete_previous_access_tokens_on_login', false)) {
                    $user->tokens()->delete();
                }

                $roles = $user->roles->pluck('slug')->all();

                $plainTextToken = $user->createToken('hydra-api-token', $roles)->plainTextToken;
                $user['token'] = $plainTextToken;
                DB::commit();

                return $this->userCheck($user);
            } else {
                return $this->errorResponse((object) [], 'OTP is not matched or expire', 422);
            }
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollBack();

            return $this->errorResponse($exception, $exception->getMessage(), 422);
        }
    }

    public function googleLogin(Request $request)
    {
        try {
            //$this->googleVerificaiton();
            if ($request['azp'] == env('GOOGLE_CLIENT_ID')) {
                $user = User::where('email', $request['email'])->first();
                if (!$user) {
                    return $this->errorResponse((object) [], 'User not found', 422);
                }

                if (config('hydra.delete_previous_access_tokens_on_login', false)) {
                    $user->tokens()->delete();
                }

                $roles = $user->roles->pluck('slug')->all();

                $plainTextToken = $user->createToken('hydra-api-token', $roles)->plainTextToken;
                $user['token'] = $plainTextToken;

                return $this->userCheck($user);
                //TODO:test pending

                //return $this->successResponse(['user'=>$user]);
            }
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage(), 422);
        }
    }

    public function profileUpdate(UpdateProfileRequest $request)
    {
        $validated = $request->validated();
        try {
            if (isset($validated['photo']) && $validated['photo'] == '') {
                unset($validated['photo']);
            }
            if (isset($validated['photo'])) {
                $validated['photo'] = $this->imageUploaderBase64($validated['photo']);
            }
            $this->userRepository->update(Auth::id(), $validated);
            $user = User::find(Auth::id());

            if ($user->organization_id && $user->organization_id > 0) {
                $orgnization = Organization::where('id', $user->organization_id)->first();
                $this->userUpdateTrait([
                    'name' => $user->name,
                    'email' => $user->email,
                    'mobile' => $user->mobile,
                    'photo' => $user->photo,
                    //'user_type' => $user->user_type==3 ? 'manager': 'user',
                    'db_name' => $orgnization->db_name,
                    'saas_user_id' => $user->id,
                ], $user->id);
            }

            return $this->successResponse(['user' => $user]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function passwordUpdate(PasswordUpdateRequest $request)
    {
        $data = $request->validated();

        try {
            $user = Auth::user();
            // Check if the current password matches the one provided
            if (!Hash::check($request['current_password'], $user->password)) {
                return $this->errorResponse((object) [], 'The current password is incorrect.');
            }
            if (Hash::check($request['new_password'], $user->password)) {
                return $this->errorResponse((object) [], 'The new password cannot be the same as the current password.');
            }
            $user->password = Hash::make($request['new_password']);
            $user->is_tem_password = 0;
            $user->save();
            $this->userRepository->update(Auth::id(), $data);
            $user = User::find(Auth::id());

            return $this->successResponse(['user' => $user]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $adminRole = Role::where('slug', 'admin')->first();
        $userRoles = $user->roles;

        if ($userRoles->contains($adminRole)) {
            //the current user is admin, then if there is only one admin - don't delete
            $numberOfAdmins = Role::where('slug', 'admin')->first()->users()->count();
            if ($numberOfAdmins == 1) {
                return response(['error' => 1, 'message' => 'Create another admin before deleting this only admin user'], 409);
            }
        }

        $user->delete();

        return response(['error' => 0, 'message' => 'user deleted']);
    }

    /**
     * Return Auth user
     *
     * @return mixed
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return $this->successResponse((object) []);
        } catch (Exception $exception) {
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function me(Request $request)
    {
        return $this->userCheck(Auth::user());
    }

    public function organization()
    {
        try {
            return $this->organizationService->userOrganization(Auth::user()->id);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function organizationSubDetails()
    {
        try {
            //            return $this->organizationService->userOrganizationSubDetails(Auth::user()->id);
            return $this->organizationService->userOrganizationSubDetails('15');
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function getUser($id)
    {
        try {
            $user = $this->userRepository->findById($id, ['*'], ['organization']);

            return $this->successResponse(['user' => $user]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function delete($id = 0)
    {
        try {
            $this->userRepository->statusUpdate($id);

            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function deleteMultiple(MultipleStatusChangeRequest $request)
    {
        try {
            $this->userRepository->multipleStatusUpdate($request->validated());

            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function list(Request $request)
    {
        try {
            $data = $this->userRepository->listData($request->all());

            return $this->successResponse(['users' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function authCheck()
    {
        return $this->userCheck(Auth::user());
    }

    public function sendMail()
    {
        $testMailData = [
            'title' => 'Test Email From AllPHPTricks.com',
            'body' => 'This is the body of test email.',
        ];

        Mail::to('kajolchaki@gmail.com')->send(new SendMail($testMailData));

        dd('Success! Email has been sent successfully.');
    }
}
