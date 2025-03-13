<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaediatricChildHealthCheck6sTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_paediatric_child_health_check6s', function (Blueprint $table) {
            $table->id();
             $table->string('patient_id')->nullable();
            $table->string('weight')->nullable();
            $table->string('length')->nullable();
            $table->string('head_circumference')->nullable();
            $table->string('corneal_light')->nullable();
            $table->string('fixation')->nullable();
            $table->string('one_eye_respone')->nullable();
            $table->string('eye_movement')->nullable();
            $table->string('visible_plaque')->nullable();
            $table->string('white_spot')->nullable();
            $table->string('clinical_ovserbation')->nullable();
            $table->string('testes_descended_side')->nullable();
            $table->string('testes_descended_value')->nullable();
            $table->string('family_health_history')->nullable();
            $table->string('parent_qtn')->nullable();
            $table->string('age_appropriate')->nullable();
            $table->string('hearing')->nullable();
            $table->string('vision')->nullable();
            $table->string('hips')->nullable();
            $table->string('outcome')->nullable();
            $table->string('oral_health')->nullable();
            $table->string('comments')->nullable();
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
        Schema::dropIfExists('mhp_paediatric_child_health_check6s');
    }
}
