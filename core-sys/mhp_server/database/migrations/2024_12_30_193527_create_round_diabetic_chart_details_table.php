<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoundDiabeticChartDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('round_diabetic_chart_details', function (Blueprint $table) {
            $table->id();
            $table->string('admission_id')->nullable();
            $table->string('appointment_id')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('chart_id')->nullable();
            $table->string('name')->nullable();
            $table->string('time')->nullable();
            $table->string('result')->nullable();
            $table->string('insulin_type')->nullable();
            $table->string('insulin_unit')->nullable();
            $table->string('food')->nullable();
            $table->string('signature')->nullable();
            $table->string('date')->nullable();
            $table->string('parameter_id')->nullable();
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
        Schema::dropIfExists('round_diabetic_chart_details');
    }
}
