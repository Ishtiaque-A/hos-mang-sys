<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMedicationNurseInitiatedMedicinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_medication_nurse_initiated_medicines', function (Blueprint $table) {
            $table->id();
            $table->string('medicine_name')->nullable();
            $table->string('route')->nullable();
            $table->string('dose')->nullable();
            $table->string('frequency')->nullable();
            $table->string('time_of_dose')->nullable();
            $table->string('dose__time')->nullable();
            $table->string('prescriber_or_nurse_sign')->nullable();
            $table->string('given_by')->nullable();
            $table->string('time_given')->nullable();
            $table->string('pharmacy')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
            $table->string('date')->nullable();
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
        Schema::dropIfExists('mhp_medication_nurse_initiated_medicines');
    }
}
