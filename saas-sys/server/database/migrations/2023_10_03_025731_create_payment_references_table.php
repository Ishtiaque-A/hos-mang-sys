<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_references', function (Blueprint $table) {
            $table->id();
            $table->string('status')->comment('VALID / FAILED / CANCELLED');
            $table->timestamp('tran_date');
            $table->string('tran_id'); //purchase_id
            $table->string('val_id');
            $table->decimal('amount', 10, 2);
            $table->decimal('store_amount', 10, 2);
            $table->string('card_type');
            $table->string('card_no');
            $table->string('currency');
            $table->string('bank_tran_id')->nullable();
            $table->string('card_issuer');
            $table->string('card_brand');
            $table->string('card_issuer_country');
            $table->string('card_issuer_country_code');
            $table->string('currency_type');
            $table->decimal('currency_amount', 10, 2);
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
        Schema::dropIfExists('payment_references');
    }
};
