<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMSKneesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_m_s_knees', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();

             $table->string('kneeJoint_ternary')->nullable();

             $table->string('knee_anterior_view_object_value')->nullable();
             $table->string('lateral_view_object_value')->nullable();
             $table->string('knee_posterior_view_object_value')->nullable();
             $table->string('stance_object_value')->nullable();

             $table->string('brush_or_wipe_test_PN_ternary')->nullable();
             $table->string('patellar_tap_test_PN_ternary')->nullable();
             $table->string('zohler_test_PN_ternary')->nullable();
             $table->string('knee_condyle_value')->nullable();
             $table->string('tibial_tubercle_value')->nullable();
             $table->string('above_knee_measurement_side_ternary')->nullable();

             $table->string('above_knee_measurement')->nullable();
             $table->string('above_knee_measurement_1')->nullable();
       
             $table->string('bellow_knee_measurement_side_ternary')->nullable();
             $table->string('bellow_knee_measurement')->nullable();
             
             $table->string('medial_meniscus_PN_ternary')->nullable();
             $table->string('lateral_meniscus_PN_ternary')->nullable();
             $table->string('knee_flexion_PN_ternary')->nullable();
             $table->string('knee_kxtention_PN_ternary')->nullable();


             $table->string('kneeLigamentInjury')->nullable();
             $table->string('kneeMeniscusInjusy')->nullable();

             $table->string('kneeMedialLigament')->nullable();
             $table->string('kneeAnteriorCruciate')->nullable();
             $table->string('kneeSagSign')->nullable();
             $table->string('kneeLateralLigament')->nullable();
             $table->string('kneePostCruciateLigament')->nullable();
             $table->string('kneeWilsonTest')->nullable();
             $table->string('kneeNobleCompression')->nullable();

             $table->string('medialMeniscusSide')->nullable();
             $table->string('lateralMeniscusSide')->nullable();
             $table->string('kneeLigamentInjurySide')->nullable();
             $table->string('kneeMeniscusInjusySide')->nullable();
             $table->string('kneeMedialRotationLigament')->nullable();
             $table->string('kneeMedialRotationMeniscus')->nullable();
             $table->string('kneeMedialLigamentSide')->nullable();
             $table->string('kneeAnteriorCruciateSide')->nullable();
             $table->string('kneeLateralLigamentSide')->nullable();
             $table->string('kneeSagSignSide')->nullable();
             $table->string('kneePostCruciateLigamentSide')->nullable();
             $table->string('kneeWilsonTestSide')->nullable();
             $table->string('kneePatellaApprehensionSide')->nullable();
             $table->string('kneeNobleCompressionSide')->nullable();
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
        Schema::dropIfExists('mhp_m_s_knees');
    }
}
