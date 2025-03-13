<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestNameConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    // test_name_id: null,
    // parameter_id: null,
    // child_lower_value: null,
    // child_upper_value: null,
    // child_normal_value: null,
    // male_lower_value: null,
    // male_upper_value: null,
    // male_normal_value: null,
    // female_lower_value: null,
    // female_upper_value: null,
    // female_normal_value: null,
    public function up()
    {
        Schema::create('test_name_configs', function (Blueprint $table) {
            $table->id();
            $table->integer('test_name_id');
            $table->integer('parameter_id')->unique();
            $table->longText('child_lower_value');
            $table->longText('child_upper_value');
            $table->longText('child_normal_value');
            $table->longText('male_lower_value');
            $table->longText('male_upper_value');
            $table->longText('male_normal_value');
            $table->longText('female_lower_value');
            $table->longText('female_upper_value');
            $table->longText('female_normal_value');
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
        Schema::dropIfExists('test_name_configs');
    }
}
