<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaediatricTwoYearsChildHealthsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_paediatric_two_years_child_healths', function (Blueprint $table) {
            $table->id();
                $table->string('patient_id')->nullable();
            $table->string('weight')->nullable();
            $table->string('height')->nullable();
            $table->string('observer_gait')->nullable();
            $table->string('corneal_light')->nullable();
            $table->string('fixation')->nullable();
            $table->string('one_eye_respone')->nullable();
            $table->string('eye_movement')->nullable();
            $table->string('visible_plaque')->nullable();
            $table->string('white_spot')->nullable();
            $table->string('age_appropriate')->nullable();
            $table->string('parent_qtn')->nullable();
            $table->string('hearing')->nullable();
            $table->string('vision')->nullable();
            $table->string('eye_observation')->nullable();
            $table->string('outcome')->nullable();
            $table->string('oral_health')->nullable();
            $table->boolean('oral_health_lip')->nullable()->comment('1=true,0=false');
            $table->string('comments')->nullable();
            $table->string('bleeding_gum')->nullable();
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
        Schema::dropIfExists('mhp_paediatric_two_years_child_healths');
    }
}
