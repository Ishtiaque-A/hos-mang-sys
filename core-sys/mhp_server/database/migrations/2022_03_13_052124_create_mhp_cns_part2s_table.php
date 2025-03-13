<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpCnsPart2sTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_cns_part2s', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();

            $table->string('upperLimbValue')->nullable();
            $table->string('power')->nullable();
            $table->string('pictureUperLimbValue')->nullable();

            $table->string('bicepsRight')->nullable();
            $table->string('tricepsRight')->nullable();
            $table->string('jeskRight')->nullable();
            $table->string('fingerRight')->nullable();

            $table->string('biceps_jesk')->nullable();
            $table->string('triceps_jesk')->nullable();
            $table->string('brachioradialis_jesk')->nullable();
            $table->string('finger')->nullable();
            $table->string('finger_nose_test')->nullable();
            $table->string('dysdiadochokinesis')->nullable();

            $table->string('temparature')->nullable();
            $table->string('vibration')->nullable();
            $table->string('proprioception')->nullable();

            $table->string('Pin_Prick_Testing')->nullable();
            $table->string('Light_Touch_Testing')->nullable();
            $table->string('Picture_upper_limb_dermatomes')->nullable();

            $table->string('Picture_upper_limb_dermatomes_details')->nullable();
            $table->string('The_Radial_Nerve')->nullable();
            $table->string('The_Ulnar_Nerve')->nullable();
            $table->string('The_Median_Nerve')->nullable();

            $table->string('shoulder_left1')->nullable();
            $table->string('shoulder_left2')->nullable();
            $table->string('elbow_left1')->nullable();
            $table->string('elbow_left2')->nullable();
            $table->string('wrist_left1')->nullable();
            $table->string('wrist_left2')->nullable();

            $table->string('fingerSide')->nullable();
            $table->string('fingerNth')->nullable();
            $table->string('fingerSide1')->nullable();
            $table->string('fingerNth1')->nullable();
            $table->string('fingerSide2')->nullable();
            $table->string('fingerNth2')->nullable();

            $table->string('fingerFlexion_left')->nullable();
            $table->string('fingerExtension_left')->nullable();
            $table->string('fingerAbduction_left')->nullable();
            $table->string('fingerAdduction_left')->nullable();

            
            $table->string('shoulder_right1')->nullable();
            $table->string('shoulder_right2')->nullable();
            $table->string('elbow_right1')->nullable();
            $table->string('elbow_right2')->nullable();
            $table->string('wrist_right1')->nullable();
            $table->string('wrist_right2')->nullable();
            $table->string('fingerFlexion_right')->nullable();
            $table->string('fingerExtension_right')->nullable();
            $table->string('fingerAbduction_right')->nullable();
            $table->string('fingerAdduction_right')->nullable();

            $table->string('shoulder_reflexes1')->nullable();
            $table->string('shoulder_reflexes2')->nullable();
            $table->string('elbow_reflexes1')->nullable();
            $table->string('elbow_reflexes2')->nullable();
            $table->string('wrist_reflexes1')->nullable();
            $table->string('wrist_reflexes2')->nullable();

            $table->string('fingerFlexion_reflexes')->nullable();
            $table->string('fingerExtension_reflexes')->nullable();
            $table->string('fingerAbduction_reflexes')->nullable();
            $table->string('fingerAdduction_reflexes')->nullable();

            $table->string('lesion')->nullable();

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
        Schema::dropIfExists('mhp_cns_part2s');
    }
}
