<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPrescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_prescriptions', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
            $table->string('medicen_id')->nullable();
            $table->string('prescription_no')->nullable();
            $table->string('prescription_date')->nullable();
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
        Schema::dropIfExists('mhp_prescriptions');
    }
}
