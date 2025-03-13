<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPastHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_past_histories', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
            $table->dateTime('date')->nullable();
            $table->string('condition')->nullable();
            $table->string('code')->nullable();
            $table->string('saverty')->nullable();
            $table->string('description')->nullable();
            $table->string('summary')->nullable();
            $table->string('confidential')->nullable();
            $table->string('myHealthRecord')->nullable();
            $table->string('details')->nullable();
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
        Schema::dropIfExists('mhp_past_histories');
    }
}
