<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaediatricPageThreesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_paediatric_page_threes', function (Blueprint $table) {
            $table->id();
              $table->string('hearing_problem')->nullable();
            $table->string('eye_problem')->nullable();
            $table->string('relatives_blind')->nullable();
            $table->string('other_illness')->nullable();
            $table->string('intensive_care')->nullable();
            $table->string('physical_problem')->nullable();
            $table->string('family_history')->nullable();
            $table->string('breech_birth')->nullable();
            $table->string('patient_id')->nullable();
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
        Schema::dropIfExists('mhp_paediatric_page_threes');
    }
}
