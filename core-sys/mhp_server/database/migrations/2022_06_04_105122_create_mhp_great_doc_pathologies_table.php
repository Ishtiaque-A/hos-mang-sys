<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatDocPathologiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_doc_pathologies', function (Blueprint $table) {
            $table->id();
             $table->string("patient_id")->nullable();
              $table->string("request_date")->nullable();
            $table->string("laboratory_id")->nullable();
            $table->string("favorite_test_name")->nullable();
           $table->string("test_name")->nullable();
        $table->string("clinical_details_fasting")->nullable();
         $table->string("lmp_date")->nullable();
         $table->string("edc_date")->nullable();
         $table->boolean("pregnant")->nullable()->comment('1=true,0=false');
        $table->string("billing")->nullable();
        $table->string("clinical_details_id")->nullable();
        $table->string("extra_details")->nullable();
        $table->string("further_clinical_details")->nullable();
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
        Schema::dropIfExists('mhp_great_doc_pathologies');
    }
}
