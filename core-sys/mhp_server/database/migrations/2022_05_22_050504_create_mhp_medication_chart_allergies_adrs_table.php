<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMedicationChartAllergiesAdrsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_medication_chart_allergies_adrs', function (Blueprint $table) {
            $table->id();
            $table->string('medicine_id')->nullable();
            $table->string('allergy_id')->nullable();
            $table->string('reaction_type_id')->nullable();
            $table->string('initials')->nullable();
            $table->string('others')->nullable();
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
        Schema::dropIfExists('mhp_medication_chart_allergies_adrs');
    }
}
