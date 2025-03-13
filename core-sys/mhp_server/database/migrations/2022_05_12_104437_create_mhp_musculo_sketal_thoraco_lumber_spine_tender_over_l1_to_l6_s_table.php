<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMusculoSketalThoracoLumberSpineTenderOverL1ToL6STable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_musculo_sketal_thoraco_lumber_spine_tender_over_l1_to_l6_s', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id');
            $table->string('thoraco_lumber_spine_id');
            $table->string('tender_over_l1_to_l6_id');
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
        Schema::dropIfExists('mhp_musculo_sketal_thoraco_lumber_spine_tender_over_l1_to_l6_s');
    }
}
