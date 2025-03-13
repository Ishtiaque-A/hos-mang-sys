<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpAutoFillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_auto_fills', function (Blueprint $table) {
            $table->id();
            $table->string('autoFill_name')->nullable();
            $table->string('autoFill_text')->nullable();
            $table->string('autoFill_history')->nullable();
            $table->integer('delete_status')->default(0);
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
        Schema::dropIfExists('mhp_auto_fills');
    }
}
