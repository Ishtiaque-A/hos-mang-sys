<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabRequisitionDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_requisition_details', function (Blueprint $table) {
            $table->id();
            $table->integer('requisition_id');
            $table->integer('branch_id')->nullable();
            $table->integer('product_id');
            $table->integer('quantity');
            $table->integer('pending_quantity')->default(0);
            $table->integer('dispatched_quantity')->default(0);
            $table->integer('delivered_quantity')->default(0);
            $table->double('price');
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
        Schema::dropIfExists('great_lab_requisition_details');
    }
}
