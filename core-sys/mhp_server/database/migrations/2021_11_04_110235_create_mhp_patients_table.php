<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_patients', function (Blueprint $table) {
            $table->id();
            $table->text('patient_hn_number')->nullable();
            $table->text('patient_title_id')->nullable();
            $table->text('patient_nid')->nullable();
            $table->text('patient_bcid')->nullable();
            $table->text('ptn_blood_group_id')->nullable();
            $table->text('patient_first_name')->nullable();
            $table->text('patient_middle_name')->nullable();
            $table->text('patient_last_name')->nullable();
            $table->text('patient_preferred_name')->nullable();
            $table->text('patient_contact_via')->nullable();
            $table->text('patient_home_phone')->nullable();
            $table->text('patient_work_phone')->nullable();
            $table->text('patient_mobile_phone')->nullable();
            $table->text('patient_head_of_family')->nullable();
            $table->text('patient_emergency_contact')->nullable();
            $table->text('patient_dob')->nullable();
            $table->text('patient_passport')->nullable();
            $table->text('patient_status')->nullable();
            $table->text('patient_email')->nullable();
            $table->text('patient_birth_sex_id')->nullable();
            $table->text('patient_individual_health_identifier_no')->nullable();
            $table->text('patient_religion_id')->nullable();
            $table->text('patient_usual_provider_id')->nullable();
            $table->text('patient_ethnicity_id')->nullable();
            $table->text('patient_parent_id')->nullable();
            $table->text('patient_address1')->nullable();
            $table->text('patient_address2')->nullable();
            $table->text('patient_usual_visit_type_id')->nullable();
            $table->text('patient_usual_account')->nullable();
            $table->text('patient_deceased_date')->nullable();
            $table->text('patient_next_of_kin')->nullable();
            $table->text('patient_medical_record_no')->nullable();
            $table->text('patient_city_id')->nullable();
            $table->text('patient_state_id')->nullable();
            $table->text('patient_safety_net_no')->nullable();
            $table->text('patient_postal_code')->nullable();
            $table->text('patient_health_inc_fund')->nullable();
            $table->text('patient_health_inc_no')->nullable();
            $table->text('patient_expire_date')->nullable();
            $table->text('patient_medical_no')->nullable();
            $table->text('patient_occupation_id')->nullable();
            $table->text('patient_hcc_no')->nullable();
            $table->text('patient_images')->nullable();
            $table->text('patient_general_notes')->nullable();
            $table->text('patient_appointment_notes')->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->string('saas_branch_name')->nullable();
            $table->integer('doctor_id')->default(0);
            $table->text('media')->nullable();
            $table->boolean('lactation')->default(0);
            $table->text('delete_status')->default(0);
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
        Schema::dropIfExists('mhp_patients');
    }
}
