<?php

namespace App\Http\Controllers;

use App\Jobs\DatabaseImportJob;
use App\Repository\UserRepositoryInterface;
use Illuminate\Http\Request;
use PDF;

class TestController extends BaseController {
    public function __construct(UserRepositoryInterface $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function test() {
        $checkEmailDuplication = $this->userRepository->findByEmail('user@gmail.com');

        return $checkEmailDuplication;
    }

    public function pdf() {
        DatabaseImportJob::dispatch(['point' => 'Dtaa']);
        /*
                $purchase = Purchase::with(['subscriptionPlan', 'coupon', 'user', 'user.organization'])
                    ->find(4);

                $setting = Setting::where('id',1)->get('currency');
                $pdf = PDF::loadView('emails.pdf.invoice', ['purchase' => $purchase, 'setting'=>$setting[0]]);

                $testMailData = [
                    'title' => 'New subscription plan activated',
                    'user' => $purchase->user->name,
        //            'email' => $purchase->user->email,
                    'email' => 'kajolchaki@gmail.com',

                ];

                Mail::send('emails.invoice', $testMailData, function($message)use( $pdf,$testMailData) {
                    $message->to($testMailData['email'])
                        ->subject('Payment Invoice')
                        ->attachData($pdf->output(), "invoice.pdf");
                });*/

        return ['status' => true, 'message' => 'success'];
    }

    public function requestTest(Request $request) {

        $data = [
            'refer'=> request()->header('Referer'),
            'origin' => request()->header('Origin'),
            'ip' => request()->ip(),
            'host' =>$request->getHost(),
            'allCookies' => request()->cookies->all(),
            'specificCookie' => request()->cookie('cookie_name'),
            'sessionId' => session()->getId(),
            'userAgent' => request()->header('User-Agent'),
            'browserIdentifier' => request()->cookie('browser_identifier')

        ];

        return json_encode($data);
    }
}
