<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDischargeSummariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('discharge_summaries', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id');
            $table->string('doctor_id');
            $table->text('general_practitioner')->nullable();
            $table->string('admission_date')->nullable();
            $table->string('admitting_doctor')->nullable();
            $table->string('admitting_doctor_phone')->nullable();
            $table->string('discharge_date')->nullable();
            $table->string('discharge_to')->nullable();
            $table->text('chief_complaint')->nullable();
            $table->text('history')->nullable();
            $table->text('diagnosis')->nullable();
            $table->text('investigation')->nullable();
            $table->string('operation_note')->nullable();
            $table->text('pain_relief')->nullable();
            $table->text('hygiene')->nullable();
            $table->text('exercise')->nullable();
            $table->text('dressing')->nullable();
            $table->text('wound_care')->nullable();
            $table->text('diet')->nullable();
            $table->text('recommendation')->nullable();
            $table->text('follow_up')->nullable();
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
        Schema::dropIfExists('discharge_summaries');
    }
}
