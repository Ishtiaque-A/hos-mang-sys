<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPregnanciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_pregnancies', function (Blueprint $table) {
            $table->id();
            $table->string("patient_id")->nullable();
            $table->string("pregnancy_no")->nullable();
            $table->string("actual_lmp")->nullable();
            $table->string("scan_date")->nullable();
            $table->string("finish_date")->nullable();
            $table->string("managed_by")->nullable();
            $table->string("edc_by_scan")->nullable();
            $table->string("edc_by_lmp")->nullable();
            $table->string("scan_weeks")->nullable();
            $table->string("use_scan_date")->nullable();
            $table->string("geston_weeks")->nullable();
            $table->string("scan_days")->nullable();
            $table->string("outcome")->nullable();
            $table->string('complication')->nullable();
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
        Schema::dropIfExists('mhp_pregnancies');
    }
}
