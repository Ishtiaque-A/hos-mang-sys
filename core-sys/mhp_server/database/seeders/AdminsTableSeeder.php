<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        DB::table('admins')->delete();
        $adminRecords = [
            ['id'=>1,'name'=>'Md. Imran Hossain','type'=>'admin','mobile'=>'01771045019','email'=>'mdimranhossain985@gmail.com','password'=>'$2y$10$RUGGY.tiiM53AaLJwYTipeBU0qg8OheTB5NBs0/0KQ65M3rhxrTLu','image'=>'','status'=>1,
            ],
            ['id'=>2,'name'=>'Imran','type'=>'subadmin','mobile'=>'01687663654','email'=>'imrancsecity@gmail.com','password'=>'$2y$10$RUGGY.tiiM53AaLJwYTipeBU0qg8OheTB5NBs0/0KQ65M3rhxrTLu','image'=>'','status'=>1,
            ],
            ['id'=>3,'name'=>'Md. Imran','type'=>'subadmin','mobile'=>'01771045019','email'=>'admin@admin.com','password'=>'$2y$10$RUGGY.tiiM53AaLJwYTipeBU0qg8OheTB5NBs0/0KQ65M3rhxrTLu','image'=>'','status'=>1,
            ],

        ];

        DB::table('admins')->insert($adminRecords);
    }
}
