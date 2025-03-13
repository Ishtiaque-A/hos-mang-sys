<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoundTreatmentProtocolResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('round_treatment_protocol_results', function (Blueprint $table) {
            $table->id();
            $table->string('protocol_id')->nullable();
            $table->string('admission_id')->nullable();
            $table->string('appointment_id')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
            $table->string('protocol_cycle_id')->nullable();
            $table->text('instruction')->nullable();
            $table->text('trigger_dose_change')->nullable();
            $table->string('date_to')->nullable();
            $table->string('date')->nullable();
            $table->string('day')->nullable();
            $table->string('nurse')->nullable();
            $table->string('given_date_time')->nullable();
            $table->string('protocol_drug_id')->nullable();
            $table->string('drug_name')->nullable();
            $table->string('dose')->nullable();
            $table->string('route')->nullable();
            $table->string('type')->nullable();
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
        Schema::dropIfExists('round_treatment_protocol_results');
    }
}
