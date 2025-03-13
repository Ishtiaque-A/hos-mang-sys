<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorRoundPathologyResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctor_round_pathology_results', function (Blueprint $table) {
            $table->id();
            $table->string("patient_id")->nullable();
            $table->string("appointment_id")->nullable();
            $table->string("doctor_id")->nullable();
            $table->string("date")->nullable();
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
        Schema::dropIfExists('doctor_round_pathology_results');
    }
}
