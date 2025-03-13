<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpEyePart1PhoriaOnesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_eye_part1_phoria_ones', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullValue();
            $table->string('eye_exmi_part1_id')->nullValue();
            $table->string('phoria_one_id')->nullValue();
            $table->string('value')->nullValue();
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
        Schema::dropIfExists('mhp_eye_part1_phoria_ones');
    }
}
