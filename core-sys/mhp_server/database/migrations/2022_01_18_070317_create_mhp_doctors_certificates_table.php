<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpDoctorsCertificatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_doctors_certificates', function (Blueprint $table) {
            $table->id();
            $table->string('doctors_master_id')->nullable();
            $table->string('certificate_title')->nullable();
            $table->string('certificate_name')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('country_id')->nullable();
            $table->string('city_id')->nullable();
            $table->string('scan_copy_title')->nullable();
            $table->string('scan_copy')->nullable();
            $table->string('details_of_course')->nullable();
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
        Schema::dropIfExists('mhp_doctors_certificates');
    }
}
