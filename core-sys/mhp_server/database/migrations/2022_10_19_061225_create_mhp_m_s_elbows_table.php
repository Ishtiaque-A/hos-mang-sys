<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMSElbowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_m_s_elbows', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('elbow_joint_ternary')->nullable();
            $table->string('elbow_history_Arr')->nullable();
            $table->string('elbow_female_value')->nullable();
            $table->string('elbow_male_value')->nullable();
            $table->string('contractual_deformity_ternary')->nullable();
            $table->string('soft_tissue_control_normal_ternary')->nullable();
            $table->string('elbow_scars_ternary')->nullable();
            $table->string('swellings_ternary')->nullable();
            $table->string('elbow_tenderness_ternary')->nullable();
            $table->string('elbow_crepitus_ternary')->nullable();
            $table->string('elbow_deformity_ternary')->nullable();
            $table->string('elbow_muscle_wasting_ternary')->nullable();
            $table->string('elbow_effussion_ternary')->nullable();
            $table->string('at_flexion_Arr')->nullable();
            $table->string('at_full_flexion_Arr')->nullable();
            $table->string('elbow_exam_flextion_value')->nullable();
            $table->string('elbow_exam_flextion_number_value')->nullable();
            $table->string('elbow_exam_extention_value')->nullable();
            $table->string('elbow_exam_extention_number_value')->nullable();
            $table->string('elbow_exam_supination_value')->nullable();
            $table->string('elbow_exam_supination_number_value')->nullable();
            $table->string('elbow_exam_pronation_value')->nullable();
            $table->string('elbow_exam_pronation_number_value')->nullable();

            $table->string('elbowHistoryVal')->nullable();
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
        Schema::dropIfExists('mhp_m_s_elbows');
    }
}
