<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPrescriptionsListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_prescriptions_lists', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('prescription_name')->nullable();
            $table->string('doctor_id')->nullable();
            $table->string('reason_for_visit')->nullable();
            $table->text('doctors_note')->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->string('saas_branch_name')->nullable();
            $table->string('date')->nullable();
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
        Schema::dropIfExists('mhp_prescriptions_lists');
    }
}
