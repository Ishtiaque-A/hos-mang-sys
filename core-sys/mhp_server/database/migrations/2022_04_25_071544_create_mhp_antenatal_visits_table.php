<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpAntenatalVisitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_antenatal_visits', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
            $table->longText('image')->nullable();
            $table->string('systolic_value')->nullable();
            $table->string('diastolic_ternary')->nullable();
            $table->string('height_ternary')->nullable();
            $table->string('weight_ternary')->nullable();
            $table->string('bMI_ternary')->nullable();
            $table->string('bmi_terget')->nullable();
            $table->string('prePregnancyBMI_ternary')->nullable();
            $table->string('gestation_ternary')->nullable();
            $table->string('protine_ternary')->nullable();
            $table->string('glucose_ternary')->nullable();
            $table->string('others_ternary')->nullable();
            $table->string('fundalHeight_ternary')->nullable();
            $table->string('size_ternary')->nullable();
            $table->string('clinical_ternary')->nullable();
            $table->string('foetalMovement_ternary')->nullable();
            $table->string('presentation_ternary')->nullable();
            $table->string('position_ternary')->nullable();
            $table->string('foetalHeartSound_ternary')->nullable();
            $table->string('dTpa_ternary')->nullable();
            $table->string('influenza_ternary')->nullable();
            $table->string('antiD_ternary')->nullable();
            $table->string('i8Weeks_ternary')->nullable();
            $table->string('i36Weeks_ternary')->nullable();
            $table->string('antenatal_visits_date')->nullable();
            $table->string('text_value')->nullable();
            $table->string('next_date')->nullable();
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
        Schema::dropIfExists('mhp_antenatal_visits');
    }
}
