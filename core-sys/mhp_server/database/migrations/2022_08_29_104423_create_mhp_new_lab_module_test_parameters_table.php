<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpNewLabModuleTestParametersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_new_lab_module_test_parameters', function (Blueprint $table) {
            $table->id();

            $table->string("parameter")->nullable();
            $table->string("gender")->nullable();
            $table->string("minimum_age")->nullable();
            $table->string("maximum_age")->nullable();
            $table->string("lower_value")->nullable();
            $table->string("upper_value")->nullable();
            $table->string("in_words")->nullable();
            $table->longText("normal_value")->nullable();
            $table->string("test_name_id")->nullable();
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
        Schema::dropIfExists('mhp_new_lab_module_test_parameters');
    }
}
