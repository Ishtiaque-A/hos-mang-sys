<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('refunds', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('cancel_request_id');
            $table->string('note');
            $table->float('amount');
            $table->string('account_details')->nullable();
            $table->string('refund_note')->nullable();
            $table->string('refund_reference')->nullable();
            $table->string('refund_by')->nullable();
            $table->tinyInteger('status')->comment('0:rejected, 1:initiate, 2:in progress, 3:done');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('refunds');
    }
};
