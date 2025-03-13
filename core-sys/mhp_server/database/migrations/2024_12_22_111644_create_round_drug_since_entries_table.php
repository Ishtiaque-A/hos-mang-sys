<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoundDrugSinceEntriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('round_drug_since_entries', function (Blueprint $table) {
            $table->id();
            $table->string('master_id');
            $table->string('drug_id')->nullable();
            $table->string('dose')->nullable();
            $table->string('days')->nullable();
            $table->string('route')->nullable();
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
        Schema::dropIfExists('round_drug_since_entries');
    }
}
