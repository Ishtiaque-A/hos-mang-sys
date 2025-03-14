<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sms_allowed_countries', function (Blueprint $table) {
            $table->id();
            $table->integer('gateway_id');
            $table->string('name')->nullable();
            $table->string('code')->nullable();
            $table->string('dial_code')->nullable();
            $table->string('flag')->nullable();
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
        Schema::dropIfExists('sms_allowed_countries');
    }
};
