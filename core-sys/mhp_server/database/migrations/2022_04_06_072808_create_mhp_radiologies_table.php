<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpRadiologiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_radiologies', function (Blueprint $table) {
            $table->id();
            $table->string("center_date")->nullable();
            $table->string("center_id")->nullable();
            $table->string("test_date")->nullable();
            $table->string("test_name_id")->nullable();
            $table->string("test_type_id")->nullable();
            $table->string("symptom_name")->nullable();
            $table->string("clinical_id")->nullable();
            $table->string("radiology_test_category")->nullable();
            $table->string("radiology_test_name")->nullable();
            $table->string("additional_test_name")->nullable();
            $table->string("patient_id")->nullable();
            $table->integer("delete_status")->default(0);
            $table->string("saas_branch_id")->nullable();
            $table->string("saas_branch_name")->nullable();
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
        Schema::dropIfExists('mhp_radiologies');
    }
}
