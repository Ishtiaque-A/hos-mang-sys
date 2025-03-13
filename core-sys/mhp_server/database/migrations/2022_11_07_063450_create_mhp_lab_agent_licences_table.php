<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpLabAgentLicencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_lab_agent_licences', function (Blueprint $table) {
            $table->id();
            $table->string("lab_agent_master_id")->nullable();
            $table->string("title")->nullable();
            $table->string("credentialID")->nullable();
            $table->string("issueOrganize")->nullable();
            $table->string("credentialURL")->nullable();
            $table->string("issueDate")->nullable();
            $table->string("certificateCopy")->nullable();
            $table->string("expireDate")->nullable();
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
        Schema::dropIfExists('mhp_lab_agent_licences');
    }
}
