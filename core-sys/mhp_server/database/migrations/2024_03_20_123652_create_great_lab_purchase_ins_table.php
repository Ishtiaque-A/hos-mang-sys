<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabPurchaseInsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_purchase_ins', function (Blueprint $table) {
            $table->id();
            $table->integer('purchase_no');
            $table->integer('supplier_id');
            $table->string('date')->nullable();
            $table->string('created_by')->nullable();
            $table->string('reference_invoice')->nullable();
            $table->string('reference_order')->nullable();
            $table->string('status')->nullable();
            $table->text('remarks')->nullable();
            $table->double('total')->default(0);
            $table->double('paid')->default(0);
            $table->double('due')->default(0);
            $table->double('discount')->default(0);
            $table->double('vat')->default(0);
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
        Schema::dropIfExists('great_lab_purchase_ins');
    }
}
