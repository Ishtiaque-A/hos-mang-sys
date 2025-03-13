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
        Schema::create('settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('organization_id');
            $table->tinyInteger('is_2fa')->comment('0: disable 1:enable')->default(0);
            $table->tinyInteger('is_api_key')->comment('0: disable 1:enable')->default(0);
            $table->tinyInteger('is_notification')->comment('0: disable 1:enable')->default(0);
            $table->tinyInteger('is_push_notification')->comment('0: disable 1:enable')->default(0);
            $table->tinyInteger('is_sms_notification')->comment('0: disable 1:enable')->default(0);
            $table->tinyInteger('is_email_notification')->comment('0: disable 1:enable')->default(0);
            $table->tinyInteger('is_sso')->comment('0: disable 1:enable')->default(0);
            $table->tinyInteger('is_social_login')->comment('0: disable 1:enable')->default(0);
            $table->tinyInteger('is_direct_purchase')->comment('0: disable 1:enable')->default(0);
            $table->string('contact_number');
            $table->string('logo')->default("http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75");
            $table->string('contact_mail')->nullable();
            $table->string('currency')->default('BDT');
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
        Schema::dropIfExists('settings');
    }
};
