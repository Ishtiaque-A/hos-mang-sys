<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpEyeExamiPart2sTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_eye_exami_part2s', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->longText('Eye_Worth')->nullable();
            $table->string('enteranceTest')->nullable();
            $table->string('visualAcuity')->nullable();
            $table->string('coverTest')->nullable();
            $table->string('convergence')->nullable();
            $table->string('Pupils')->nullable();
            $table->string('accomodation')->nullable();
            $table->string('dryRetinoscopy')->nullable();
            $table->string('maddox_wing_fcc')->nullable();
            $table->string('maddox_wing_bPlus')->nullable();         
            $table->string('worth_4_Dot_midline')->nullable();
            $table->string('worth_4_Dot_side')->nullable();
            $table->string('penGrip')->nullable();
            $table->string('penGripSide')->nullable();
            $table->string('colorVision')->nullable();
            $table->string('stereopsis')->nullable();
            $table->string('suppression')->nullable();
            $table->string('neuroOpthal2')->nullable();
            $table->string('dem1')->nullable();
            $table->string('dem2')->nullable();
            $table->string('dem3')->nullable();
            $table->string('perla')->nullable();
            $table->string('rapd2')->nullable();
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
        Schema::dropIfExists('mhp_eye_exami_part2s');
    }
}
