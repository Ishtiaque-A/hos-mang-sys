<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientLabRequestFromAppsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_lab_request_from_apps', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id');
            $table->integer('branch_id');
            $table->enum('test_type', ['radiology', 'pathology']);
            $table->text('test_name');
            $table->decimal('amount', 10, 2);
            $table->string('lat')->nullable();
            $table->string('long')->nullable();
            $table->string('sample_collention')->default('home');
            $table->string('payment_number');
            $table->string('tran_id')->unique();
            $table->string('ref_num');

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
        Schema::dropIfExists('patient_lab_request_from_apps');
    }
}
