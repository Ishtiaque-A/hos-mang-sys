<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMusculoSketalHipAndPelvisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_musculo_sketal_hip_and_pelvis', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('hip_ternary')->nullable();
            $table->string('sacroIliac_PN_ternary')->nullable();
            $table->string('ortolani_PN_ternary')->nullable();
            $table->string('inspection_look_value')->nullable();
            $table->string('thomas_test_PN_ternary')->nullable();
            $table->string('hipJoint_compression_PN_ternary')->nullable();
            $table->string('ober_test_PN_ternary')->nullable();
            $table->string('gait_value')->nullable();
            $table->string('patrick_PN_ternary')->nullable();
            $table->string('piriformis_PN_ternary')->nullable();
            $table->string('ely_test_PN_ternary')->nullable();
            $table->string('hip_jointtenderness_PA_ternary')->nullable();
            $table->string('greater_trochanter_LR_ternary')->nullable();
            $table->string('gluteus_medius_PA_ternary')->nullable();
            $table->string('trochanteric_bursi_PA_ternary')->nullable();
            $table->string('flexion135')->nullable();
            $table->string('abduction50')->nullable();
            $table->string('InternalRotation45')->nullable();
            $table->string('Extension20')->nullable();
            $table->string('Adduction45')->nullable();
            $table->string('alRotation45')->nullable();
            $table->string('trueLegLengthLeft')->nullable();
            $table->string('trueLegLengthRight')->nullable();
            $table->string('ApparentLegLengthLeft')->nullable();
            $table->string('ApparentLegLengthRight')->nullable();

            $table->string('hipHistoryValue')->nullable();

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
        Schema::dropIfExists('mhp_musculo_sketal_hip_and_pelvis');
    }
}
