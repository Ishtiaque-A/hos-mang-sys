<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabInvoiceInventoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_invoice_inventories', function (Blueprint $table) {
            $table->id();
            $table->integer('invoice_id');
            $table->integer('product_id');
            $table->double('quantity')->default(0);
            $table->double('price')->default(0);
            $table->double('total')->default(0);
            $table->string('name')->nullable();
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
        Schema::dropIfExists('great_lab_invoice_inventories');
    }
}
