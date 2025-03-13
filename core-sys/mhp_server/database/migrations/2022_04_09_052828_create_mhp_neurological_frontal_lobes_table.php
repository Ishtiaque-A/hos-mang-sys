<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpNeurologicalFrontalLobesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_neurological_frontal_lobes', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('neurological_id')->nullable();
            $table->string('frontal_lobes_id')->nullable();
            $table->string('value')->nullable();
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
        Schema::dropIfExists('mhp_neurological_frontal_lobes');
    }
}
