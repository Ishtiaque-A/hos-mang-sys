<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaediatricNewBornsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_paediatric_new_borns', function (Blueprint $table) {
            $table->id();
            $table->string('headAndFontAnelles')->nullable();
            $table->string('eyesIncludingRedReflex')->nullable();
            $table->string('date')->nullable();
            $table->string('ears')->nullable();
            $table->string('mouthAndPalate')->nullable();
            $table->string('cardiovascular')->nullable();
            $table->string('femoralPulses')->nullable();
            $table->string('respiratory')->nullable();
            $table->string('abdomenAndUmbilicus')->nullable();
            $table->string('anus')->nullable();
            $table->string('genitalia')->nullable();
            $table->string('testesFullyDescended')->nullable();
            $table->string('musculoSkeletal')->nullable();
            $table->string('hips')->nullable();
            $table->string('skin')->nullable();
            $table->string('reflexes')->nullable()->comment('1=true,0=false');
            $table->string('motherConcerns')->nullable();
            $table->string('outCome')->nullable();
            $table->string('writeComments')->nullable();
            $table->string('patient_id')->nullable();
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
        Schema::dropIfExists('mhp_paediatric_new_borns');
    }
}
