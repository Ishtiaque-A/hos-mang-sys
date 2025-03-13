<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPastObservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_past_observations', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('date')->nullable();
            $table->string('pulse')->nullable();
            $table->string('route')->nullable();
            $table->string('bp_sitting_left')->nullable();
            $table->string('bp_sitting_right')->nullable();
            $table->string('bp_standing_left')->nullable();
            $table->string('bp_standing_right')->nullable();
            $table->string('bp_lying_left')->nullable();
            $table->string('bp_lying_right')->nullable();
            $table->string('res_rate')->nullable();
            $table->string('sat')->nullable();
            $table->string('temp')->nullable();
            $table->string('type')->nullable();
            $table->string('weight')->nullable();
            $table->string('height')->nullable();
            $table->string('waist')->nullable();
            $table->string('hip')->nullable();
            $table->string('chest_insp')->nullable();
            $table->string('chest_exp')->nullable();
            $table->string('bsl')->nullable();
            $table->string('bsl_right_select')->nullable();
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
        Schema::dropIfExists('mhp_past_observations');
    }
}
