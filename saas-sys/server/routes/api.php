<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DynamicDatabaseController;
use App\Http\Controllers\HydraController;
use App\Http\Controllers\MhpSmsController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Organization\OrganizationController;
use App\Http\Controllers\PatientHnController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PurchaseSmsController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SMSGatewayController;
use App\Http\Controllers\SSOController;
use App\Http\Controllers\Subscription\CouponController;
use App\Http\Controllers\Subscription\FeatureController;
use App\Http\Controllers\Subscription\OrganizationSubscriptionController;
use App\Http\Controllers\Subscription\RequestRefundController;
use App\Http\Controllers\Subscription\StorageSizeController;
use App\Http\Controllers\Subscription\SubscriptionController;
use App\Http\Controllers\Subscription\SubscriptionRequestController;
use App\Http\Controllers\Subscription\ValidityController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SslCommerzPaymentController;
use App\Models\MhpSms;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//use the middleware 'hydra.log' with any request to get the detailed headers, request parameters and response logged in logs/laravel.log
Route::get('request/test', [TestController::class, 'requestTest']);
Route::put('request/test', [TestController::class, 'requestTest']);

Route::get('hydra', [HydraController::class, 'hydra']);
Route::get('hydra/version', [HydraController::class, 'version']);
Route::get('/v1/get/patient/hn', [PatientHnController::class, 'index']);
// Route::post('/v1/store/patient/hn', [PatientHnController::class, 'store']);

//Route::apiResource('users', UserController::class)->except(['edit', 'create', 'store', 'update'])->middleware(['auth:sanctum', 'ability:admin,super-admin']);
Route::post('users', [UserController::class, 'store']);
Route::put('users/{user}', [UserController::class, 'update'])->middleware(['auth:sanctum', 'ability:admin,super-admin,user']);
Route::post('users/{user}', [UserController::class, 'update'])->middleware(['auth:sanctum', 'ability:admin,super-admin,user']);
Route::patch('users/{user}', [UserController::class, 'update'])->middleware(['auth:sanctum', 'ability:admin,super-admin,user']);
Route::get('me', [UserController::class, 'me'])->middleware('auth:sanctum');

Route::apiResource('roles', RoleController::class)->except(['create', 'edit'])->middleware(['auth:sanctum', 'ability:admin,super-admin,user']);
Route::apiResource('users.roles', UserRoleController::class)->except(['create', 'edit', 'show', 'update'])->middleware(['auth:sanctum', 'ability:admin,super-admin']);

Route::group(['middleware' => ['auth:sanctum', 'ability:admin,super-admin']], function () {
    Route::post('usersData', [UserController::class, 'storeData']);
});

Route::prefix('v1')->group(function () {
    Route::post('forget/password', [UserController::class, 'forgetPassword']);
    Route::post('reset/password', [UserController::class, 'resetPassword']);
    // Route::post('login', [UserController::class, 'login']);
    Route::post('login', [UserController::class, 'login_new']);

    Route::post('login/otp', [UserController::class, 'loginOtp']);
    Route::post('google/login', [UserController::class, 'googleLogin']);
    Route::post('get/token', [SSOController::class, 'validateToken']);




    Route::get('organization/{code}', [OrganizationController::class, 'organizationByCode']);
    Route::get('branch-public/{id}', [BranchController::class, 'show_without_auth']);
    Route::get('organization-list', [OrganizationController::class, 'list']);
    Route::get('subscription-plan', [SubscriptionController::class, 'activeSubscriptionPlanList']);

    Route::post('subscription-request', [SubscriptionRequestController::class, 'store']);
    Route::get('global/setting', [SettingController::class, 'getGlobalSettings']);
    Route::post('payment/success', [PaymentController::class, 'success']);
    Route::post('payment/failed', [PaymentController::class, 'failed']);

    Route::prefix('auth')->group(function () {
        //Route::group(['middleware' => ['auth:sanctum', 'ability:admin,super-admin']], function () {
        Route::group(['middleware' => ['auth:sanctum']], function () {
            Route::post('redirect/token', [SSOController::class, 'generateToken']);

            Route::get('dashboard', [DashboardController::class, 'dashboard']);
            Route::get('check/validity', [OrganizationSubscriptionController::class, 'checkValidity']);
            Route::get('notifications', [NotificationController::class, 'notificationList']);
            Route::post('notification/status', [NotificationController::class, 'notificationStatusUpdate']);
            // Start SMS Route 
            Route::prefix('sms')->group(function () {
                Route::post('/create-sms-gateway', [SMSGatewayController::class, 'store']);
                Route::get('/get-sms-gateway', [SMSGatewayController::class, 'index']);
                Route::put('/update-sms-gateway/{id}', [SMSGatewayController::class, 'update']);
                Route::get('/get-active-sms-gateway', [SMSGatewayController::class, 'activeSMSGateway']);
                // Purchase Routes 
                Route::post("/purchase-sms", [PurchaseSmsController::class, 'store']);
                Route::post('/purchase-sms', [PurchaseSmsController::class, 'index']);
                Route::post('/pay-via-ajax-sms', [SslCommerzPaymentController::class, 'index']);
                Route::get('/transaction-sms/{id}', [SslCommerzPaymentController::class, 'getTransaction']);
                Route::get("/transaction-sms-all", [SslCommerzPaymentController::class, 'getAllTransaction']);
                // Sms setup config
                Route::post('/sms-gateway', [MhpSmsController::class, 'index']);
                Route::post('/save-sms-gateway', [MhpSmsController::class, 'store']);
                Route::post('/update-sms-gateway/{id}', [MhpSmsController::class, 'update']);
                Route::delete('/delete-sms-country/{id}', [MhpSmsController::class, 'destroy_country']);
                Route::delete('/delete-sms-param/{id}', [MhpSmsController::class, 'destroy_param']);
                Route::post('update-sms-gateway-status/{id}', [MhpSmsController::class, 'update_status']);
                Route::post('/test-helper', [MhpSmsController::class, 'test']);
                Route::post('/send-sms', [MhpSmsController::class, 'sendSms']);
                // Sms setup config
                // Route::post('/success-sms', [SslCommerzPaymentController::class, 'success']);
                // Route::post('/fail-sms', [SslCommerzPaymentController::class, 'fail']);
                // Route::post('/cancel-sms', [SslCommerzPaymentController::class, 'cancel']);
            });

            // End SMS Route 
            //Only super Admin will get access of the following routes
            Route::prefix('subscription')->group(function () {
                Route::get('special', [SubscriptionController::class, 'specialList']);
                Route::get('/{id}', [SubscriptionController::class, 'getPlan']);
                Route::get('delete/{id}', [SubscriptionController::class, 'delete']);
                Route::post('delete', [SubscriptionController::class, 'deleteMultiple']);
                Route::post('store', [SubscriptionController::class, 'store']);
                Route::put('store', [SubscriptionController::class, 'store']);
                Route::get('/', [SubscriptionController::class, 'list']);
                Route::prefix('request')->group(function () {
                    Route::get('delete/{id}', [SubscriptionRequestController::class, 'delete']);
                    Route::post('delete', [SubscriptionRequestController::class, 'deleteMultiple']);
                    Route::get('list', [SubscriptionRequestController::class, 'list']);
                    Route::get('{id}', [SubscriptionRequestController::class, 'view']);
                    Route::put('/', [SubscriptionRequestController::class, 'statusChange']);
                });
            });

            Route::prefix('branch')->group(function () {
                Route::post('store', [BranchController::class, 'store']);
                Route::get('list', [BranchController::class, 'index']);
                Route::get("organization", [BranchController::class, 'allOrganization']);
                Route::get('organization/{id}', [BranchController::class, 'findBrachByOrganization']);
                Route::put("edit/{id}", [BranchController::class, 'update']);
                Route::get('{id}', [BranchController::class, 'show']);
                Route::prefix('service')->group(function () {
                    Route::get('find-branch-by-organizationId', [BranchController::class, 'findBranchByOrganizationIdForServiceProvider']);
                });
            });
            Route::prefix('subscription/cancel/request')->group(function () {
                Route::post('/', [RequestRefundController::class, 'subscriptionCancelRequest']);
                Route::get('/list', [RequestRefundController::class, 'subscriptionCancelRequestList']);
                Route::get('/{id}', [RequestRefundController::class, 'subscriptionCancelRequestView']);
                Route::post('/approve', [RequestRefundController::class, 'subscriptionCancelRequestApprove']);
            });
            Route::prefix('refund')->group(function () {
                // Route::post('/', [RequestRefundController::class, 'subscriptionCancelRequest']);
                Route::get('/list', [RequestRefundController::class, 'refundList']);
                Route::get('/{id}', [RequestRefundController::class, 'refundView']);
                Route::post('/update', [RequestRefundController::class, 'refundUpdate']);
            });

            Route::get('/upgradeable/subscription', [SubscriptionController::class, 'upgradeableList']);
            //            Route::get('/user/subscription/history', [SubscriptionController::class, 'subscriptionHistory']);
            Route::post('/upgrade/subscription', [SubscriptionController::class, 'upgrade']);
            Route::post('/check/coupon', [CouponController::class, 'checkCoupon']);
            Route::post('/store/card', [PaymentController::class, 'storeCard']);
            Route::post('/payment/success', [PaymentController::class, 'paymentSuccess']);
            Route::get('/payment/history', [PaymentController::class, 'paymentHistory']);
            Route::get('/payment/history/{id}', [PaymentController::class, 'paymentDetails']);
            //`Route::get('/payment/url', [PaymentController::class, 'paymentGatewayConfiguration']);

            Route::prefix('feature')->group(function () {
                Route::get('/{id}', [FeatureController::class, 'getFeature']);
                Route::get('delete/{id}', [FeatureController::class, 'delete']);
                Route::post('delete', [FeatureController::class, 'deleteMultiple']);
                Route::post('store', [FeatureController::class, 'store']);
                Route::put('store', [FeatureController::class, 'store']);
                Route::get('/', [FeatureController::class, 'list']);
            });
            Route::prefix('storage')->group(function () {
                Route::get('/{id}', [StorageSizeController::class, 'getData']);
                Route::post('store', [StorageSizeController::class, 'store']);
                Route::put('store', [StorageSizeController::class, 'store']);
                Route::get('/', [StorageSizeController::class, 'list']);
            });
            Route::prefix('validity')->group(function () {
                Route::get('/{id}', [ValidityController::class, 'getData']);
                Route::post('store', [ValidityController::class, 'store']);
                Route::put('store', [ValidityController::class, 'store']);
                Route::get('/', [ValidityController::class, 'list']);
            });

            Route::prefix('coupon')->group(function () {
                Route::get('/{id}', [CouponController::class, 'getCoupon']);
                Route::get('delete/{id}', [CouponController::class, 'delete']);
                Route::post('delete/multiple', [CouponController::class, 'deleteMultiple']);
                Route::post('store', [CouponController::class, 'store']);
                Route::put('store', [CouponController::class, 'store']);
                Route::get('/', [CouponController::class, 'list']);
            });

            Route::prefix('organization')->group(function () {
                Route::get('list', [OrganizationController::class, 'organizationList']);
                Route::post('store', [OrganizationController::class, 'store']);
                Route::get('/{id}', [OrganizationController::class, 'getOrganization']);
                Route::get('delete/{id}', [OrganizationController::class, 'delete']);
                Route::post('delete', [OrganizationController::class, 'deleteMultiple']);

                Route::put('store', [OrganizationController::class, 'store']);
                Route::get('/', [OrganizationController::class, 'list']);
            });

            Route::prefix('user')->group(function () {
                Route::post('store', [UserController::class, 'store']);
                Route::get('/me', [UserController::class, 'me']);
                Route::get('/{id}', [UserController::class, 'getUser']);
                Route::get('delete/{id}', [UserController::class, 'delete']);
                Route::post('delete', [UserController::class, 'deleteMultiple']);
                Route::put('store', [UserController::class, 'store']);
                Route::post('organization/update', [OrganizationController::class, 'organizationUpdate']);
                Route::get('/', [UserController::class, 'list']);
                Route::prefix('update')->group(function () {
                    Route::post('profile', [UserController::class, 'profileUpdate']);
                    Route::post('password', [UserController::class, 'passwordUpdate']);
                });
            });

            Route::prefix('organization-details')->group(function () {
                Route::get('/', [UserController::class, 'organization']);
                Route::get('/details', [UserController::class, 'organizationSubDetails']);
            });

            Route::prefix('report')->group(function () {
                Route::get('subscription-plan', [ReportController::class, 'subscriptionPlan']);
                Route::get('organization', [ReportController::class, 'organization']);
                Route::get('organization/{id}', [ReportController::class, 'organizationDetails']);
                Route::get('users', [ReportController::class, 'users']);
                Route::get('user/{id}', [ReportController::class, 'userDetails']);
            });

            Route::get('activity', [ActivityController::class, 'list']);
            Route::get('activity/{id}', [ActivityController::class, 'details']);
            Route::get('models', [ActivityController::class, 'modelList']);
            Route::get('logout', [UserController::class, 'logout']);

            //Only super Admin will get access of the above routes

            Route::get('users', function () {
                // dd(auth()->user());
            });
            Route::post('usersData', [UserController::class, 'storeData']);
            Route::get('/setting', [SettingController::class, 'getSettings']);
            Route::get('global/setting', [SettingController::class, 'getGlobalSettings']);
            Route::post('/setting/update', [SettingController::class, 'store']);

            Route::get('auth-check', [UserController::class, 'authCheck']);
        });
    });
});

Route::post('create-database', [DynamicDatabaseController::class, 'createDatabase']);
