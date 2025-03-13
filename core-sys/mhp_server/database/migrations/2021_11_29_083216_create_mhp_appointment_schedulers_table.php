<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpAppointmentSchedulersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_appointment_schedulers', function (Blueprint $table) {
            $table->id();
            $table->string('doctors_id')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('patient_name')->nullable();
            $table->string('patient_mobile')->nullable();
            $table->string('notes')->nullable();
            $table->string('status_color')->nullable();
            $table->string('status_name')->nullable();
            $table->string('StartTime')->nullable();
            $table->string('EndTime')->nullable();
            $table->string('Subject')->nullable();
            $table->string('app_type')->nullable();
            $table->string('mediaType_online')->nullable();
            $table->string('media')->nullable();
            $table->integer('delete_status')->default(0);
            $table->boolean('appointment_completed')->default(0);
            $table->string('created_by')->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->string('saas_branch_name')->nullable();
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
        Schema::dropIfExists('mhp_appointment_schedulers');
    }
}
