<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpLabAgentMoneReciptsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_lab_agent_mone_recipts', function (Blueprint $table) {
            $table->id();
            $table->string('money_receipt_number')->nullable();
            $table->string('hn_number')->nullable();
            $table->string('name')->nullable();
            $table->string('invoice_number')->nullable();
            $table->string('requested_amount')->nullable();
            $table->string('paid_amount')->nullable();
            $table->string('payment_date')->nullable();
            $table->string('payment_time')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('total_amount_paid')->nullable();
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
        Schema::dropIfExists('mhp_lab_agent_mone_recipts');
    }
}
