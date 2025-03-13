<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMusculoSketalThoracoLumberSpineTenderNessOversTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_musculo_sketal_thoraco_lumber_spine_tender_ness_overs', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id');
            $table->string('thoraco_lumber_spine_id');
            $table->string('tenderness_over_side');
            $table->string('tenderness_over_id');
            $table->string('value');
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
        Schema::dropIfExists('mhp_musculo_sketal_thoraco_lumber_spine_tender_ness_overs');
    }
}
