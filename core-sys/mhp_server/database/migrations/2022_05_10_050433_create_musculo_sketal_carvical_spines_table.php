<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMusculoSketalCarvicalSpinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('musculo_sketal_carvical_spines', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('posture')->nullable();
            $table->string('compareTo')->nullable();

        $table->string('historyValue')->nullable();
        $table->string('tender')->nullable();
        $table->string('tenerness')->nullable();

        $table->string('forwardFlexion45')->nullable();
        $table->string('backwardExtension45')->nullable();
        $table->string('lateralBending45')->nullable();
        $table->string('lateralBendingLeft45')->nullable();
        $table->string('rotationOver75')->nullable();
        $table->string('rotationOverLeft75')->nullable();
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
        Schema::dropIfExists('musculo_sketal_carvical_spines');
    }
}
