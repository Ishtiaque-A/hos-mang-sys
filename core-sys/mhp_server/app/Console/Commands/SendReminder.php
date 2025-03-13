<?php

namespace App\Console\Commands;

use App\Models\MhpGreatDocReview;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SendReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send todays reminder';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $todayDate = now()->toDateString();
        $data = MhpGreatDocReview::whereDate('date', $todayDate)->get();

        foreach($data as $item){

            $mobile = $item->patient_mobile;
            $message = 'Hi '.$item->patient_name.', Todays you have '.$item->review_name.' with '.$item->doctor_name.' , Note : '.$item->note.'';

            Http::post('https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=fauziaali2000@gmail.com&password=80f50e35f83130f022e78a2862aab390&MsgType=TEXT&receiver=' . $mobile . '&message=' . $message . '');
            $this->info($message);
       
        }


       
     
    }
}
