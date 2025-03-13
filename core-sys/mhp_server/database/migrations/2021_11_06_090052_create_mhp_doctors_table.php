<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpDoctorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_doctors', function (Blueprint $table) {
            $table->id();
            $table->string('dr_identity_no')->nullable();
            $table->string('title')->nullable();
            $table->string('dr_family_name')->nullable();
            $table->string('dr_given_name')->nullable();
            $table->string('dr_middle_name')->nullable();
            $table->string('dr_preferred_name')->nullable();
            $table->string('dr_address_line_1')->nullable();
            $table->string('dr_address_line_2')->nullable();
            $table->string('dr_bmdc_reg_no')->nullable();
            $table->integer('dr_email')->nullable();
            $table->string('dr_is_referred')->nullable();
            $table->string('dr_dob')->nullable();
            $table->string('dr_birth_sex_id')->nullable();
            $table->string('dr_city_id')->nullable();
            $table->string('dr_postal_code')->nullable();
            $table->string('dr_home_phone')->nullable();
            $table->string('dr_work_phone')->nullable();
            $table->string('dr_mobile_phone')->nullable();
            $table->string('dr_contact_via_id')->nullable();
            $table->string('dr_provider_id')->nullable();
            $table->integer('dr_images')->default(0);
            $table->integer('delete_status')->default(0);
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
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
        Schema::dropIfExists('mhp_doctors');
    }
}
