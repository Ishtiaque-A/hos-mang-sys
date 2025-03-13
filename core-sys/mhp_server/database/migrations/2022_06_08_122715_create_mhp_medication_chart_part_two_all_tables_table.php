<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMedicationChartPartTwoAllTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_medication_chart_part_two_all_tables', function (Blueprint $table) {
            $table->id();
            $table->string('signature_name1')->nullable();
            $table->string('date_prescriber1')->nullable();
            $table->string('duration1')->nullable();
            $table->string('qty1')->nullable();
            $table->string('signature_name2')->nullable();
            $table->string('date_prescriber2')->nullable();
            $table->string('duration2')->nullable();
            $table->string('qty2')->nullable();
            $table->string('duration3')->nullable();
            $table->string('qty3')->nullable();
            $table->string('duration4')->nullable();
            $table->string('qty4')->nullable();
            $table->string('vte_risk_assessed_checkbox1')->nullable();
            $table->string('continue_on_discharge_radio_part2')->nullable();
            $table->string('dispense_radio_part2')->nullable();
            $table->string('vte_risk_assessed_checkbox2')->nullable();
            $table->string('continue_on_discharge_radio2_part2')->nullable();
            $table->string('dispense_radio2_part2')->nullable();
            $table->string('continue_on_discharge_radio3_part2')->nullable();
            $table->string('dispense_radio3_part2')->nullable();
            $table->string('tick_if_slow_checkbox3')->nullable();
            $table->string('continue_on_discharge_radio4_part2')->nullable();
            $table->string('dispense_radio4_part2')->nullable();
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
        Schema::dropIfExists('mhp_medication_chart_part_two_all_tables');
    }
}
