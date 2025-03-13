<?php
namespace App\Traits;

use App\Models\Purchase;
use App\Models\Setting;
use Illuminate\Support\Facades\Mail;
use PDF;


trait MailTrait
{
  public function invoiceSend($id){
      $purchase = Purchase::with(['subscriptionPlan', 'coupon', 'user', 'user.organization'])
          ->find($id);

      $setting = Setting::where('id',1)->get('currency');
      $pdf = PDF::loadView('emails.pdf.invoice', ['purchase' => $purchase, 'setting'=>$setting[0]]);

      $testMailData = [
          'title' => 'New subscription plan activated',
          'user' => $purchase->user->name,
          'email' => $purchase->user->email,
//          'email' => 'kajolchaki@gmail.com',

      ];

      Mail::send('emails.invoice', $testMailData, function($message)use( $pdf,$testMailData) {
          $message->to($testMailData['email'])
              ->subject('Payment Invoice')
              ->attachData($pdf->output(), "invoice.pdf");
      });

      return ['status'=>true,'message'=>'success'];
  }


}
