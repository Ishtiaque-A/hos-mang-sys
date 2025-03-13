<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpDoctorsLicenseTrainingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_doctors_license_trainings', function (Blueprint $table) {
            $table->id();
            $table->string('doctors_master_id')->nullable();
            $table->string('training_name')->nullable();
            $table->string('issuing_organization')->nullable();
            $table->string('issue_date')->nullable();
            $table->string('expire_date')->nullable();
            $table->string('credential_identity')->nullable();
            $table->string('credential_url')->nullable();
            $table->string('certificates_copy_title')->nullable();
            $table->string('certificates_copy')->nullable();
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
        Schema::dropIfExists('mhp_doctors_license_trainings');
    }
}
