<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatLabReportDeliveryInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_lab_report_delivery_infos', function (Blueprint $table) {
            $table->id();
            $table->string("invoiceNo")->nullable();
            $table->string("patient_id")->nullable();
            $table->string("deliveryTime")->nullable();
            $table->string("deliveryDate")->nullable();
            $table->string("fileUpload")->nullable();
            $table->string("followUpDate")->nullable();
            $table->string("followUpComment")->nullable();
            $table->string("testList")->nullable();
            $table->string("collectedBy")->nullable();
            $table->string("saas_branch_id")->nullable();
            $table->string("saas_branch_name")->nullable();
            $table->string("remark")->nullable();
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
        Schema::dropIfExists('mhp_great_lab_report_delivery_infos');
    }
}
