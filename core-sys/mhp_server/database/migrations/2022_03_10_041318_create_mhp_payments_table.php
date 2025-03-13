<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_payments', function (Blueprint $table) {
            $table->id();
              $table->string('patient_id')->nullable();
              $table->string('invoice_number')->nullable();
              $table->string('payment_type')->nullable();
             $table->string('bank_id')->nullable();
             $table->string('branch_id')->nullable();
             $table->string('check_number')->nullable();
            $table->string('card_id')->nullable();
            $table->string('card_number')->nullable();
            $table->string('digital_id')->nullable();
            $table->string('transaction_number')->nullable();
            $table->string('amount')->nullable();
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
        Schema::dropIfExists('mhp_payments');
    }
}
