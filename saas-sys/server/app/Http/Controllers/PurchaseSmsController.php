<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\PurchaseSms;
use App\Models\SMSGateway;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Traits\PaymentTrait;
use App\Library\SslCommerz\SslCommerzNotification;


class PurchaseSmsController extends Controller
{
    // use PaymentTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     //
    // }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function store(Request $request)
    // {
    //     DB::beginTransaction();
    //     // try {
    //     $validatedData = $request->validate([
    //         'organization_id' => 'required',
    //         'package_id' => 'required',
    //         'phone_number' => 'required',
    //         'expire_date' => 'required',
    //         'organization_name' => 'required',
    //         'package_name' => 'required',
    //         'expire_date' => 'required',
    //     ]);

    //     $package = SMSGateway::find($validatedData['package_id']);

    //     if (!$package) {
    //         return response()->json(['error' => 'Package not found', 'code' => 404], 404);
    //     }

    //     $purchaseData = [
    //         'organization_id' => $validatedData['organization_id'],
    //         'user_id' => $validatedData['organization_id'],
    //         'package_id' => $package->id,
    //         'package_name' => $package->name,
    //         'phone_number' => $validatedData['phone_number'],
    //         'total_sms_count' => $package->buy_sms_count,
    //         'available_sms_count' => $package->buy_sms_count,
    //         'used_sms_count' => 0,
    //         'expire_date' => $validatedData['expire_date'],
    //         'price' => $package->price,
    //         'currency' => $package->currency

    //     ];

    //     // Assuming purchaseRepository is injected via constructor
    //     $purchase = $this->purchaseRepository->create($purchaseData);
    //     $data = [
    //         'product_name' => $package->name,
    //         'sell_amount' => $package->price,
    //         'total_amount' => $package->price,
    //         'discount_amount' => floatval($package->price) - floatval($package->price),
    //         'purchase_id' => $validatedData['organization_id'],
    //     ];
    //     $paymentUrl = $this->paymentGatewayConfiguration($data);
    //     if ($paymentUrl['status']) {
    //         DB::commit();

    //         return $this->successResponse(['url' => $paymentUrl['url']]);
    //     }
    //     DB::rollBack();

    //     return $this->errorResponse((object) [], 'Purchase failed');



    //     // return response()->json(['purchaseData' => $purchaseData, 'code' => 200], 200);
    //     // } catch (\Throwable $th) {
    //     //     Log::error($th->getMessage());
    //     //     DB::rollback();
    //     //     return response()->json(['error' => $th->getMessage(), 'code' => 400], 400);
    //     // }
    // }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PurchaseSms  $purchaseSms
     * @return \Illuminate\Http\Response
     */
    public function show(PurchaseSms $purchaseSms)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PurchaseSms  $purchaseSms
     * @return \Illuminate\Http\Response
     */
    public function edit(PurchaseSms $purchaseSms)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PurchaseSms  $purchaseSms
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PurchaseSms $purchaseSms)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PurchaseSms  $purchaseSms
     * @return \Illuminate\Http\Response
     */
    public function destroy(PurchaseSms $purchaseSms)
    {
        //
    }


    // public function index(Request $request)
    // {
    //     # Here you have to receive all the order data to initate the payment.
    //     # Let's say, your oder transaction informations are saving in a table called "orders"
    //     # In "orders" table, order unique identity is "transaction_id". "status" field contain status of the transaction, "amount" is the order amount to be paid and "currency" is for storing Site Currency which will be checked with paid currency.

    //     $post_data = array();
    //     $post_data['total_amount'] = '10'; # You cant not pay less than 10
    //     $post_data['currency'] = "BDT";
    //     $post_data['tran_id'] = uniqid(); // tran_id must be unique

    //     # CUSTOMER INFORMATION
    //     $post_data['cus_name'] = 'Customer Name';
    //     $post_data['cus_email'] = 'customer@mail.com';
    //     $post_data['cus_add1'] = 'Customer Address';
    //     $post_data['cus_add2'] = "";
    //     $post_data['cus_city'] = "";
    //     $post_data['cus_state'] = "";
    //     $post_data['cus_postcode'] = "";
    //     $post_data['cus_country'] = "Bangladesh";
    //     $post_data['cus_phone'] = '8801XXXXXXXXX';
    //     $post_data['cus_fax'] = "";

    //     # SHIPMENT INFORMATION
    //     $post_data['ship_name'] = "Store Test";
    //     $post_data['ship_add1'] = "Dhaka";
    //     $post_data['ship_add2'] = "Dhaka";
    //     $post_data['ship_city'] = "Dhaka";
    //     $post_data['ship_state'] = "Dhaka";
    //     $post_data['ship_postcode'] = "1000";
    //     $post_data['ship_phone'] = "";
    //     $post_data['ship_country'] = "Bangladesh";

    //     $post_data['shipping_method'] = "NO";
    //     $post_data['product_name'] = "Computer";
    //     $post_data['product_category'] = "Goods";
    //     $post_data['product_profile'] = "physical-goods";

    //     # OPTIONAL PARAMETERS
    //     $post_data['value_a'] = "ref001";
    //     $post_data['value_b'] = "ref002";
    //     $post_data['value_c'] = "ref003";
    //     $post_data['value_d'] = "ref004";

    //     #Before  going to initiate the payment order status need to insert or update as Pending.
    //     $update_product = DB::table('orders')
    //         ->where('transaction_id', $post_data['tran_id'])
    //         ->updateOrInsert([
    //             'name' => $post_data['cus_name'],
    //             'email' => $post_data['cus_email'],
    //             'phone' => $post_data['cus_phone'],
    //             'amount' => $post_data['total_amount'],
    //             'status' => 'Pending',
    //             'address' => $post_data['cus_add1'],
    //             'transaction_id' => $post_data['tran_id'],
    //             'currency' => $post_data['currency']
    //         ]);

    //     $sslc = new SslCommerzNotification();
    //     # initiate(Transaction Data , false: Redirect to SSLCOMMERZ gateway/ true: Show all the Payement gateway here )
    //     $payment_options = $sslc->makePayment($post_data, 'hosted');

    //     if (!is_array($payment_options)) {
    //         print_r($payment_options);
    //         $payment_options = array();
    //     }
    // }
    public function initiatePayment(Request $request)
    {
        $validatedData = $request->validate([
            'organization_id' => 'required',
            'package_id' => 'required',
            'phone_number' => 'required',
            'expire_date' => 'required',
            'organization_name' => 'required',
            'package_name' => 'required',
        ]);

        $package = SMSGateway::find($validatedData['package_id']);

        $post_data = [
            'total_amount' => $package->price,
            'price' => $package->price,
            'currency' => $package->currency,
            'tran_id' => uniqid(),
            'cus_name' => $validatedData['organization_name'],
            'cus_email' => $request->email,
            'cus_add1' => 'Customer Address',
            'cus_country' => 'Bangladesh',
            'cus_phone' => $validatedData['phone_number'],
            'ship_name' => 'Store Test',
            'ship_add1' => 'Dhaka',
            'ship_city' => 'Dhaka',
            'ship_postcode' => '1000',
            'ship_country' => 'Bangladesh',
            'shipping_method' => 'NO',
            'product_name' => 'Computer',
            'product_category' => 'Goods',
            'product_profile' => 'physical-goods',
            'value_a' => 'ref001',
            'value_b' => 'ref002',
            'value_c' => 'ref003',
            'value_d' => 'ref004',
        ];

        DB::beginTransaction();

        try {
            // Insert or update purchase record with Pending status

            $sslc = new SslCommerzNotification();
            $payment_options = $sslc->makePayment($post_data, 'checkout', 'json');
            DB::commit();
            $purchase = PurchaseSms::create(
                [
                    'package_id' => $validatedData['package_id'],
                    'transaction_id' => $post_data['tran_id'],
                    'organization_id' => $validatedData['organization_id'],
                    'package_name' => $validatedData['package_name'],
                    'phone_number' => $validatedData['phone_number'],
                    'expire_date' => $validatedData['expire_date'],
                    'total_sms_count' => $package->buy_sms_count,
                    'available_sms_count' => $package->buy_sms_count,
                    'used_sms_count' => 0,
                    'status' => 'Pending',
                ]
            );

            $payment_options['purchase'] = $purchase;

            return response()->json($payment_options);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function paymentCallback(Request $request)
    {
        $validatedData = $request->validate([
            'tran_id' => 'required',
            'status' => 'required',
            'amount' => 'required',
            'currency' => 'required',
        ]);

        $tranId = $validatedData['tran_id'];
        $status = strtoupper($validatedData['status']);
        $amount = $validatedData['amount'];
        $currency = $validatedData['currency'];

        $transaction = PurchaseSms::where('transaction_id', $tranId)->first();

        if (!$transaction) {
            return response()->json(['error' => 'Transaction not found'], 404);
        }

        // Check if the transaction status needs to be updated
        switch ($status) {
            case 'VALID':
            case 'VALIDATED':
                // Transaction is valid, update its status to successful
                $transaction->status = 'Success';
                break;
            case 'FAILED':
            case 'CANCELLED':
                // Transaction failed or canceled, update its status accordingly
                $transaction->status = 'Failed';
                break;
            default:
                // Invalid status, handle the error
                return response()->json(['error' => 'Invalid transaction status'], 400);
        }

        // Save the updated transaction status
        $transaction->save();

        // Return a response based on the callback status
        if (in_array($status, ['VALID', 'VALIDATED'])) {
            // Transaction is successful, return a success response
            return response()->json(['message' => 'Transaction successful'], 200);
        } else {
            // Transaction failed or canceled, return an error response
            return response()->json(['error' => 'Transaction failed'], 400);
        }
    }

    public function success(Request $request)
    {

        // return response()->json(['request' => $request->all()]);

        $validatedData = $request->validate([
            'tran_id' => 'required',
            'status' => 'required',
            'amount' => 'required',
            'currency' => 'required',
        ]);

        $tranId = $validatedData['tran_id'];
        $status = strtoupper($validatedData['status']);
        $transaction = PurchaseSms::where('transaction_id', $tranId)->first();

        if (!$transaction) {
            return response()->json(['error' => 'Transaction not found'], 404);
        }

        if ($status == 'SUCCESS') {
            $transaction->status = 'Success';
        } else {
            $transaction->status = 'Failed';
        }

        $transaction->save();
        return response()->json($transaction);
    }

    public function fail(Request $request)
    {
        $validatedData = $request->validate([
            'tran_id' => 'required',
            'status' => 'required',
            'amount' => 'required',
            'currency' => 'required',
        ]);

        $tranId = $validatedData['tran_id'];
        $status = strtoupper($validatedData['status']);
        $transaction = PurchaseSms::where('transaction_id', $tranId)->first();

        if (!$transaction) {
            return response()->json(['error' => 'Transaction not found'], 404);
        }
        $sslc = new SslCommerzNotification();
        $validation = $sslc->orderValidate($request->all(), $tranId, $transaction->price, $transaction->currency);

        if ($validation) {
            $transaction->status = "Success";
        } else {
            $transaction->status = "Failed";
        }
        $transaction->save();
        return response()->json($transaction);
    }

    public function cancel(Request $request)
    {

        $transactionId = $request->tran_id;

        $transaction = PurchaseSms::where('transaction_id', $transactionId)->first();

        if ($transaction) {
            $transaction->status = "Canceled";
            $transaction->save();
        } else {
            return response()->json(['error' => 'Transaction not found'], 404);
        }


        return response()->json(['message' => 'Transaction canceled']);
    }

    public function ipn(Request $request)
    {
        #Received all the payement information from the gateway
        if ($request->organization_id) #Check transation id is posted or not.
        {

            $tran_id = $request->organization_id;

            #Check order status in order tabel against the transaction id or order id.
            $order_details = DB::table('purchase_sms')
                ->where('transaction_id', $tran_id)
                ->select('transaction_id', 'status')->first();

            if ($order_details->status == 'Pending') {
                $sslc = new SslCommerzNotification();
                $validation = $sslc->orderValidate($request->all(), $tran_id, $order_details->amount, $order_details->currency);
                if ($validation == TRUE) {
                    /*
                    That means IPN worked. Here you need to update order status
                    in order table as Processing or Complete.
                    Here you can also sent sms or email for successful transaction to customer
                    */
                    $update_product = DB::table('purchase_sms')
                        ->where('transaction_id', $tran_id)
                        ->update(['status' => 'Processing']);


                    return response('Success', 200);
                }
            } else if ($order_details->status == 'Processing' || $order_details->status == 'Complete') {

                #That means Order status already updated. No need to udate database.


                return response('Success', 200);
            } else {
                #That means something wrong happened. You can redirect customer to your product page.

                return  response('Invalid Data', 404);
            }
        } else {
            return  response('Invalid Data', 404);
        }
    }
}
