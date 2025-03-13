<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpCustomMedicinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_custom_medicines', function (Blueprint $table) {
            $table->id();
             $table->string('custom_medicine_name')->nullable();
             $table->string('strength')->nullable();
             $table->string('medicine_category_id')->nullable();
             $table->string('other_details')->nullable();
             $table->string('route_id')->nullable();
             $table->string('qty')->nullable();
             $table->string('unit')->nullable();
             $table->string('repeats')->nullable();
             $table->string('restriction_id')->nullable();
            $table->string('delete_status')->default(0);
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
        Schema::dropIfExists('mhp_custom_medicines');
    }
}
