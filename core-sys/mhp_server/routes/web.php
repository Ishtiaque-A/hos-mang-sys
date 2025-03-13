<?php

use App\Http\Controllers\AdminSetupAppointment\Radiology\RadiologyController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminSetupDoctors\GreatDocPathologyController;
use App\Http\Controllers\MHPAdviseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get("/test-template", [GreatDocPathologyController::class, "mailTemplate"]);
Route::get("/test-template-radiology", [RadiologyController::class, "emailToPatient"]);
Route::get("/generate-pdf/{patient_id}", [GreatDocPathologyController::class, "generatePdf"]);
Route::get("/generate-prescription-pdf", [MHPAdviseController::class, "generatePrescriptionPdf"]);
Route::get("/generate-prescription-pdf-2", [MHPAdviseController::class, "generatePrescriptionPdf2"]);
Route::get('radiology-test', [RadiologyController::class, 'generateMPDFStatic']);

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::prefix('/admin')->namespace('App\Http\Controllers\Admin')->group(function () {

    // all admin routes are here
    Route::match(['get', 'post'], '/', 'AdminController@login');

    Route::group(['middleware' => ['admin']], function () {

        Route::get('dashboard', 'AdminController@dashboard');

        Route::get('logout', 'AdminController@logout');

        Route::get('settings', 'AdminController@settings');

        Route::post('admin_update_password', 'AdminController@chkCurrentPassword');

        Route::post('admins_update_password', 'AdminController@updateCurrentPassword');

        Route::match(['get', 'post'], 'admin_details_update', 'AdminController@admin_details_update');
    });
});
