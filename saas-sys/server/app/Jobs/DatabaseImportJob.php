<?php

namespace App\Jobs;

use App\Service\SubscriptionPlanService;
use App\Traits\DataBaseImport;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DatabaseImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, DataBaseImport;

     private  $data;
    public function __construct($data)
    {
        //
        $this->data= $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::info($this->data);
        $databaseName = $this->data['db'];
        echo json_encode($this->data).PHP_EOL;
        $great_doc = storage_path('saas/health_data.sql');

        try {
            $sqlContent = file_get_contents($great_doc);
            DB::statement("USE $databaseName");
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
            DB::unprepared($sqlContent);
            DB::statement('SET FOREIGN_KEY_CHECKS=1');
            DB::statement("USE " . env('DB_DATABASE'));
            Log::info($this->data);
            echo 'success'.PHP_EOL;
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            echo json_encode($exception->getMessage()).PHP_EOL;
            DB::statement("USE " . env('DB_DATABASE'));
        }
    }
}
