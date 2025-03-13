<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMusculoSketalThoracoLumberSpinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_musculo_sketal_thoraco_lumber_spines', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('inspection_look_value')->nullable();
            $table->string('sudden_anaesthesia_value')->nullable();
            $table->string('thoracic_kyphosis_value')->nullable();
            $table->string('lumber_lordosis_value')->nullable();
            $table->string('spine_value')->nullable();
            $table->string('pain_along_value')->nullable();
            $table->string('pain_over_value')->nullable();
            $table->string('slum_test_ternary')->nullable();
            $table->string('pain_into_knee_value')->nullable();
            $table->string('walk_on_value')->nullable();
            $table->string('tenderness_over_thoraco_side')->nullable();
            $table->string('lateral_flexion_side')->nullable();
            $table->string('forward_ternsry')->nullable();
            $table->string('extension_ternary')->nullable();
            $table->string('slJoint_side')->nullable();
            $table->string('hip_joint_line_side')->nullable();
            $table->string('valsalva_PN_ternary')->nullable();
            $table->string('straight_leg_raising_ternary')->nullable();
            $table->string('femoral_stretch_PN_ternary')->nullable();
            $table->string('hoover_test_PN_ternary')->nullable();
            $table->string('gaenslens_sign_PN_ternary')->nullable();
            $table->string('patrick_bucket_PN_ternary')->nullable();
            $table->string('quadrant_PN_ternary')->nullable();
            $table->string('trendelenburg_PN_ternary')->nullable();
            $table->string('spondylosis_PN_ternary')->nullable();
            $table->string('hip_flexion_value')->nullable();
            $table->string('resisted_value')->nullable();
            $table->string('dorsiflexion_value')->nullable();
            $table->string('extend_value')->nullable();
            $table->string('l1_value')->nullable();
            $table->string('l3Area_value')->nullable();
            $table->string('l4Area_value')->nullable();
            $table->string('l5Area_value')->nullable();
            $table->string('planter_flexion_value')->nullable();
            $table->string('s1_area_value')->nullable();
            $table->string('s4_supply_value')->nullable();
            $table->string('Shober_test')->nullable();
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
        Schema::dropIfExists('mhp_musculo_sketal_thoraco_lumber_spines');
    }
}
