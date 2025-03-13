<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpAccountsExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_accounts_expenses', function (Blueprint $table) {
            $table->id();
            $table->string('accounts_id')->nullable();
            $table->string('accounts_type_id')->nullable();
            $table->string('accounts_group_id')->nullable();
            $table->string('amount')->nullable();
            $table->string('description')->nullable();
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
        Schema::dropIfExists('mhp_accounts_expenses');
    }
}
