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
        Schema::create('purchase_attempts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('organization_id');
            $table->integer('user_id');
            $table->integer('subscription_plan_id');
            $table->integer('user_limit')->default(1);
            $table->integer('actual_price');
            $table->integer('sell_price');
            $table->integer('coupon_id')->nullable();
            $table->integer('payment_id')->nullable();
            $table->tinyInteger('status')->comment('0:failed, 1:success, 2: pending')->default(2);
            $table->timestamp('deleted_at')->nullable();
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
        Schema::dropIfExists('purchase_attempts');
    }
};
