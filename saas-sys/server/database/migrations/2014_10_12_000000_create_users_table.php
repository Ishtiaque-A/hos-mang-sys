<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('mobile')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('Two_factor_secret')->nullable();
            $table->string('two_factor_recovery_codes')->nullable();
            $table->string('photo')->nullable();
            $table->integer('organization_id')->nullable();
            $table->integer('branch_id')->nullable();
            $table->string('branch_name')->nullable();
            $table->tinyInteger('user_type')->comment('0:super admin, 2: super user, 3: local admin, 4: local user, 5:others');
            $table->tinyInteger('is_tem_password')->comment('0:no, 2: yes')->default(0);
            $table->tinyInteger('status')->comment('0:inactive, 1: active')->default(1);
            $table->timestamp('deleted_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }


    //role varchar
    //User_type integer



    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
