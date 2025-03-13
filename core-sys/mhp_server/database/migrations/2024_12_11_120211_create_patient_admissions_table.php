<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientAdmissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_admissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("patient_id");
            $table->unsignedBigInteger("specialist_id");
            $table->unsignedBigInteger("department_id");
            $table->unsignedBigInteger("doctor_id");
            $table->string("block")->nullable();
            $table->string("level")->nullable();
            $table->string("unit")->nullable();
            $table->date("admission_date")->nullable();
            $table->string("ward")->nullable();
            $table->string("bed")->nullable();
            $table->string("cabin")->nullable();
            $table->integer("status")->nullable()->default(1); // 1 = admitted, 2 = discharged and more
            $table->string("PRN")->nullable();
            $table->longText("note")->nullable();


            $table->text("reason_for_admission")->nullable();
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
        Schema::dropIfExists('patient_admissions');
    }
}
