<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIntakeOutputDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('intake_output_details', function (Blueprint $table) {
            $table->id();
            $table->string('intake_output_id');
            $table->string('date')->nullable();
            $table->string('time')->nullable();
            $table->string('oral')->nullable();
            $table->string('ivFluid')->nullable();
            $table->string('injection')->nullable();
            $table->string('totalIntake')->nullable();
            $table->string('outputTime')->nullable();
            $table->string('urine')->nullable();
            $table->string('drain')->nullable();
            $table->string('vomit')->nullable();
            $table->string('others')->nullable();
            $table->string('totalOutput')->nullable();
            $table->string('balance')->nullable();
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
        Schema::dropIfExists('intake_output_details');
    }
}
