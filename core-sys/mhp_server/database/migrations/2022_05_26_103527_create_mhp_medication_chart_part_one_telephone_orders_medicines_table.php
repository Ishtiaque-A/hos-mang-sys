<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMedicationChartPartOneTelephoneOrdersMedicinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_medication_chart_part_one_telephone_orders_medicines', function (Blueprint $table) {
            $table->id();
            $table->string('medicine__name')->nullable();
            $table->string('route')->nullable();
            $table->string('dose')->nullable();
            $table->string('frequency')->nullable();
            $table->string('check__initials__n__one')->nullable();
            $table->string('check__initials__n__two')->nullable();
            $table->string('prescriber__nurse')->nullable();
            $table->string('date__no')->nullable();
            $table->string('time__given__by__one')->nullable();
            $table->string('time__given__by__two')->nullable();
            $table->string('time__given__by__three')->nullable();
            $table->string('time__given__by__four')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
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
        Schema::dropIfExists('mhp_medication_chart_part_one_telephone_orders_medicines');
    }
}
