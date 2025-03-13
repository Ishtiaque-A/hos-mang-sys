<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpCnsUpperLimbsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_cns_upper_limbs', function (Blueprint $table) {
            $table->id();
            $table->string('cns_part2_id')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('upperlimb_id')->nullable();
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
        Schema::dropIfExists('mhp_cns_upper_limbs');
    }
}
