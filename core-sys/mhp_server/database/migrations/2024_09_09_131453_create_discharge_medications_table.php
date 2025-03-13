<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDischargeMedicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('discharge_medications', function (Blueprint $table) {
            $table->id();
            $table->string('discharge_id')->nullable();
            $table->string('drug_id')->nullable();
            $table->string('drug_name')->nullable();
            $table->string('drug_description')->nullable();
            $table->string('dose')->nullable();
            $table->string('frequency')->nullable();
            $table->string('instruction')->nullable();
            $table->string('prn')->nullable();
            $table->string('qty')->nullable();
            $table->string('repeat')->nullable();
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
        Schema::dropIfExists('discharge_medications');
    }
}
