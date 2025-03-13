<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMentalHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_mental_histories', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullValue();
            $table->string('mental_health_id')->nullValue();
            $table->string('history_id')->nullValue();
            $table->string('value')->nullValue();
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
        Schema::dropIfExists('mhp_mental_histories');
    }
}
