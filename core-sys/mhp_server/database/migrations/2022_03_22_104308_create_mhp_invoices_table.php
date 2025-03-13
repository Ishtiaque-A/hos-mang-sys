<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_invoices', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('invoice_number')->nullable();
            $table->string('issued_date')->nullable();
            $table->string('due_date')->nullable();
            $table->integer('total_bill_amount')->nullable();
            $table->integer('payment_amount')->nullable();
            $table->string('saas_branch_id')->nullable();
            $table->string('saas_branch_name')->nullable();
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
        Schema::dropIfExists('mhp_invoices');
    }
}
