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
        Schema::create('s_m_s_gateways', function (Blueprint $table) {
            $table->id();
            $table->string('currency')->nullable();
            $table->integer('price')->nullable();
            $table->string("title")->nullable();
            $table->string("description")->nullable();
            $table->string('expire_date')->nullable();
            $table->integer('duration')->nullable();
            $table->boolean("status")->default(1);
            $table->integer("buy_sms_count")->nullable();
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
        Schema::dropIfExists('s_m_s_gateways');
    }
};
