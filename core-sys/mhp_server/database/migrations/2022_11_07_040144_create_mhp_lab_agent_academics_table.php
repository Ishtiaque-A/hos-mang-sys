<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpLabAgentAcademicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_lab_agent_academics', function (Blueprint $table) {
            $table->id();
            $table->string("lab_agent_master_id")->nullable();
            $table->string("degreeName")->nullable();
            $table->string("countryName")->nullable();
            $table->string("passingYear")->nullable();
            $table->string("cityName")->nullable();
            $table->string("result")->nullable();
            $table->string("scanCopyTitle")->nullable();
            $table->string("institutionName")->nullable();
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
        Schema::dropIfExists('mhp_lab_agent_academics');
    }
}
