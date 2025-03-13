<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpSmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_sms', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->integer('uid')->nullable();
            $table->string('url')->nullable();
            $table->integer('is_api_type_parameter')->default(1);
            $table->integer('status')->default(1);
            $table->string('user_name')->nullable();
            $table->string('password')->nullable();
            $table->string('authorization')->nullable();
            $table->string('from')->nullable();
            $table->string('provider_name')->nullable();
            $table->string('others')->nullable();
            $table->longText('message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mhp_sms');
    }
}
