<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabBoothStockOutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_booth_stock_outs', function (Blueprint $table) {
            $table->id();
            $table->integer('invoice_id')->nullable();
            $table->integer('location_id')->nullable();
            $table->integer('booth_id')->nullable();
            $table->string('product_id')->nullable();
            $table->string('name')->nullable();
            $table->string('manufacturer')->nullable();
            $table->double('quantity')->default(0);
            $table->double('price')->default(0);
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
        Schema::dropIfExists('great_lab_booth_stock_outs');
    }
}
