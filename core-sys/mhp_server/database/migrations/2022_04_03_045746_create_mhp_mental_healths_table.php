<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMentalHealthsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_mental_healths', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('historyValue')->nullable();
            $table->string('appearance')->nullable();
            $table->string('behaviour')->nullable();
            $table->string('attitude')->nullable();
            $table->string('mood')->nullable();
            $table->string('affect')->nullable();
            $table->string('appropriteness')->nullable();
            $table->string('speech')->nullable();
            $table->string('perceptual')->nullable();
            $table->string('expectancy')->nullable();
            $table->string('insight')->nullable();
            $table->string('K10TotalScore')->nullable();
            $table->string('k10bottomvalue')->nullable();

            $table->string('PSQ9Score1st')->nullable();
            $table->string('PSQ9Score2nd')->nullable();
            $table->string('hdrsTotalScore')->nullable();
            $table->string('gpcogScore1st')->nullable();
            $table->string('gpcogScore2nd')->nullable();
            $table->string('mdrsScore')->nullable();
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
        Schema::dropIfExists('mhp_mental_healths');
    }
}
