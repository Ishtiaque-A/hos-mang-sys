<?php

// SSLCommerz configuration

$apiDomain = env('SSL_TESTMODE') ? "https://sandbox.sslcommerz.com" : "https://securepay.sslcommerz.com";
return [
	'apiCredentials' => [
		'store_id' => env("SSL_STORE_ID"),
		'store_password' => env("SSL_STORE_PASSWORD"),
	],
	'apiUrl' => [
		'make_payment' => "/gwprocess/v4/api.php",
		'transaction_status' => "/validator/api/merchantTransIDvalidationAPI.php",
		'order_validate' => "/validator/api/validationserverAPI.php",
		'refund_payment' => "/validator/api/merchantTransIDvalidationAPI.php",
		'refund_status' => "/validator/api/merchantTransIDvalidationAPI.php",
	],
	'apiDomain' => $apiDomain,
	'connect_from_localhost' => true, // For Sandbox, use "true", For Live, use "false"
	// 'success_url' => '/success-sms',
	'success_url' => env('SSL_TESTMODE') ? 'http://localhost:8000/success-sms' : '/success-sms',
	'failed_url' => '/fail-sms',
	'cancel_url' => '/cancel-sms',
	'ipn_url' => '/ipn-sms',
];
