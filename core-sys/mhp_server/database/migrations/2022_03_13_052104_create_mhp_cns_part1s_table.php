<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpCnsPart1sTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_cns_part1s', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->longText('CN_1')->nullable();
            $table->longText('CN_2')->nullable();
            $table->longText('CN_3')->nullable();
            $table->longText('CN_4')->nullable();
            $table->longText('CN_5')->nullable();
            $table->longText('CN_6')->nullable();
            $table->longText('CN_7')->nullable();
            $table->longText('CN_8')->nullable();
            $table->longText('CN_9')->nullable();
            $table->string('olfactory')->nullable();
            $table->string('visualAcuity')->nullable();
            $table->string('visualAcuityDetail')->nullable();

            $table->string('fundoscopy')->nullable();
            $table->string('fundoscopyDetail')->nullable();

            $table->string('visualField')->nullable();
            $table->string('papillary')->nullable();
            $table->string('pupil')->nullable();
            $table->string('light')->nullable();
            $table->string('eyeMovement')->nullable();
            $table->string('sensory')->nullable();
            $table->string('motor')->nullable();
            $table->string('force_to_shut_open_mouth')->nullable();
            $table->string('jaw')->nullable();
            $table->string('drooping_corner_of_mouth')->nullable();
            $table->string('lookingUp')->nullable();
            $table->string('on_shutting_eye')->nullable();
            $table->string('shrug_the_shoulder_trapezius')->nullable();
            $table->string('neckMovement')->nullable();
            $table->string('whisper_test')->nullable();
            $table->string('wever_test')->nullable();
            $table->string('rinner_test')->nullable();
            $table->string('hallpike_manoeuvre')->nullable();
            $table->string('uvula')->nullable();
            $table->string('posterior_third_of_tongue_sensation')->nullable();
            $table->string('tongue')->nullable();
            $table->string('diviation')->nullable();
            $table->string('rashHerpesZoster')->nullable(); 
            $table->string('firstNerve')->nullable(); 
            $table->string('secondNerve')->nullable();
            $table->string('thirdNerve')->nullable(); 
            $table->string('fifthNerve')->nullable();
            $table->string('seventhNerve')->nullable();
            $table->string('eleventhNerve')->nullable(); 
            $table->string('eightNerve')->nullable(); 
            $table->string('ninthNerve')->nullable();
            $table->string('twelfthNerve')->nullable(); 
            $table->string('gagReflex')->nullable(); 
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
        Schema::dropIfExists('mhp_cns_part1s');
    }
}
