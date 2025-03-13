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
        Schema::create('organizations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->text('address')->nullable();
            $table->string('mobile');
            $table->string('email')->unique();
            $table->string('contact_person_name');
            $table->string('contact_person_mobile');
            $table->string('contact_person_email');
            $table->string('contact_person_designation')->nullable();
            $table->string('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('db_name');
            $table->bigInteger('special_plan_id')->nullable();
            $table->string('meta_tags')->nullable();
            $table->tinyInteger('status')->comment('0: inactive 1:active')->default(1);
            $table->timestamp('deleted_at')->nullable();
            $table->string('business_type')->default('B2B');
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
        Schema::dropIfExists('organizations');
    }
};
