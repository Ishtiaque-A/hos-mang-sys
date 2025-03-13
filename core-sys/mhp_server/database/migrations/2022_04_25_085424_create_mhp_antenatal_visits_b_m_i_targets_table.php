<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpAntenatalVisitsBMITargetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_antenatal_visits_b_m_i_targets', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('antenatal_visits_id')->nullable();
            $table->string('bMITarget_id')->nullable();
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
        Schema::dropIfExists('mhp_antenatal_visits_b_m_i_targets');
    }
}
