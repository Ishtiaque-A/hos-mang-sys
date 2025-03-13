<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewPathologySetupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('new_pathology_setups', function (Blueprint $table) {
            $table->id();
            $table->string('pathology_laboratory_name')->nullable();
            $table->string('laboratory_id')->nullable();
            $table->string('pathology_test_category')->nullable();
            $table->string('test_category_id')->nullable();
            $table->string('clinical_id')->nullable();
            $table->string('pathology_clinical_details_name')->nullable();
            $table->string('center_date')->nullable();
            $table->string('pathology_test_name')->nullable();
            $table->string('test_name_id')->nullable();
            $table->string('additional_test_name')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('lmpDate')->nullable();
            $table->string('fasting')->nullable();
            $table->string('pregnant')->nullable();
            $table->string('edcDate')->nullable();
            $table->string('billing_type')->nullable();
            $table->string('concession')->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->string('saas_branch_name')->nullable();
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
        Schema::dropIfExists('new_pathology_setups');
    }
}
