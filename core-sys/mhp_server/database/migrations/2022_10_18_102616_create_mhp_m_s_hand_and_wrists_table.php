<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMSHandAndWristsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_m_s_hand_and_wrists', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('hand_wrist_ternary')->nullable();
            $table->string('wrist_Arr')->nullable();
            $table->string('distal_side_value')->nullable();
            $table->string('distal_number_value')->nullable();
            $table->string('distal_Arr')->nullable();
            $table->string('metacarpophalangeal_side_value')->nullable();
            $table->string('metacarpophalangeal_number_value')->nullable();
            $table->string('metacarpophalangeal_Arr')->nullable();
            $table->string('nails_side_value')->nullable();
            $table->string('nails_number_value')->nullable();
            $table->string('nails_Arr')->nullable();
            $table->string('proximal_side_value')->nullable();
            $table->string('proximal_number_value')->nullable();
            $table->string('proximal_Arr')->nullable();
            $table->string('dorsum_of_hand_value')->nullable();
            $table->string('fingers_side_value')->nullable();
            $table->string('fingers_number_value')->nullable();
            $table->string('fingers_hand_Arr')->nullable();
            $table->string('palpation_interphalangeal_side_value')->nullable();
            $table->string('palpation_interphalangeal_number_value')->nullable();
            $table->string('palpation_interphalangeal_Arr')->nullable();
            $table->string('palpation_tenders_Arr')->nullable();
            $table->string('palpation_wrist_Arr')->nullable();
            $table->string('flexon_tendons_side_value')->nullable();
            $table->string('flexon_tendons_number_value')->nullable();
            $table->string('flexon_tendons_Arr')->nullable();
            $table->string('palpation_metacarpophalangeal_side_value')->nullable();
            $table->string('palpation_metacarpophalangeal_number_value')->nullable();
            $table->string('palpation_metacarpophalangeal_Arr')->nullable();
            $table->string('hand_movement_wrist_NR_ternary')->nullable();
            $table->string('hand_movement_finger')->nullable();
            $table->string('hand_movement_flexion_NR_ternary')->nullable();
            $table->string('hand_movement_extension_NR_ternary')->nullable();
            $table->string('hand_movement_supination_NR_ternary')->nullable();
            $table->string('hand_movement_pronation_NR_ternary')->nullable();

            $table->string('hand_movement_passive_flexion')->nullable();
            $table->string('hand_movement_Passive_Extension')->nullable();

            $table->string('finkelstein_test_ternary')->nullable();
            $table->string('wrish_flexion_test_PN_ternary')->nullable();
            $table->string('hand_murphy_sign_PN_ternary')->nullable();
            $table->string('handTinel_sign_PN_ternary')->nullable();
            $table->string('watson_test_PN_ternary')->nullable();
            $table->string('sweater_finger_sign_PN_ternary')->nullable();
            $table->string('flexor_digitorum_profundus_test_value')->nullable();
            $table->string('flexor_digitorum_superficialis_test_value')->nullable();
            $table->string('quervain_tenosynovitis_ternary')->nullable();


            $table->string('handHistoryValue')->nullable();
            
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
        Schema::dropIfExists('mhp_m_s_hand_and_wrists');
    }
}
