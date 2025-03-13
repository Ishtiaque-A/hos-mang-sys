<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpLabAgentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_lab_agents', function (Blueprint $table) {
            $table->id();
            $table->string('type')->nullable();
            $table->string('title')->nullable();
            $table->string('name')->nullable();
            $table->string('fatherName')->nullable();
            $table->string('motherName')->nullable();
            $table->string('dob')->nullable();
            $table->string('gender')->nullable();
            $table->string('workPhone')->nullable();
            $table->string('mobilePhone')->nullable();
            $table->string('email')->nullable();
            $table->string('address')->nullable();
            $table->string('housePlan')->nullable();
            $table->string('emergencyCenter')->nullable();
            $table->string('specialist')->nullable();
            $table->string('specialistArray')->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->string('saas_branch_name')->nullable();
            $table->string('image')->nullable();
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
        Schema::dropIfExists('mhp_lab_agents');
    }
}
