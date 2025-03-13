<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpEyeExamiPart1sTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_eye_exami_part1s', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->longText('Eye_External_Observation')->nullable();
            $table->longText('Eye_Phoria')->nullable();
            $table->longText('Eye_Eso_Phoria')->nullable();
            $table->longText('Eye_Pursuits')->nullable();
             $table->string('distance')->nullable();
             $table->string('near')->nullable();
             $table->string('flashes')->nullable();
             $table->string('floaters')->nullable();
             $table->string('red')->nullable();
             $table->string('sore')->nullable();
             $table->string('itchy')->nullable();
             $table->string('watery')->nullable();
             $table->string('discharge')->nullable();
             $table->string('headache')->nullable();
             $table->string('normal')->nullable();
             $table->string('murcusGunn')->nullable();
             $table->string('rapd')->nullable();
             $table->string('neuroOpthal')->nullable();
             $table->string('doubleVision')->nullable();
             $table->string('flare')->nullable();
             $table->string('ghosting')->nullable();
             $table->string('haloes')->nullable();
             $table->string('caruncle')->nullable();
             $table->string('convergence')->nullable();          
             $table->string('visualAcuityDistance_left')->nullable();
             $table->string('visualAcuityDistance_right')->nullable();
             $table->string('visualAcuityNear_left')->nullable();
             $table->string('visualAcuityNear_right')->nullable();
             $table->string('sizeRight')->nullable();
             $table->string('sizeLeft')->nullable();
             $table->string('shape')->nullable();
             $table->string('lesion1')->nullable();
             $table->string('lesion2')->nullable();
             $table->string('lesion3')->nullable();
             $table->string('anteriorChamber')->nullable();
             $table->string('swollenEyeLid')->nullable();
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
        Schema::dropIfExists('mhp_eye_exami_part1s');
    }
}
