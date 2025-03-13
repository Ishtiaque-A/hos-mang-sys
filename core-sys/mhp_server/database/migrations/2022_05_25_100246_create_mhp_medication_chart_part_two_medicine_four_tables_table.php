<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMedicationChartPartTwoMedicineFourTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_medication_chart_part_two_medicine_four_tables', function (Blueprint $table) {
            $table->id();
            $table->string('medicine__name')->nullable();
            $table->string('route')->nullable();
            $table->string('dose')->nullable();
            $table->string('frequency__and__now__enter')->nullable();
            $table->string('frequency__and__now__enter__time')->nullable();
            $table->string('indication')->nullable();
            $table->string('pharmacy__name')->nullable();
            $table->string('prescriber__signaturer')->nullable();
            $table->string('contact__no')->nullable();
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
        Schema::dropIfExists('mhp_medication_chart_part_two_medicine_four_tables');
    }
}
