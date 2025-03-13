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
        Schema::create('sms_gateway_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sms_gateway_id');
            $table->string('service_name')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();
            $table->foreign('sms_gateway_id')
                ->references('id')->on('s_m_s_gateways')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sms_gateway_details');
    }
};
