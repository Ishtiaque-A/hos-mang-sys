<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpLabModuleTestSubCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_lab_module_test_sub_categories', function (Blueprint $table) {
            $table->id();
            $table->string('test_group_id')->nullable();
            $table->string('test_category_id')->nullable();
            $table->string('test_sub_category_name')->nullable();
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
        Schema::dropIfExists('mhp_lab_module_test_sub_categories');
    }
}
