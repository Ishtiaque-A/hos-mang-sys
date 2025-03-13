<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

trait DataBaseImport
{
    public function importData($databaseName)
    {
        $great_doc_1 = storage_path('saas/db_new.sql');

        // $great_doc_1 = storage_path('saas/health_table.sql');
        //        $great_doc_2 = storage_path('saas/great_doc_2.sql');
        try {
            //$sqlContent1 = file_get_contents($sqlFile1);
            $sqlContent1 = file_get_contents($great_doc_1);
            //            $sqlContent2 = file_get_contents($great_doc_2);
            DB::statement("USE $databaseName");
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
            DB::unprepared($sqlContent1);
            //            DB::unprepared($sqlContent2);
            DB::statement('SET FOREIGN_KEY_CHECKS=1');
            DB::statement("USE " . env('DB_DATABASE'));
            return true;
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            DB::statement("USE " . env('DB_DATABASE'));
            return $exception->getMessage();
        }
    }

    public function createDatabase($databaseName)
    {
        try {
            DB::statement("CREATE DATABASE $databaseName");
            return $this->importData($databaseName);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            return false;
            //return ['message' => $exception->getMessage(), "status" => false, 'data' => []];
        }
    }

    public function deleteDatabase($databaseName)
    {
        try {
            DB::statement("DROP DATABASE IF EXISTS $databaseName");
            return true;
        } catch (\Exception $exception) {
            return false;
        }
    }
}
