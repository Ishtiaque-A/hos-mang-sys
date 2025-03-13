<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpAccountsInvoiceDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_accounts_invoice_details', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_id')->nullable();
            $table->string('item_name')->nullable();
            $table->string('account_group_id')->nullable();
            $table->string('item_id')->nullable();
            $table->string('account_group_name')->nullable();
            $table->string('account_type_id')->nullable();
            $table->string('account_id')->nullable();
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
        Schema::dropIfExists('mhp_accounts_invoice_details');
    }
}
