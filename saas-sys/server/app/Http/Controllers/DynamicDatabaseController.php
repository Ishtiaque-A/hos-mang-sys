<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DynamicDatabaseController extends BaseController
{
    public function importData( $databaseName)
    {
        $sqlFile1 = storage_path('saas/gd_db.sql');
        $sqlFile2 = storage_path('saas/saas2.sql');
        $sqlFile3 = storage_path('saas/saas3.sql');
        try {
                $sqlContent1 = file_get_contents($sqlFile1);
                $sqlContent2 = file_get_contents($sqlFile2);
                $sqlContent3 = file_get_contents($sqlFile3);
                DB::statement("USE $databaseName");
                DB::statement('SET FOREIGN_KEY_CHECKS=0');
                DB::unprepared($sqlContent1);
                /*DB::unprepared($sqlContent2);
                DB::unprepared($sqlContent3);*/
                DB::statement('SET FOREIGN_KEY_CHECKS=1');
            return response()->json(['message' => 'SQL file imported successfully']);
        }catch (\Exception $exception){
            return response()->json(['message' => 'No file uploaded'], 400);
        }
    }
    public function createDatabase(Request $request)
    {
        //dd($request->all());
        $databaseName = $request->input('name');

        // Create the new database
        DB::statement("CREATE DATABASE $databaseName");

        // Store the database name in the dynamic_databases table
        /*DB::table('dynamic_databases')->insert([
            'name' => $databaseName,
            'created_at' => now(),
            'updated_at' => now(),
        ]);*/
        $this->importData($databaseName);

        return response()->json(['message' => 'Database created successfully']);
    }
}
