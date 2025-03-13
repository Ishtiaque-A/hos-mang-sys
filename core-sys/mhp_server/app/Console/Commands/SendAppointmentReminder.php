<?php

namespace App\Console\Commands;

use App\Models\MhpAppointmentScheduler;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SendAppointmentReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:appointmentReminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Appoitment Reminder Before 2 days ago';

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
        $todayDate = now()->addDays(2)->toDateString();
        $data = MhpAppointmentScheduler::with('doctors')->whereDate('StartTime', 'like', '%' . $todayDate . '%')->get();

        foreach($data as $item){

            $mobile = $item->patient_mobile;
            $docName = $item->doctors->dr_given_name;

            $message = 'Dear Sir/Madam, You have an uppcoming appoitment with '.$docName.' at '.$item->StartTime.'' ;

            Http::post('https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=fauziaali2000@gmail.com&password=80f50e35f83130f022e78a2862aab390&MsgType=TEXT&receiver=' . $mobile . '&message=' . $message . '');
            $this->info($message);
       
        }
    }
}
