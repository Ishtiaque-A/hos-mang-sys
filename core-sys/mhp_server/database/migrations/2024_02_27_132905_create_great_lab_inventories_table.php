<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabInventoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_inventories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('item_code')->nullable();
            $table->string('description')->nullable();
            $table->string('manufacturer')->nullable();
            $table->double('mrp')->nullable();
            $table->double('purchase_price')->nullable();
            $table->string('expiry_date')->nullable();
            $table->string('category_id')->nullable();
            $table->integer('sub_category_id')->nullable();
            $table->integer('opening_stock')->nullable();
            $table->string('image')->nullable();
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
        Schema::dropIfExists('great_lab_inventories');
    }
}
