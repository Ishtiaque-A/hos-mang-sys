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
        Schema::create('purchase_sms', function (Blueprint $table) {
            $table->id();
            $table->integer("package_id")->nullable();
            $table->integer("user_id")->nullable();
            $table->integer("organization_id")->nullable();
            $table->string("package_name")->nullable();
            $table->string("phone_number")->nullable();
            $table->integer("total_sms_count")->nullable();
            $table->integer("available_sms_count")->nullable();
            $table->integer("used_sms_count")->nullable();
            $table->date("expire_date")->nullable();
            $table->string('transaction_id')->nullable();
            $table->string("status")->nullable();
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
        Schema::dropIfExists('purchase_sms');
    }
};
