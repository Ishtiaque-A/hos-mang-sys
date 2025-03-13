<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatDocDiagnosesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_doc_diagnoses', function (Blueprint $table) {
            $table->id();
            $table->string("diagnosis_action_name")->nullable();
            $table->string("diagnosis_for_name")->nullable();
            $table->string("diagnosis_further_details")->nullable();
            $table->string("diagnosis_name")->nullable();
            $table->string("code")->nullable();
            $table->string("diagnosis_provitional_status")->nullable();
            $table->string("patient_id")->nullable();
            $table->integer("delete_status")->default(0);
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
        Schema::dropIfExists('mhp_great_doc_diagnoses');
    }
}
