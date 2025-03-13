<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class UsersSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();
        Schema::enableForeignKeyConstraints();

        $user = User::create([
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456'),
            'name' => 'Admin',
            'user_type' => '0',
        ],
        [
            'email' => 'chaki@gmail.com',
            'password' => Hash::make('123456'),
            'name' => 'Chaki',
            'user_type' => '0',
        ],
        [
            'email' => 'anik@gmail.com',
            'password' => Hash::make('123456'),
            'name' => 'Anik',
            'user_type' => '0',
        ]);
        $user->roles()->attach(Role::where('slug', 'admin')->first());
    }
}
