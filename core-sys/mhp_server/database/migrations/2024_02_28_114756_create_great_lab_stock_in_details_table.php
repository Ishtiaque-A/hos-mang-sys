<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabStockInDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_stock_in_details', function (Blueprint $table) {
            $table->id();
            $table->integer('stock_in_id');
            $table->integer('product_id');
            $table->integer('location_id');
            $table->integer('quantity');
            $table->double('purchase_price');
            $table->double('vat')->nullable();
            $table->double('tax')->nullable();
            $table->integer('bonus_quantity')->nullable();
            $table->integer('status')->default(1);
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
        Schema::dropIfExists('great_lab_stock_in_details');
    }
}
