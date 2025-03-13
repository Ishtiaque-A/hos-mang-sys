<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpLabAgentInvoiceDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_lab_agent_invoice_details', function (Blueprint $table) {
            $table->id();
            $table->string("invoiceNo")->nullable();
            $table->string("testName")->nullable();
            $table->string("testCode")->nullable();
            $table->string("fee")->nullable();
            $table->string("discount")->nullable();
            $table->string("collector")->nullable();
            $table->boolean("collectionStatus")->default(0);
            $table->string("remark")->nullable();
            $table->boolean("sentToLabStatus")->default(0);
            $table->boolean("deliveryStatus")->default(0);
            $table->boolean("reportCollectionStatus")->default(0);
            $table->string("collectionDate")->nullable();
            $table->string("testCategory")->nullable();
            $table->string("test_category_id")->nullable();
            $table->string("sampleReceiverToLab")->nullable();
            $table->string("sampleReceiverToLabPhoneNo")->nullable();
            $table->string("sampleReceiverToLabDate")->nullable();
            $table->string("sampleReceiverToLabTime")->nullable();
            $table->string("sampleReceiverToLabRemark")->nullable();
            $table->string("sampleCarrierToLab")->nullable();
            $table->string("reportReceiverFromLab")->nullable();
            $table->string("reportReceiverFromLabPhoneNo")->nullable();
            $table->string("reportReceiverFromLabDate")->nullable();
            $table->string("reportReceiverFromLabTime")->nullable();
            $table->string("reportReceiverFromLabRemark")->nullable();
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
        Schema::dropIfExists('mhp_lab_agent_invoice_details');
    }
}
