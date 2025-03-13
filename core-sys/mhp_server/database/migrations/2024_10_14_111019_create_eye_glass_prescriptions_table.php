<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEyeGlassPrescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eye_glass_prescriptions', function (Blueprint $table) {
            $table->id();
            $table->int('prescription_no')->default(0);
            $table->string('patient_id');
            $table->string('doctor_id');
            $table->string('appointment_id');
            $table->text('lens')->nullable();
            $table->text('multifocal')->nullable();
            $table->text('instruction')->nullable();
            $table->text('dist_left')->nullable();
            $table->text('dist_right')->nullable();
            $table->text('near_left')->nullable();
            $table->text('near_right')->nullable();
            $table->string('near_pd_left')->nullable();
            $table->string('near_pd_right')->nullable();
            $table->string('dist_pd_right')->nullable();
            $table->string('dist_pd_left')->nullable();
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
        Schema::dropIfExists('eye_glass_prescriptions');
    }
}
