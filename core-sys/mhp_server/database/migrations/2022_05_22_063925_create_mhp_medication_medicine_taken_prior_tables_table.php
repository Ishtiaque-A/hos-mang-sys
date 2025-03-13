<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMedicationMedicineTakenPriorTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_medication_medicine_taken_prior_tables', function (Blueprint $table) {
            $table->id();
            $table->string('dose_of_frequency')->nullable();
            $table->string('dose_name')->nullable();
            $table->string('duration')->nullable();
            $table->string('route')->nullable();
            $table->string('medicine_name')->nullable();
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
        Schema::dropIfExists('mhp_medication_medicine_taken_prior_tables');
    }
}
