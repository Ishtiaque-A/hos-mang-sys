<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorRoundsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctor_rounds', function (Blueprint $table) {
            $table->id();
            $table->string('doctorId');
            $table->string('residentId');
            $table->string('patient_id');
            $table->string('appointment_id');
            $table->string('admission_id')->nullable();
            $table->string('consultant_id')->nullable();
            $table->string('protocolId')->nullable();
            $table->text('freshComplaint')->nullable();
            $table->string('day')->nullable();
            $table->string('cycle')->nullable();
            $table->string('date')->nullable();
            // general
            $table->text('anaemic')->nullable();
            $table->text('jaundiced')->nullable();
            $table->text('cyanosis')->nullable();
            $table->text('skin_turgor')->nullable();
            $table->text('capillary_refill')->nullable();
            $table->text('nail_sign')->nullable();
            $table->text('dehydration')->nullable();
            $table->text('radio_femoral_delay')->nullable();
            $table->text('mucositis')->nullable();
            $table->text('ecog_scale')->nullable();
            $table->text('kps_scale')->nullable();
            $table->text('pathology_result')->nullable();
            $table->text('temperature')->nullable();
            $table->text('o2_saturation')->nullable();
            $table->text('blood_sugar')->nullable();
            $table->text('blood_sugar_type')->nullable();
            $table->text('pulse')->nullable();
            $table->text('respiratory_rate')->nullable();

            // Blood Pressure
            $table->string('bp_sitting_systolic')->nullable();
            $table->string('bp_sitting_diastolic')->nullable();
            $table->string('bp_standing_systolic')->nullable();
            $table->string('bp_standing_diastolic')->nullable();
            $table->string('bp_lying_systolic')->nullable();
            $table->string('bp_lying_diastolic')->nullable();

            // Measurements
            $table->string('weight')->nullable();
            $table->string('height')->nullable();
            $table->string('body_surface_area')->nullable();
            $table->string('bmi')->nullable();
            $table->string('waist_measurement')->nullable();
            $table->string('hip_measurement')->nullable();
            $table->string('whr')->nullable();
            $table->text('abdomen')->nullable();
            $table->text('abdominal_guard')->nullable();
            $table->text('skin')->nullable();
            $table->text('chest')->nullable();
            $table->text('cns')->nullable();
            $table->text('cvs')->nullable();
            $table->text('consultants_advice')->nullable();
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
        Schema::dropIfExists('doctor_rounds');
    }
}
