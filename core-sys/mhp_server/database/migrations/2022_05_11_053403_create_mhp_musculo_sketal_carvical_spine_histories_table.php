<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMusculoSketalCarvicalSpineHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_musculo_sketal_carvical_spine_histories', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id');
            $table->string('carvical_spine_id');
            $table->string('history_id');
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
        Schema::dropIfExists('mhp_musculo_sketal_carvical_spine_histories');
    }
}
