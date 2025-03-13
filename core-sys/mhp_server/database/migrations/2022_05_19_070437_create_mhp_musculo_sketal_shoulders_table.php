<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMusculoSketalShouldersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_musculo_sketal_shoulders', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();

            $table->string('shapCounter')->nullable();
            $table->string('anteriorView')->nullable();
            $table->string('resistedMovement')->nullable();

            $table->string('shoulder_LR_ternary')->nullable();
            $table->string('level_of_spine_value')->nullable();
            $table->string('winged_scapula_value')->nullable();
            $table->string('sternum_ternary_value')->nullable();
            $table->string('coracoid_process_ternary_value')->nullable();
            $table->string('scapula_ternary_value')->nullable();
            $table->string('axillary_ternary_value')->nullable();
            $table->string('ac_joint_ternary_value')->nullable();
            $table->string('joint_margin_ternary_value')->nullable();
            $table->string('infraspinatus_ternary_value')->nullable();
            $table->string('subacromial_ternary_value')->nullable();
            $table->string('spineof_scapula_ternary_value')->nullable();
            $table->string('supra_spinatus_ternary_value')->nullable();
            $table->string('painful_arc_value')->nullable();
            $table->string('resistedMovementside')->nullable();
            $table->string('acromioclavicular_PN_ternary')->nullable();
            $table->string('scapular_assistance_PN_ternary')->nullable();
            $table->string('lateral_slide_PN_ternary')->nullable();
            $table->string('impigement_neer_PN_ternary')->nullable();
            $table->string('impigement_hawkinskennedy_PN_ternary')->nullable();
            $table->string('instability_load_shift_PN_ternary')->nullable();
            $table->string('instability_apprehension_PN_ternary')->nullable();
            $table->string('inferior_sulcus_sign_PN_ternary')->nullable();
            $table->string('superiorLabralAnterior')->nullable();
            $table->string('SLAPLeison_obriens_PN_ternary')->nullable();
            $table->string('specific_palpation_PN_ternary')->nullable();
            $table->string('upper_limb_euro_dynamic_PN_ternary')->nullable();
            $table->string('abduction50')->nullable();
            $table->string('abduction170')->nullable();
            $table->string('Flexion160')->nullable();
            $table->string('Extension50')->nullable();
            $table->string('LateralRotation80')->nullable();
            $table->string('MedialRotation')->nullable();


            $table->string('shoulderHistoryValue')->nullable();


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
        Schema::dropIfExists('mhp_musculo_sketal_shoulders');
    }
}
