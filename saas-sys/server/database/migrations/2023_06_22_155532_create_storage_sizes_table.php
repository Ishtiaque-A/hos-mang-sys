<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */


    public function up() {
        Schema::create('storage_sizes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->integer('size')->comment('size in mb');
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
        Schema::dropIfExists('storage_sizes');
    }
};
