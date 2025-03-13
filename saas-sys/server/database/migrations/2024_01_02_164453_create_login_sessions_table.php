<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('login_sessions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('token');
            $table->string('from_url')->nullable();
            $table->string('to_url')->nullable(); //purchase_id
            $table->string('ip')->nullable(); //purchase_id
            $table->bigInteger('created_by');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('login_sessions');
    }
};
