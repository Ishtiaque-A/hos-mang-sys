<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabStocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_stocks', function (Blueprint $table) {
            $table->id();
            $table->string('product_id')->nullable();
            $table->string('stock')->nullable();
            $table->integer('location_id')->nullable();
            $table->string('location')->nullable();
            $table->string('bonus_qty')->nullable();
            $table->string('price')->nullable();
            $table->string('vat')->nullable();
            $table->text('name')->nullable();
            $table->integer('item_code')->nullable();
            $table->string('opening_stock')->nullable();
            $table->string('closing_stock')->nullable();
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
        Schema::dropIfExists('great_lab_stocks');
    }
}
