<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabPurchaseInDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_purchase_in_details', function (Blueprint $table) {
            $table->id();
            $table->integer('purchase_id');
            $table->integer('product_id');
            $table->string('name')->nullable();
            $table->integer('quantity')->default(0);
            $table->integer('bonus_quantity')->default(0);
            $table->double('purchase_price')->default(0);
            $table->double('vat')->default(0);
            $table->double('total')->default(0);
            $table->double('discount')->default(0);
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
        Schema::dropIfExists('great_lab_purchase_in_details');
    }
}
