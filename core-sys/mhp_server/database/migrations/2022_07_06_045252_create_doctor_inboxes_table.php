<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorInboxesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctor_inboxes', function (Blueprint $table) {
            $table->id();
             $table->string("patient_id")->nullable();
            $table->string("store_result_in_id")->nullable();
            $table->string("action_to_be_taken_id")->nullable();
            $table->string("patient_lab_id")->nullable();
            $table->string("the_result_is_id")->nullable();
            $table->string("doctor_id")->nullable();
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
        Schema::dropIfExists('doctor_inboxes');
    }
}
