<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpNeurologicalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_neurologicals', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('intermittent')->nullable();
            $table->string('continuous')->nullable();
            $table->string('historyValue')->nullable();
            $table->string('speechValue')->nullable();
            $table->string('parietal')->nullable();
            $table->string('occipital')->nullable();
            $table->string('frontal')->nullable();
            $table->string('temporal')->nullable();
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
        Schema::dropIfExists('mhp_neurologicals');
    }
}
