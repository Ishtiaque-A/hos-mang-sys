<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpLabAgentWorkExpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_lab_agent_work_exps', function (Blueprint $table) {
            $table->id();
            $table->string("lab_agent_master_id")->nullable();
            $table->string("title")->nullable();
            $table->string("startDate")->nullable();
            $table->string("employmentType")->nullable();
            $table->string("isPresent")->nullable();
            $table->string("companyName")->nullable();
            $table->string("endDate")->nullable();
            $table->string("location")->nullable();
            $table->string("certificateCopy")->nullable();
            $table->string("scanCopy")->nullable();
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
        Schema::dropIfExists('mhp_lab_agent_work_exps');
    }
}
