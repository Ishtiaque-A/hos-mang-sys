<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMedicationChartPartTwoVariableDoseMedicineTwoTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_medication_chart_part_two_variable_dose_medicine_two_tables', function (Blueprint $table) {
            $table->id();
            $table->string('medicine__name')->nullable();
            $table->string('route')->nullable();
            $table->string('dose')->nullable();
            $table->string('frequency')->nullable();
            $table->string('indication')->nullable();
            $table->string('pharmacy__name')->nullable();
            $table->string('prescriber__signaturer')->nullable();
            $table->string('contact__no')->nullable();
            $table->string('mechanical__prophylaxis')->nullable();
            $table->string('prescriber__ni__signaturer')->nullable();
            $table->string('contact__no__two')->nullable();
            $table->string('am__check')->nullable();
            $table->string('pm__check')->nullable();
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
        Schema::dropIfExists('mhp_medication_chart_part_two_variable_dose_medicine_two_tables');
    }
}
