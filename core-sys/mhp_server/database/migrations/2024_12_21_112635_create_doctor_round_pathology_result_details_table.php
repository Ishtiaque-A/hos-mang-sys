<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorRoundPathologyResultDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctor_round_pathology_result_details', function (Blueprint $table) {
            $table->id();
            $table->string("result_id")->nullable();
            $table->string("name")->nullable();
            $table->string("value")->nullable();
            $table->string("unit")->nullable();
            $table->string("setup_id")->nullable();
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
        Schema::dropIfExists('doctor_round_pathology_result_details');
    }
}
