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
        Schema::create('subscription_plans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->unsignedBigInteger('validity_id');
            $table->integer('user_limit')->default(1);
            $table->unsignedBigInteger('storage_limit_id');
            $table->integer('price');
            $table->text('details');
            $table->tinyInteger('status')->comment('0:inactive 1:active 2:deleted')->default(1);
            $table->tinyInteger('type')->comment(' 1:regular 2:special')->default(1);
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
        Schema::dropIfExists('subscription_plans');
    }
};
