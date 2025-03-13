<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Library\SslCommerz\SslCommerzNotification;
use App\Models\SMSGateway;
use Carbon\Carbon;

class SslCommerzPaymentController extends Controller
{

    // public function exampleEasyCheckout()
    // {
    //     return view('exampleEasycheckout');
    // }

    // pucblic function exampleHostedCheckout()

    // public function exampleHostedCheckout()
    // {
    //     return view('exampleHosted');
    // }
    public function paymentError()
    {

        return view('paymentError');
    }
    public function paymentSuccess($id)
    {

        return view('paymentSuccess', compact('id'));
    }
    public function index(Request $request)
    {

        $package = SMSGateway::find($request->package_id);
        // return  response()->json($package);
        $post_data = array();
        $post_data['total_amount'] = $package->price;
        $post_data['currency'] = $package->currency;
        $post_data['tran_id'] = uniqid();

        $post_data['cus_name'] = $request->organization_name;
        $post_data['cus_email'] = $request->email;
        $post_data['cus_add1'] = $request->organization_address;
        $post_data['cus_country'] = "Bangladesh";
        $post_data['cus_phone'] = $request->phone_number;

        $post_data['ship_name'] = "MacroHealthplus";
        $post_data['ship_add1'] = "Dhaka";
        $post_data['ship_city'] = "Dhaka";
        $post_data['ship_postcode'] = "1000";
        $post_data['ship_country'] = "Bangladesh";

        $post_data['shipping_method'] = "NO";
        $post_data['product_name'] = $package->title;
        $post_data['product_category'] = "sms";
        $post_data['product_profile'] = "physical-goods";

        $post_data['value_a'] = "ref001";
        $post_data['value_b'] = "ref002";
        $post_data['value_c'] = "ref003";
        $post_data['value_d'] = "ref004";
        $providedDate = $request->expire_date;
        $currentDateTime = Carbon::now();

        // Concatenate provided date with current time
        $dateTimeString = Carbon::parse($providedDate)->toDateString() . ' ' . $currentDateTime->toTimeString();

        $update_product = DB::table('orders')
            ->where('transaction_id', $post_data['tran_id'])
            ->updateOrInsert([
                'name' => $post_data['cus_name'],
                'email' => $post_data['cus_email'],
                'phone' => $post_data['cus_phone'],
                'amount' => $post_data['total_amount'],
                'status' => 'Pending',
                'address' => $post_data['cus_add1'],
                'transaction_id' => $post_data['tran_id'],
                'currency' => $post_data['currency'],
                "organization_id" => $request->organization_id,
                "package_id" => $package->id,
                "organization_name" => $request->organization_name,
                "package_name" => $package->title,
                "buy_total_sms" => $package->buy_sms_count,
                "total_use_sms" => 0,
                "total_available_sms" => $package->buy_sms_count,
                "expire_date" => $dateTimeString,
                "created_at" => now(),

            ]);

        $sslc = new SslCommerzNotification();
        $payment_options = $sslc->makePayment($post_data, 'checkout', 'json');

        return response()->json($payment_options);
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

    public function payViaAjax(Request $request)
    {

        # Here you have to receive all the order data to initate the payment.
        # Lets your oder trnsaction informations are saving in a table called "orders"
        # In orders table order uniq identity is "transaction_id","status" field contain status of the transaction, "amount" is the order amount to be paid and "currency" is for storing Site Currency which will be checked with paid currency.

        $post_data = array();
        $post_data['total_amount'] = '10'; # You cant not pay less than 10
        $post_data['currency'] = "BDT";
        $post_data['tran_id'] = uniqid(); // tran_id must be unique

        # CUSTOMER INFORMATION
        $post_data['cus_name'] = 'Customer Name';
        $post_data['cus_email'] = 'customer@mail.com';
        $post_data['cus_add1'] = 'Customer Address';
        $post_data['cus_add2'] = "";
        $post_data['cus_city'] = "";
        $post_data['cus_state'] = "";
        $post_data['cus_postcode'] = "";
        $post_data['cus_country'] = "Bangladesh";
        $post_data['cus_phone'] = '8801XXXXXXXXX';
        $post_data['cus_fax'] = "";

        # SHIPMENT INFORMATION
        $post_data['ship_name'] = "Store Test";
        $post_data['ship_add1'] = "Dhaka";
        $post_data['ship_add2'] = "Dhaka";
        $post_data['ship_city'] = "Dhaka";
        $post_data['ship_state'] = "Dhaka";
        $post_data['ship_postcode'] = "1000";
        $post_data['ship_phone'] = "";
        $post_data['ship_country'] = "Bangladesh";

        $post_data['shipping_method'] = "NO";
        $post_data['product_name'] = "Computer";
        $post_data['product_category'] = "Goods";
        $post_data['product_profile'] = "physical-goods";

        # OPTIONAL PARAMETERS
        $post_data['value_a'] = "ref001";
        $post_data['value_b'] = "ref002";
        $post_data['value_c'] = "ref003";
        $post_data['value_d'] = "ref004";


        #Before  going to initiate the payment order status need to update as Pending.
        $update_product = DB::table('orders')
            ->where('transaction_id', $post_data['tran_id'])
            ->updateOrInsert([
                'name' => $post_data['cus_name'],
                'email' => $post_data['cus_email'],
                'phone' => $post_data['cus_phone'],
                'amount' => $post_data['total_amount'],
                'status' => 'Pending',
                'address' => $post_data['cus_add1'],
                'transaction_id' => $post_data['tran_id'],
                'currency' => $post_data['currency']
            ]);

        $sslc = new SslCommerzNotification();
        # initiate(Transaction Data , false: Redirect to SSLCOMMERZ gateway/ true: Show all the Payement gateway here )
        $payment_options = $sslc->makePayment($post_data, 'checkout', 'json');

        if (!is_array($payment_options)) {
            print_r($payment_options);
            $payment_options = array();
        }
    }

    public function success(Request $request)
    {
        // echo "Transaction is Successful";

        $tran_id = $request->input('tran_id');
        $amount = $request->input('amount');
        $currency = $request->input('currency');
        // echo "Transaction ID = " . $tran_id . " and currency = " . $currency . " and amount = " . $amount;

        $sslc = new SslCommerzNotification();

        #Check order status in order tabel against the transaction id or order id.
        $order_details = DB::table('orders')
            ->where('transaction_id', $tran_id)
            ->select('transaction_id', 'status', 'currency', 'amount')->first();

        if ($order_details->status == 'Pending') {
            $validation = $sslc->orderValidate($request->all(), $tran_id, $amount, $currency);

            if ($validation) {
                // echo "Validated";
                /*
                That means IPN did not work or IPN URL was not set in your merchant panel. Here you need to update order status
                in order table as Processing or Complete.
                Here you can also sent sms or email for successful transaction to customer
                */
                $update_product = DB::table('orders')
                    ->where('transaction_id', $tran_id)
                    ->update(['status' => 'Processing']);

                return redirect("/payment-success/" . $tran_id);
            }
        } else if ($order_details->status == 'Processing' || $order_details->status == 'Complete') {
            /*
             That means through IPN Order status already updated. Now you can just show the customer that transaction is completed. No need to udate database.
             */
            return redirect("/payment-success/" . $tran_id);
        } else {
            #That means something wrong happened. You can redirect customer to your product page.
            return view('paymentError');
        }
    }

    public function fail(Request $request)
    {
        $tran_id = $request->input('tran_id');

        $order_details = DB::table('orders')
            ->where('transaction_id', $tran_id)
            ->select('transaction_id', 'status', 'currency', 'amount')->first();

        if ($order_details->status == 'Pending') {
            $update_product = DB::table('orders')
                ->where('transaction_id', $tran_id)
                ->update(['status' => 'Failed']);
            return redirect("/payment-error");
        } else if ($order_details->status == 'Processing' || $order_details->status == 'Complete') {
            return redirect("/payment-error");
        } else {
            return redirect("/payment-error");
        }
    }

    public function cancel(Request $request)
    {
        $tran_id = $request->input('tran_id');

        $order_details = DB::table('orders')
            ->where('transaction_id', $tran_id)
            ->select('transaction_id', 'status', 'currency', 'amount')->first();

        if ($order_details->status == 'Pending') {
            $update_product = DB::table('orders')
                ->where('transaction_id', $tran_id)
                ->update(['status' => 'Canceled']);
            echo "Transaction is Cancel";
        } else if ($order_details->status == 'Processing' || $order_details->status == 'Complete') {
            echo "Transaction is already Successful";
        } else {
            echo "Transaction is Invalid";
        }
    }

    public function getAllTransaction()
    {
        $transactions = DB::table('orders')
            ->where('status', 'Processing')
            ->orderByDesc('id')
            ->get();
        foreach ($transactions as $transaction) {
            $organization = DB::table('users')->where('id', $transaction->organization_id)->first();
            $transaction->organization_details = $organization;
        }

        return response()->json($transactions, 200);
    }

    public function getTransaction($id)
    {
        // Filter records with 'organization_id' and 'expire_date' equal to or greater than current date and time
        $transactionWithExpireDate = DB::table('orders')
            ->where('organization_id', $id) // Assuming $id is the organization ID you want to filter by
            ->where("status", "Processing")
            ->orderByDesc('id')
            ->get();

        // Filter records with 'expire_date' not equal to current date and time
        $transactionWithoutExpireDate = DB::table('orders')
            ->where('organization_id', $id)
            ->where("status", "Processing")
            ->whereDate('expire_date', '>', now()->toDateString())
            ->orderByDesc('id')
            ->get();

        $data = [
            'transactionWithExpireDate' => $transactionWithExpireDate,
            'transactionWithoutExpireDate' => $transactionWithoutExpireDate,
        ];

        return response()->json($data, 200);
    }

    public function ipn(Request $request)
    {
        #Received all the payement information from the gateway
        if ($request->input('tran_id')) #Check transation id is posted or not.
        {

            $tran_id = $request->input('tran_id');

            #Check order status in order tabel against the transaction id or order id.
            $order_details = DB::table('orders')
                ->where('transaction_id', $tran_id)
                ->select('transaction_id', 'status', 'currency', 'amount')->first();

            if ($order_details->status == 'Pending') {
                $sslc = new SslCommerzNotification();
                $validation = $sslc->orderValidate($request->all(), $tran_id, $order_details->amount, $order_details->currency);
                if ($validation == TRUE) {
                    /*
                    That means IPN worked. Here you need to update order status
                    in order table as Processing or Complete.
                    Here you can also sent sms or email for successful transaction to customer
                    */
                    $update_product = DB::table('orders')
                        ->where('transaction_id', $tran_id)
                        ->update(['status' => 'Processing']);

                    echo "Transaction is successfully Completed";
                }
            } else if ($order_details->status == 'Processing' || $order_details->status == 'Complete') {

                #That means Order status already updated. No need to udate database.

                echo "Transaction is already successfully Completed";
            } else {
                #That means something wrong happened. You can redirect customer to your product page.

                echo "Invalid Transaction";
            }
        } else {
            echo "Invalid Data";
        }
    }
}
