<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpVitalSignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_vital_signs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('value')->nullable();
            $table->string('desc')->nullable();
            $table->string('icon')->nullable();
            $table->string('color')->nullable();
            $table->string('units_id')->nullable();

            $table->string('nurse_id')->nullable();
            $table->string('ref_range_value')->nullable();
            $table->string('remarks')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('time')->nullable();
            
            $table->integer('status_id')->nullable();
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
        Schema::dropIfExists('mhp_vital_signs');
    }
}
