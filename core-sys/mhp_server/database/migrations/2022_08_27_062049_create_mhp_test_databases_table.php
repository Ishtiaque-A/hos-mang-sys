<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpTestDatabasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_test_databases', function (Blueprint $table) {
            $table->id();
            $table->string("test_group_id")->nullable();

            $table->string("test_category_id")->nullable();
            $table->string("test_name_id")->nullable();
            $table->string("sub_test_name")->nullable();
            $table->string("sub_test_fee")->nullable();
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
        Schema::dropIfExists('mhp_test_databases');
    }
}
