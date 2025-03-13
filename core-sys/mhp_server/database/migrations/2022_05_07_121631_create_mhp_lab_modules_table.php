<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpLabModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_lab_modules', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
            $table->string('report_id')->nullable();
            $table->string('lab_name')->nullable();
            $table->string('center_id')->nullable();
            $table->string('status')->nullable();
            $table->longText('report_file')->nullable();
            $table->longText('report_support_file')->nullable();
            $table->longText('report_description')->nullable();
            $table->longText('result')->nullable();
            $table->longText('action_taken')->nullable();
            $table->string(('saas_branch_id'))->nullable();
            $table->string(('saas_branch_name'))->nullable();
            $table->longText('remarks')->nullable();
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
        Schema::dropIfExists('mhp_lab_modules');
    }
}
