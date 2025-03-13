<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatLabInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_lab_invoices', function (Blueprint $table) {
            $table->id();
            $table->string("patient_id")->nullable();
            $table->string("patient_first_name")->nullable();
            $table->string("patient_mobile_phone")->nullable();
            $table->string("referredBy")->nullable();
            $table->string("referrer")->nullable();
            $table->integer("point_plan")->nullable();
            $table->integer("point_plan_master")->nullable();
            $table->string("paymentMethod")->nullable();
            $table->string("paymentOption")->nullable();
            $table->string("cardNumber")->nullable();
            $table->string("expireDate")->nullable();
            $table->string("digitalPaymentNumber")->nullable();
            $table->string("totalBill")->nullable();
            $table->string("deliveryDate")->nullable();
            $table->string("deliveryTime")->nullable();
            $table->string("invoiceNo")->nullable();
            $table->string("due")->nullable();
            $table->string("paidAmount")->nullable();
            $table->string("specialDiscount")->nullable();
            $table->string("deliveryStatus")->nullable();
            $table->string("reportReadyStatus")->nullable();
            $table->string("reportCollectionStatus")->nullable();
            $table->string("sampleCollectionStatus")->nullable();
            $table->string("sampleCollectionDate")->nullable();
            $table->string("remarkForSampleCollection")->nullable();
            $table->boolean("isApprovedInSampleCollection")->default(0);
            $table->boolean("isApprovedInSendToLab")->default(0);
            $table->boolean("isApprovedInReceiveFromLab")->default(0);
            $table->string("reportReceiverFromLabRemark")->nullable();
            $table->string("sampleReceiverToLabRemark")->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->string('shift_id')->nullable();
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
        Schema::dropIfExists('mhp_great_lab_invoices');
    }
}
