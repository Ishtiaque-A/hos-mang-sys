<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpSymptomAnatomiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_symptom_anatomies', function (Blueprint $table) {
            $table->id();
              $table->string('main_body_part_id')->nullable();
              $table->string('sub_body_part_id')->nullable();
              $table->string('side_selection_name')->nullable();
              $table->string('gender_id')->nullable();
              $table->string('symptom_name')->nullable();
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
        Schema::dropIfExists('mhp_symptom_anatomies');
    }
}
