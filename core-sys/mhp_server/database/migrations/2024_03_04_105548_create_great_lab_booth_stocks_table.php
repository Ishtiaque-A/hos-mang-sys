<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabBoothStocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_booth_stocks', function (Blueprint $table) {
            $table->id();
            $table->integer('booth_id');
            $table->integer('product_id');
            $table->double('quantity');
            $table->integer('location_id')->nullable();
            $table->string('status')->nullable();
            $table->double('price')->nullable();
            $table->string('name')->nullable();
            $table->double('vat')->nullable();
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
        Schema::dropIfExists('great_lab_booth_stocks');
    }
}
