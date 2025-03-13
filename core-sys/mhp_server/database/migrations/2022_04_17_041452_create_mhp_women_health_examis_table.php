<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpWomenHealthExamisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_women_health_examis', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('LMP_date')->nullable();
            $table->string('LSCS_ternary')->nullable();
            $table->string('pregnant_ternary')->nullable();
            $table->string('lastCervicalScreen_date')->nullable();
            $table->string('periodType_input')->nullable();
            $table->string('periodDays_input')->nullable();
            $table->string('periodCycle_input')->nullable();
            $table->string('periodYears_input')->nullable();
            $table->string('volume_value')->nullable();
            $table->string('PVBleeding_vale')->nullable();
            $table->string('PVDischarge_value')->nullable();
            $table->string('vulval_value')->nullable();
            $table->string('miscarriage_value')->nullable();
            $table->string('breastLump_side_value')->nullable();
            $table->string('breast_pain_ternary_value')->nullable();
            $table->string('breast_abscess_ternary_value')->nullable();
            $table->string('pelvic_mass')->nullable();
            $table->string('forniceal_tenderness_ternary')->nullable();
            $table->string('bulky_uterus_ternary')->nullable();
            $table->string('breast_ternery')->nullable();
            $table->string('peau_ternary')->nullable();
            $table->string('redness_ternary')->nullable();
            $table->string('nipple_inversion_ternary')->nullable();
            $table->string('visibleVeins_ternary')->nullable();
            $table->string('teethering_ternary')->nullable();
            $table->string('hot_ternary')->nullable();
            $table->string('axillary_nodes_ternary')->nullable();
            $table->string('skin_dimpling_ternary')->nullable();
            $table->string('asymetric_elevation_ternary')->nullable();
            $table->string('supraclavicular_node_ternary')->nullable();
            $table->string('swelling_ternary')->nullable();
            $table->string('lump_cm_for_nipple_ternary')->nullable();
            $table->string('lump_o_clock')->nullable();
            $table->string('bartholin_glandes_value')->nullable();
            $table->string('forniceal_mass_value')->nullable();
            $table->string('anteverted_uterus_ternary')->nullable();
            $table->string('uterine_tenderness_ternary')->nullable();
            $table->string('retroverted_uterus_ternary')->nullable();
            $table->string('LMP_input')->nullable();
            $table->string('LLO_ternary')->nullable();
            $table->string('LUI_ternary')->nullable();
            $table->string('RLO_ternary')->nullable();
            $table->string('LLI_ternary')->nullable();
            $table->string('RLI_ternary')->nullable();
            $table->string('RUO_ternary')->nullable();
            $table->string('MUI_ternary')->nullable();

            $table->string('vulva')->nullable();
            $table->string('breastNippleDischarge')->nullable();
            $table->string('cst')->nullable();
            $table->longText('obstetricsValue')->nullable();
            $table->string('breastLump')->nullable();
            $table->string('cervix')->nullable();
            $table->string('gynecologiesValue')->nullable();

            $table->string('lumpX')->nullable();
            $table->string('lumpY')->nullable();
            $table->string('bartholinGlandesSide')->nullable();
            $table->string('LUO_ternary')->nullable();

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
        Schema::dropIfExists('mhp_women_health_examis');
    }
}
