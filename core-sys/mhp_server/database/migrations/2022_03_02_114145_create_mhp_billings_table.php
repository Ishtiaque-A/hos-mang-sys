<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpBillingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_billings', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->nullable();
            $table->string('doctor_id')->nullable();
            $table->string('procedure_id')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('item_code')->nullable();
            $table->string('item_details')->nullable();
            $table->longText('item_details_sub_id')->nullable();
            $table->string('rate')->nullable();
            $table->string('qty')->nullable();
            $table->string('vat')->nullable();
            $table->string('tax')->nullable();
            $table->string('total')->nullable();
            $table->integer('delete_status')->default(0);
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
        Schema::dropIfExists('mhp_billings');
    }
}
