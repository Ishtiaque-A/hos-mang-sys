<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpIngerdientChildrenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_ingerdient_children', function (Blueprint $table) {
            $table->id();
             $table->string('custom_medicine_id')->nullable();
             $table->string('ingredient_id')->nullable();
             $table->string('ingredient_strength')->nullable();
             $table->string('ingredient_unit')->nullable();
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
        Schema::dropIfExists('mhp_ingerdient_children');
    }
}
