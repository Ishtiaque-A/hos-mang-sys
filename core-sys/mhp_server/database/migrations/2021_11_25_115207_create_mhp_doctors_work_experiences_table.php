<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpDoctorsWorkExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_doctors_work_experiences', function (Blueprint $table) {
            $table->id();
            $table->string('doctors_master_id')->nullable();
            $table->string('work_experience_title')->nullable();
            $table->string('employment_title')->nullable();
            $table->string('company')->nullable();
            $table->string('location')->nullable();
            $table->string('start_date')->nullable();
            $table->string('end_date')->nullable();
            $table->string('is_present')->nullable();
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
        Schema::dropIfExists('mhp_doctors_work_experiences');
    }
}
