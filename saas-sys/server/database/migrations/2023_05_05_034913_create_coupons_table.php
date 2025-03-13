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
        Schema::create('coupons', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('code');
            $table->integer('amount');
            $table->tinyInteger('discount_type')->comment('0:flat, 1:percentage')->default(0);
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->tinyInteger('user_type')->comment('0:all, 1:specific')->default(0);
            $table->tinyInteger('status')->comment('0:inactive, 1:active')->default(1);
            $table->tinyInteger('subscription_plan_type')->comment('0:all, 1:specific')->default(0);
            $table->bigInteger('created_by')->default(0);
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
        Schema::dropIfExists('coupons');
    }
};
