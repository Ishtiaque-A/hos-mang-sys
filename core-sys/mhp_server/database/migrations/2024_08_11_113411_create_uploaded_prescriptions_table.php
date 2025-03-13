<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUploadedPrescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('uploaded_prescriptions', function (Blueprint $table) {
            $table->id();
            $table->string('doctor_id');
            $table->string('patient_id');
            $table->string('appointment_id');
            $table->string('patient_hn');
            $table->string('saas_branch_id');
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
        Schema::dropIfExists('uploaded_prescriptions');
    }
}
