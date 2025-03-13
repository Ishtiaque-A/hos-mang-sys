<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMedicationChartPartTwoVariableDoseMedicineTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_medication_chart_part_two_variable_dose_medicine_tables', function (Blueprint $table) {
            $table->id();
            $table->string('medicine__name')->nullable();
            $table->string('route')->nullable();
            $table->string('dose')->nullable();
            $table->string('frequency')->nullable();
            $table->string('indication')->nullable();
            $table->string('pharmacy__name')->nullable();
            $table->string('prescriber__signaturer')->nullable();
            $table->string('contact__no')->nullable();
            $table->string('drag__level')->nullable();
            $table->string('time__level__taken')->nullable();
            $table->string('prescriber')->nullable();
            $table->string('time__to__be__given')->nullable();
            $table->string('time_given')->nullable();
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
        Schema::dropIfExists('mhp_medication_chart_part_two_variable_dose_medicine_tables');
    }
}
