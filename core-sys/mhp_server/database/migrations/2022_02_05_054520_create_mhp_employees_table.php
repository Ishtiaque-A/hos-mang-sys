<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_employees', function (Blueprint $table) {
            $table->id();
            $table->string('identity_no')->nullable();
            $table->string('title')->nullable();
            $table->string('department_id')->nullable();
            $table->string('specialists_id')->nullable();
            $table->string('department_name')->nullable();
            $table->string('first_name')->nullable();
            $table->string('given_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('preferred_name')->nullable();
            $table->string('address_line_1')->nullable();
            $table->string('address_line_2')->nullable();
            $table->string('bmdc_reg_no')->nullable();
            $table->string('email')->nullable();
            $table->string('is_referred')->nullable();
            $table->string('dob')->nullable();
            $table->string('birth_sex_id')->nullable();
            $table->string('city_id')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('home_phone')->nullable();
            $table->string('work_phone')->nullable();
            $table->string('mobile_phone')->nullable();
            $table->string('contact_via_id')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('user_type_id')->nullable();
            $table->string('image')->nullable();
            $table->string('signature_image')->nullable();
            $table->string('delete_status')->default(0);
            $table->string('saas_branch_id')->nullable();
            $table->string('saas_branch_name')->nullable();
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
        Schema::dropIfExists('mhp_employees');
    }
}
