<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpLabTestParameterNameAndUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_lab_test_parameter_name_and_units', function (Blueprint $table) {
            $table->id();
            $table->string('test_id');
            $table->string('parameter_name');
            $table->string('parameter_unit');
            $table->string('parameter_group_id')->nullable();
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
        Schema::dropIfExists('mhp_lab_test_parameter_name_and_units');
    }
}
