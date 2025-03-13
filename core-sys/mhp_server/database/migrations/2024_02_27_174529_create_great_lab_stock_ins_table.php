<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabStockInsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_stock_ins', function (Blueprint $table) {
            $table->id();
            $table->string('supplier')->nullable();
            $table->integer('location_id')->nullable();
            $table->text('remarks')->nullable();
            $table->double('total')->nullable();
            $table->string('reference_invoice_no')->nullable();
            $table->string('reference_order_no')->nullable();
            $table->string('stock_in_by')->nullable();
            $table->string('delivery_date')->nullable();
            $table->string('discount')->nullable();
            $table->string('vat')->nullable();
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
        Schema::dropIfExists('great_lab_stock_ins');
    }
}
