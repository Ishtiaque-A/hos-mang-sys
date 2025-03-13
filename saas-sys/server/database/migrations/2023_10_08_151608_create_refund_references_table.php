<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('refund_references', function (Blueprint $table) {
            $table->id();
            $table->string('APIConnect')->comment('INVALID_REQUEST / FAILED / INVALID_REQUEST/DONE');
            $table->string('bank_tran_id')->nullable();
            $table->string('tran_id'); //purchase_id
            $table->string('refund_ref_id');
            $table->string('status')->comment('success, failed, processing');
            $table->string('errorReason')->nullable();
            $table->bigInteger('cancel_request_id');
            $table->bigInteger('created_by');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('refund_references');
    }
};
