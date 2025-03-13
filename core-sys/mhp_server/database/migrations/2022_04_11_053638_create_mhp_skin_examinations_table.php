<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpSkinExaminationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_skin_examinations', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();

            $table->string('historyValue')->nullable();
            $table->string('type')->nullable();

            $table->string('acute')->nullable();
            $table->string('chronic')->nullable();
            $table->string('duration')->nullable();
            $table->string('durationType')->nullable();
            $table->string('stable')->nullable();
            $table->string('growing')->nullable();
            $table->string('site')->nullable();
            $table->string('neck')->nullable();
            $table->string('scapula')->nullable();
            $table->string('upperBack')->nullable();
            $table->string('lowerBack')->nullable();
            $table->string('chestUpper')->nullable();
            $table->string('chestLower')->nullable();
            $table->string('arm')->nullable();
            $table->string('forearm')->nullable();
            $table->string('hand')->nullable();
            $table->string('finger')->nullable();
            $table->string('interdigital')->nullable();
            $table->string('nail')->nullable();
            $table->string('areolar')->nullable();
            $table->string('mammary')->nullable();
            $table->string('abdomen')->nullable();
            $table->string('umbilical')->nullable();
            $table->string('inguinal')->nullable();
            $table->string('groin')->nullable();
            $table->string('buttock')->nullable();
            $table->string('perineal')->nullable();
            $table->string('thigh')->nullable();
            $table->string('leg')->nullable();
            $table->string('knee')->nullable();
            $table->string('foot')->nullable();
            $table->string('interdigitalSpace')->nullable();
            $table->string('size1')->nullable();
            $table->string('size2')->nullable();
            $table->string('shape')->nullable();
            $table->string('color')->nullable();
            $table->string('palpation')->nullable();
            $table->string('temparature')->nullable();
            $table->string('arrangements')->nullable();
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
        Schema::dropIfExists('mhp_skin_examinations');
    }
}
