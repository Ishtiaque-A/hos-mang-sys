<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpWomenHealthExamiBreastLumpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_women_health_exami_breast_lumps', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('women_health_id')->nullable();
            $table->string('breast_lumps_id')->nullable();
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
        Schema::dropIfExists('mhp_women_health_exami_breast_lumps');
    }
}
