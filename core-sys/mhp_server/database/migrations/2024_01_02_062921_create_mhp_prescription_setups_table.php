<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPrescriptionSetupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_prescription_setups', function (Blueprint $table) {
            $table->id();
            $table->string('prescription_type')->nullable();
            $table->string('doctor_id')->nullable();
            $table->string('doctor_email')->nullable();
            $table->string('header_img')->nullable();
            $table->string('footer_img')->nullable();
            $table->integer('use_header')->default(0);
            $table->integer('use_footer')->default(0);
            $table->string('doctor_signature')->nullable();
            $table->string('use_doctor_signature')->default(0);
            $table->longText("header_content")->nullable();
            $table->longText("footer_content")->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->tinyInteger('clinical_exam')->default(0)->comment('0=show clinical exam, 1=hide clinical exam');
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
        Schema::dropIfExists('mhp_prescription_setups');
    }
}
