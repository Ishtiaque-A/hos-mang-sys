<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatLabReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_lab_reports', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_id')->nullable();
            $table->string('invoice_no')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('test_id')->nullable();
            $table->string('test_name')->nullable();
            $table->string('test_group')->nullable();
            $table->string('gender')->nullable();
            $table->string('technician_name')->nullable();
            $table->string('technician_sign')->nullable();
            $table->string('validator')->nullable();
            $table->string('status')->nullable();
            $table->longText('remark')->nullable();
            $table->longText('report_confirm')->nullable();
            $table->string('radiogyReportImage')->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->string('saas_branch_name')->nullable();
            $table->longText('radiologyReportDetails')->nullable();
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
        Schema::dropIfExists('mhp_great_lab_reports');
    }
}
