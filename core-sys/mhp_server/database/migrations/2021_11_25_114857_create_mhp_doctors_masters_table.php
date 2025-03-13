<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpDoctorsMastersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_doctors_masters', function (Blueprint $table) {
            $table->id();
            $table->string('dr_identity_no')->nullable();
            $table->string('title')->nullable();
            $table->string('department_id')->nullable();
            $table->string('specialists_id')->nullable();
            $table->string('department_name')->nullable();
            $table->string('dr_family_name')->nullable();
            $table->string('dr_given_name')->nullable();
            $table->string('dr_middle_name')->nullable();
            $table->string('dr_last_name')->nullable();
            $table->string('dr_preferred_name')->nullable();
            $table->string('dr_about')->nullable();
            $table->string('work_experience_years')->nullable();
            $table->string('dr_address_line_1')->nullable();
            $table->string('dr_address_line_2')->nullable();
            $table->string('dr_bmdc_reg_no')->nullable();
            $table->string('dr_email')->nullable();
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
            $table->string('dr_images')->nullable();
            $table->string('doctor_fee')->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->string('saas_branch_name')->nullable();
            $table->string('delete_status')->default(0);
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->timestamps();
            $table->text("app_token")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mhp_doctors_masters');
    }
}
