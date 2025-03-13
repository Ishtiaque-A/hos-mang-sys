<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoundUrineResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('round_urine_results', function (Blueprint $table) {
            $table->id();
            $table->string('admission_id')->nullable();
            $table->string('appointment_id')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
            $table->string('date')->nullable();
            $table->string('leucocyte')->nullable();
            $table->string('ketones')->nullable();
            $table->string('specific_gravity')->nullable();
            $table->string('nitrites')->nullable();
            $table->string('urobilinogen')->nullable();
            $table->string('ph')->nullable();
            $table->string('bilirubin')->nullable();
            $table->string('glucose')->nullable();
            $table->string('color')->nullable();
            $table->string('protein')->nullable();
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
        Schema::dropIfExists('round_urine_results');
    }
}
