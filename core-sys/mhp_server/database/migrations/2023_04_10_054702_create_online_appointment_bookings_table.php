<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOnlineAppointmentBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('online_appointment_bookings', function (Blueprint $table) {
            $table->id();
            $table->integer('patient_id')->nullable();
            $table->integer('doctor_id')->nullable();

            $table->string('inovice_number')->nullable();
            $table->string('date')->nullable();
            $table->string('time')->nullable();
            $table->string('appointment_type')->nullable();
            $table->string('saas_branch_name')->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->integer('calling_type')->nullable();
            $table->integer('chamber_id')->nullable();

            $table->string('disease')->nullable();

            $table->string('payment_type')->nullable();
            $table->string('amount')->nullable();
            $table->string('transaction_no')->nullable();
            $table->string('transaction_phone_number')->nullable();
            $table->string('shift')->nullable();
            $table->string('referred_name')->nullable();
            $table->boolean('payment_confirmation')->default(0);
            $table->boolean('is_confirmed')->default(0);
            $table->integer('reschedule_id')->nullable();

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
        Schema::dropIfExists('online_appointment_bookings');
    }
}
