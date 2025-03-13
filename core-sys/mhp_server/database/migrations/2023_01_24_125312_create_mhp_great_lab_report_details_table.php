<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatLabReportDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_lab_report_details', function (Blueprint $table) {
            $table->id();
            $table->string('report_id')->nullable();
            $table->string('test_id')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('invoice_id')->nullable();
            $table->string('parameter_id')->nullable();
            $table->string('parameter_name')->nullable();
            $table->string('parameter_group_id')->nullable();
            $table->string('result')->nullable();
            $table->string('unit')->nullable();
            $table->string('lower_value')->nullable();
            $table->string('upper_value')->nullable();
            $table->string('flag')->nullable();
            $table->string('lab_no')->nullable();
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
        Schema::dropIfExists('mhp_great_lab_report_details');
    }
}
