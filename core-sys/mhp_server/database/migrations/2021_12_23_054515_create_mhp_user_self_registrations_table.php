<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpUserSelfRegistrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_user_self_registrations', function (Blueprint $table) {
            $table->id();
            $table->text('preferred_name')->nullable();
            $table->text('mobile_number')->nullable();
            $table->text('email_address')->nullable();
            $table->text('occupation')->nullable();
            $table->text('otp')->nullable();
            $table->integer('delete_status')->default(0);
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
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
        Schema::dropIfExists('mhp_user_self_registrations');
    }
}
