<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabCentralStockOutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_central_stock_outs', function (Blueprint $table) {
            $table->id();
            $table->integer('requisition_id');
            $table->integer('product_id');
            $table->integer('quantity');
            $table->integer('branch_id');
            $table->integer('location_id');
            $table->string('name')->nullable();
            $table->double('price');
            $table->double('total')->default(0);
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
        Schema::dropIfExists('great_lab_central_stock_outs');
    }
}
