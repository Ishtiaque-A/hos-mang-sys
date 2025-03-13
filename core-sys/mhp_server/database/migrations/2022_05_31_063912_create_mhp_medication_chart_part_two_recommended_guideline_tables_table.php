<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMedicationChartPartTwoRecommendedGuidelineTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_medication_chart_part_two_recommended_guideline_tables', function (Blueprint $table) {
            $table->id();
            $table->string('time__schedule')->nullable();
            $table->string('time__one')->nullable();
            $table->string('time__two')->nullable();
            $table->string('time__three')->nullable();
            $table->string('time__four')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
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
        Schema::dropIfExists('mhp_medication_chart_part_two_recommended_guideline_tables');
    }
}
