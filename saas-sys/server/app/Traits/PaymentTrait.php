<?php

namespace App\Traits;

use App\Models\RefundReferences;
use Illuminate\Support\Facades\Auth;

trait PaymentTrait {
    use MailTrait;

    public function paymentGatewayConfiguration($data) {
        //        $store_id = 'cattl6519ad5ac55ab';
        //        $store_passwd = 'cattl6519ad5ac55ab@ssl';
        $store_id = env('SSL_STORE_ID');
        $store_passwd = env('SSL_STORE_PASSWORD');

        $user = Auth::user();

        $post_data = [];
        $post_data['store_id'] = $store_id;
        $post_data['store_passwd'] = $store_passwd;
        $post_data['total_amount'] = $data['sell_amount'];
        $post_data['currency'] = 'BDT';
        $post_data['tran_id'] = $data['purchase_id'];
        $post_data['success_url'] = env('APP_URL').'/api/v1/payment/success';
        $post_data['fail_url'] = env('APP_URL').'/api/v1/payment/failed';
        $post_data['cancel_url'] = env('APP_URL').'/api/v1/payment/failed';
        // $post_data['multi_card_name'] = "mastercard,visacard,amexcard";  # DISABLE TO DISPLAY ALL AVAILABLE

        // CUSTOMER INFORMATION
        $post_data['cus_name'] = $user->name;
        $post_data['cus_email'] = $user->email;
        $post_data['cus_phone'] = $user->mobile;

        // CART PARAMETERS
        $post_data['cart'] = json_encode([
            ['product' => $data['product_name'], 'amount' => $data['sell_amount']],
        ]);
        $post_data['product_amount'] = $data['total_amount'];
        $post_data['vat'] = '0';
        $post_data['discount_amount'] = $data['discount_amount'];
        $post_data['convenience_fee'] = '0';

        //        $direct_api_url = "https://sandbox.sslcommerz.com/gwprocess/v3/api.php";
        $direct_api_url = env('SSL_PAYMENT_URL');

        $handle = curl_init();
        curl_setopt($handle, CURLOPT_URL, $direct_api_url);
        curl_setopt($handle, CURLOPT_TIMEOUT, 30);
        curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($handle, CURLOPT_POST, 1);
        curl_setopt($handle, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false); // KEEP IT FALSE IF YOU RUN FROM LOCAL PC

        $content = curl_exec($handle);

        $code = curl_getinfo($handle, CURLINFO_HTTP_CODE);

        if ($code == 200 && ! (curl_errno($handle))) {
            curl_close($handle);
            $sslcommerzResponse = $content;
        } else {
            curl_close($handle);
            echo 'FAILED TO CONNECT WITH SSLCOMMERZ API';
            exit;
        }

        // PARSE THE JSON RESPONSE
        $sslcz = json_decode($sslcommerzResponse, true);

        if (isset($sslcz['GatewayPageURL']) && $sslcz['GatewayPageURL'] != '') {
            return ['status' => true, 'url' => $sslcz['GatewayPageURL']];
        // THERE ARE MANY WAYS TO REDIRECT - Javascript, Meta Tag or Php Header Redirect or Other
        // echo "<script>window.location.href = '". $sslcz['GatewayPageURL'] ."';</script>";
        //echo "<meta http-equiv='refresh' content='0;url=".$sslcz['GatewayPageURL']."'>";
        // header("Location: ". $sslcz['GatewayPageURL']);
        // exit;
        } else {
            return ['status' => false];
        }
    }

    public function refundPayment($data) {
        $bank_tran_id = urlencode($data['bank_tran_id']);
        $store_id = urlencode(env('SSL_STORE_ID'));
        $store_passwd = urlencode(env('SSL_STORE_PASSWORD'));
        $refund_amount = urlencode($data['refund_amount']);
        $refund_remarks = urlencode($data['refund_remarks']);

        //        $requested_url = ("https://sandbox.sslcommerz.com/validator/api/merchantTransIDvalidationAPI.php?bank_tran_id=".
        //            $bank_tran_id."&store_id=".$store_id."&store_passwd=".$store_passwd."&refund_amount=".$refund_amount.
        //            "&refund_remarks=".$refund_remarks."&v=1&format=json");

        $requested_url = (env('SSL_REFUND_URL').'?bank_tran_id='.
            $bank_tran_id.'&store_id='.$store_id.'&store_passwd='.$store_passwd.'&refund_amount='.$refund_amount.
            '&refund_remarks='.$refund_remarks.'&v=1&format=json');

        $handle = curl_init();
        curl_setopt($handle, CURLOPT_URL, $requested_url);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false); // IF YOU RUN FROM LOCAL PC
        curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false); // IF YOU RUN FROM LOCAL PC

        $result = curl_exec($handle);

        $code = curl_getinfo($handle, CURLINFO_HTTP_CODE);

        if ($code == 200 && ! (curl_errno($handle))) {
            $decodedResult = json_decode($result);

            $refund = RefundReferences::create([
                'APIConnect' => $decodedResult->APIConnect,
                'bank_tran_id' => $decodedResult->bank_tran_id ?? null,
                'tran_id' => $decodedResult->trans_id,
                'refund_ref_id' => $decodedResult->refund_ref_id ?? '',
                'status' => $decodedResult->status,
                'errorReason' => $decodedResult->errorReason ?? null,
                'cancel_request_id' => $data['cancel_request_id'],
                'created_by' => Auth::id(),
            ]);

            return ['status' => $decodedResult->status, 'data' => $refund];
        }
    }

    public function invoiceSend($id) {
    }
}
