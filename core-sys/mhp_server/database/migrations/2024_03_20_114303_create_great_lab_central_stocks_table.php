<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabCentralStocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_central_stocks', function (Blueprint $table) {
            $table->id();
            $table->integer('product_id');
            $table->integer('stock')->default(0);
            $table->integer('bonus_qty')->default(0);
            $table->integer('opening_stock')->default(0);
            $table->integer('closing_stock')->default(0);
            $table->double('price')->default(0);
            $table->double('vat')->default(0);
            $table->string('expire_date')->nullable();
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
        Schema::dropIfExists('great_lab_central_stocks');
    }
}
