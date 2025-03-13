<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctor_payments', function (Blueprint $table) {
            $table->id();
            $table->string('doctor_id')->nullable();
            $table->string('patient_hn_number')->nullable();
            $table->enum('payment_type', ['refund', 'payment'])->nullable();
            $table->integer('amount')->nullable();
            $table->dateTime('date')->nullable();
            $table->string('saas_branch_name')->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->text('details')->nullable();
            $table->timestamps();
            $table->string('transcition_number')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('payment_method')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doctor_payments');
    }
}
