<?php

use App\Http\Controllers\PurchaseSmsController;
use App\Http\Controllers\SslCommerzPaymentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
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

Route::get('/example1', [SslCommerzPaymentController::class, 'exampleEasyCheckout']);
Route::get('/example2', [SslCommerzPaymentController::class, 'exampleHostedCheckout']);
Route::post('/success-sms', [SslCommerzPaymentController::class, 'success']);
Route::post('/fail-sms', [SslCommerzPaymentController::class, 'fail']);
Route::post('/cancel-sms', [SslCommerzPaymentController::class, 'cancel']);
Route::post('/ipn', [SslCommerzPaymentController::class, 'ipn']);
Route::post('/pay', [SslCommerzPaymentController::class, 'index']);
Route::post('/pay-via-ajax', [SslCommerzPaymentController::class, 'payViaAjax']);
Route::get('/payment-error', [SslCommerzPaymentController::class, 'paymentError']);
Route::get('/payment-success/{id}', [SslCommerzPaymentController::class, 'paymentSuccess']);

Route::get('test', [TestController::class, 'test']);
Route::get('pdf', [TestController::class, 'pdf']);


Route::get('/', function () {

    return view('emails/invoice');
});
Route::get('/send-email', [\App\Http\Controllers\UserController::class, 'sendMail']);
