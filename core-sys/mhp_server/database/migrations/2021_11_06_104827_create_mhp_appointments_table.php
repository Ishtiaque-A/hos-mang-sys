<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_appointments', function (Blueprint $table) {
            $table->id();
            $table->integer('doctors_id')->nullable();
            $table->integer('patients_id')->nullable();
            $table->string('appointment_date')->nullable();
            $table->string('appointment_time')->nullable();
            $table->string('appointment_message')->nullable();
            $table->string('appointment_date_name')->nullable();
            $table->string('appointment_status')->nullable();
            $table->string('appointment_confirmation')->nullable();
            $table->integer('delete_status')->default(0);
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
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
        Schema::dropIfExists('mhp_appointments');
    }
}
