<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMedicationChartPartOneAllTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_medication_chart_part_one_all_tables', function (Blueprint $table) {
            $table->id();
            $table->string('service_id')->nullable();
            $table->string('ward_id')->nullable();
            $table->string('additional_checkbox')->nullable();
            $table->string('aid')->nullable();
            $table->string('community')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
            $table->string('gb')->nullable();
            $table->string('preHospital')->nullable();  
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
        Schema::dropIfExists('mhp_medication_chart_part_one_all_tables');
    }
}
